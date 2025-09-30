document.addEventListener("DOMContentLoaded", async () => {
  const postList = document.querySelector("#post-list");

  try {
    const res = await fetch("/data/posts.json");
    const posts = await res.json();

    posts.forEach(post => {
      const card = document.createElement("article");
      card.classList.add("post-card");

      card.innerHTML = `
        <img src="${post.thumb}" alt="${post.title}" class="post-thumb">
        <div class="post-content">
          <h2><a href="${post.url}">${post.title}</a></h2>
          <p class="excerpt">${post.excerpt}</p>
          <div class="meta">
            <span class="date">📅 ${new Date(post.date).toLocaleDateString("vi-VN")}</span>
            <a href="${post.url}" class="btn small">Đọc tiếp →</a>
          </div>
        </div>
      `;
      postList.appendChild(card);
    });
  } catch (err) {
    postList.innerHTML = `<p>Không thể tải bài viết 😢</p>`;
    console.error(err);
  }
});
