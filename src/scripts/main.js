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
        (p) => `
          <article class="card">
            <a href="/src/pages/blog.html?p=${p.slug}">
              ${p.thumbnail ? `<img class="thumb" src="${p.thumbnail}" alt="${p.title}">` : ''}
              <div class="pad">
                <h3>${p.title}</h3>
                <p class="muted">${formatDate(p.date)}</p>
              </div>
            </a>
          </article>
        `
      )
      .join('');
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
  
  // Init
  window.addEventListener('DOMContentLoaded', async () => {
    // Inject components
    await Promise.all([
      inject('site-header', '/src/components/header.html'),
      inject('site-nav', '/src/components/nav.html'),
      inject('site-footer', '/src/components/footer.html').then(() => {
        const y = document.getElementById('year');
        if (y) y.textContent = new Date().getFullYear();
      }),
    ]);
  
    // ⚠️ Lucide render icon sau khi đã inject xong
    if (window.lucide) {
      lucide.createIcons();
    }
  
    // ✅ Lúc này mới gọi toggle sau khi DOM + icon đã render
    setupThemeToggle();
  
    // Load bài viết
    loadLatest();
  });
  
  