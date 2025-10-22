// Pre-apply stored theme ASAP to avoid FOUC
(() => {
  try {
    const stored = localStorage.getItem('theme');
    if (stored) document.documentElement.dataset.theme = stored;
  } catch (e) {}
})();

// Inject header/nav/footer components and small helpers
async function inject(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(path);
  el.innerHTML = await res.text();
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

async function loadLatest() {
  const latestWrap = document.getElementById('latest-posts');
  if (!latestWrap) return;

  const res = await fetch('/data/posts.json');
  const posts = await res.json();
  const top = posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

    latestWrap.innerHTML = top
    .map(
      (p, i) => `
        <article class="card stacked--${['up','down','left','right'][i % 4]}">
          <a href="/src/pages/blog.html?p=${p.slug}">
            <div class="pad">
              <h3>${p.title}</h3>
              <p class="muted">${formatDate(p.date)}</p>
            </div>
            ${p.thumbnail ? `<img class="thumb" src="${p.thumbnail}" alt="${p.title}">` : ''}
          </a>
        </article>
      `
    )
    .join('');
}

// ✅ Hàm đổi logo theo theme
function updateLogo(theme) {
  const logo = document.getElementById("site-logo");
  if (!logo) return; // tránh lỗi khi nav chưa inject xong
  logo.src = theme === "dark" ? "/public/logodark.svg" : "/public/logo.svg";
}

function setupThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn || typeof lucide === 'undefined') return;

  const applyTheme = (mode) => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);

    // Xóa icon cũ nếu có
    const oldIcon = document.getElementById('theme-toggle-icon');
    if (oldIcon) oldIcon.remove();

    // Tạo icon mới
    const nextIcon = mode === 'dark' ? 'moon' : 'sun';
    const newIcon = document.createElement('i');
    newIcon.setAttribute('data-lucide', nextIcon);
    newIcon.setAttribute('id', 'theme-toggle-icon');
    themeBtn.appendChild(newIcon);

    // Re-render Lucide icons
    lucide.createIcons();

    // ✅ đổi logo theo theme
    updateLogo(mode);
  };

  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = stored || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}
// ✅ Hàm setup footer
function setupFooter() {
  // cập nhật năm nếu có placeholder
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // render icon
  if (window.lucide) {
    lucide.createIcons();
  }
}

// === 🎵 Setup âm nhạc ===
function setupMusic() {
  const btn = document.getElementById("music-toggle");
  const icon = btn?.querySelector("i");
  const music = document.getElementById("bg-music");
  if (!btn || !icon || !music) {
    console.warn("🎧 Không tìm thấy phần tử âm thanh trong DOM");
    return;
  }

  let isMuted = true;

  // Autoplay (mute)
  music.play().then(() => {
    console.log("🎶 Nhạc phát ở chế độ mute");
  }).catch(() => {
    console.warn("⚠️ Autoplay bị chặn — sẽ phát sau click đầu tiên");
  });

  // Khi người dùng click đầu tiên → bật nhạc
  document.body.addEventListener(
    "click",
    () => {
      if (music.paused) music.play();
      if (isMuted) {
        music.muted = false;
        music.volume = 0.4;
        isMuted = false;
        icon.setAttribute("data-lucide", "volume-2");
        btn.classList.add("music-active");
        lucide.createIcons();
        console.log("🔊 Nhạc bật");
      }
    },
    { once: true }
  );

  // Nút bật/tắt nhạc
  btn.addEventListener("click", () => {
    if (isMuted) {
      music.muted = false;
      music.volume = 0.4;
      icon.setAttribute("data-lucide", "volume-2");
      btn.classList.add("music-active");
    } else {
      music.muted = true;
      icon.setAttribute("data-lucide", "volume-x");
      btn.classList.remove("music-active");
    }
    isMuted = !isMuted;
    lucide.createIcons();
  });
}

// === ⚙️ Khởi tạo toàn trang ===
window.addEventListener('DOMContentLoaded', async () => {
  await inject('site-header', '/src/components/header.html');
  await inject('site-nav', '/src/components/nav.html');
  await inject('site-footer', '/src/components/footer.html');
  setupFooter();

  if (window.lucide) lucide.createIcons();

  setupThemeToggle();
  setupMusic(); // 🎶 gọi ngay sau khi nav đã được inject

  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  updateLogo(currentTheme);
  loadLatest();
});

 
