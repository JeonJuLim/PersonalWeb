document.addEventListener("DOMContentLoaded", async () => {
  const postList = document.querySelector("#post-list");
  const postWrapper = document.querySelector("#post-wrapper");
  const postContent = document.querySelector("#post-content");
  const params = new URLSearchParams(window.location.search);

  const postSlug = params.get("post");
  // ---- Cho phép nhiều tag ----
  let activeTags = params.get("tag") ? params.get("tag").split(",") : [];

  // ========== HÀM HIỂN THỊ DANH SÁCH ==========
  async function renderPostList(filterTags = []) {
    try {
      const res = await fetch("/data/posts.json");
      let posts = await res.json();

      // Lọc bài viết theo nhiều tag nếu có
      if (filterTags.length > 0) {
        posts = posts.filter(p => 
          p.tags && filterTags.every(tag => p.tags.includes(tag))
        );
      }

      postList.innerHTML = "";

      if (posts.length === 0) {
        postList.innerHTML = `<p>Không có bài viết nào với tag <b>#${filterTags.join(", #")}</b>.</p>`;
        return;
      }

      posts.forEach(post => {
        const card = document.createElement("article");
        card.classList.add("post-card");

        card.innerHTML = `
          <img src="${post.thumb}" alt="${post.title}" class="post-thumb">
          <div class="post-content">
            <h2><a href="/src/pages/blog.html?post=${post.slug}">${post.title}</a></h2>
            <p class="excerpt">${post.excerpt}</p>
            <div class="meta">
              <span class="date">📅 ${new Date(post.date).toLocaleDateString("vi-VN")}</span>
              <a href="/src/pages/blog.html?post=${post.slug}" class="btn small">Đọc tiếp →</a>
            </div>
            <div class="tags">
              ${post.tags?.map(tag => `<span class="tag" data-tag="${tag}">#${tag}</span>`).join("") || ""}
            </div>
          </div>
        `;
        postList.appendChild(card);
      });

      document.querySelectorAll(".tag").forEach(tagEl => {
        tagEl.addEventListener("click", handleTagClick);
      });

      updateTagHighlight();
    } catch (err) {
      postList.innerHTML = `<p>❌ Không thể tải danh sách bài viết.</p>`;
      console.error(err);
    }
  }

  // ========== HÀM HIỂN THỊ CHI TIẾT ==========
  async function renderPostDetail(slug) {
    postList.style.display = "none";
    postWrapper.style.display = "flex";

    try {
      const res = await fetch(`/data/posts/${slug}.md`);
      const md = await res.text();

      postContent.innerHTML = marked.parse(md);
      if (window.lucide) lucide.createIcons();
    } catch (err) {
      postContent.innerHTML = `<p>❌ Không thể tải bài viết.</p>`;
      console.error(err);
    }
  }

  // ========== XỬ LÝ KHI CLICK TAG ==========
  function handleTagClick(e) {
    const tag = e.target.dataset.tag || e.target.textContent.replace("#", "").trim();

    if (activeTags.includes(tag)) {
      // Nếu tag đã chọn → bỏ chọn
      activeTags = activeTags.filter(t => t !== tag);
    } else {
      // Nếu chưa chọn → thêm vào danh sách
      activeTags.push(tag);
    }

    // Cập nhật URL
    if (activeTags.length > 0) {
      history.pushState({}, "", `?tag=${activeTags.join(",")}`);
    } else {
      history.pushState({}, "", "/src/pages/blog.html");
    }

    renderPostList(activeTags);
    updateTagHighlight();
  }

  // ========== HIGHLIGHT TAG ==========
  function updateTagHighlight() {
    document.querySelectorAll(".sidebar .tags span, .post-card .tag").forEach(tagEl => {
      const tag = tagEl.dataset.tag;
      if (activeTags.includes(tag)) tagEl.classList.add("active");
      else tagEl.classList.remove("active");
    });
  }

  // ========== KHỞI TẠO ==========
  if (postSlug) {
    renderPostDetail(postSlug);
  } else {
    postWrapper.style.display = "none";
    postList.style.display = "grid";
    renderPostList(activeTags);
  }

  document.querySelectorAll(".sidebar .tags span").forEach(tagEl => {
    tagEl.dataset.tag = tagEl.textContent.replace("#", "").trim();
    tagEl.addEventListener("click", handleTagClick);
  });
});
