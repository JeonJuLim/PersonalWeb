import { formatDate } from './main.js';

const $ = (q) => document.querySelector(q);

function getQuery(key) {
  const u = new URL(window.location.href);
  return u.searchParams.get(key);
}

async function loadList() {
  const listEl = $('#post-list');
  if (!listEl) return;

  try {
    const res = await fetch('/data/posts.json');
    const posts = await res.json();

    // Render list
    listEl.innerHTML = posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(
        (p) => `
        <article class="post-item">
          <h3><a href="/src/pages/blog.html?p=${p.slug}">${p.title}</a></h3>
          <p class="muted">${formatDate(p.date)}</p>
        </article>
      `
      )
      .join('');

    // Ẩn skeleton sau khi load xong
    const skel = document.getElementById('post-list-skeleton');
    if (skel) skel.remove();

    // Hiện danh sách thật
    listEl.hidden = false;
  } catch (err) {
    console.error('Load posts failed:', err);
    // Dù lỗi vẫn ẩn skeleton để tránh “kẹt”
    const skel = document.getElementById('post-list-skeleton');
    if (skel) skel.remove();
    listEl.hidden = false;
    listEl.innerHTML = `<p class="muted">Không thể tải danh sách bài viết.</p>`;
  }
}

async function loadPost(slug) {
  const view = $('#post-view');
  const t = $('#post-title');
  const m = $('#post-meta');
  const c = $('#post-content');
  const img = $('#post-thumb');

  try {
    const resMeta = await fetch('/data/posts.json');
    const all = await resMeta.json();
    const meta = all.find((x) => x.slug === slug);
    if (!meta) {
      window.location.href = '/src/pages/blog.html';
      return;
    }

    t.textContent = meta.title;
    m.textContent = `${formatDate(meta.date)}${
      meta.tags ? ' · ' + meta.tags.join(', ') : ''
    }`;
    if (meta.thumbnail) {
      img.src = meta.thumbnail;
      img.alt = meta.title;
      img.hidden = false;
    }

    const resMd = await fetch(`/data/posts/${slug}.md`);
    const md = await resMd.text();
    c.innerHTML = marked.parse(md); // from CDN

    view.hidden = false;
  } catch (err) {
    console.error('Load post failed:', err);
    view.hidden = false;
    c.innerHTML = `<p class="muted">Không thể tải nội dung bài viết.</p>`;
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const slug = getQuery('p');
  if (slug) {
    await loadPost(slug);
  } else {
    await loadList();
  }
});
