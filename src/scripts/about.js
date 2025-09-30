import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener("DOMContentLoaded", async () => {
  const content = document.querySelector("#about-content");
  const tocList = document.querySelector("#toc-list");

  // Load file .md
  const res = await fetch("/data/about.md");
  const mdText = await res.text();
  content.innerHTML = marked(mdText);

  // Tạo id cho heading (slugify text)
  const slugify = str =>
    str.toLowerCase()
       .normalize("NFD")                     // tách dấu
       .replace(/[\u0300-\u036f]/g, "")      // xóa dấu
       .replace(/[^\w]+/g, "-")              // thay ký tự đặc biệt = -
       .replace(/^-+|-+$/g, "");             // bỏ - thừa

  const headings = content.querySelectorAll("h2, h3");
  headings.forEach(h => {
    if (!h.id) h.id = slugify(h.textContent);
  });

  // Sinh TOC
  headings.forEach(h => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = h.textContent;
    a.href = `#${h.id}`;

    if (h.tagName === "H3") li.style.paddingLeft = "1rem"; // thụt vào cho h3

    li.appendChild(a);
    tocList.appendChild(li);
  });

  // Smooth scroll khi click
  tocList.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(a.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // Scroll spy: highlight heading đang thấy
  const links = tocList.querySelectorAll("a");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // reset active
        links.forEach(a => a.classList.remove("active"));

        // set active cho link trùng id
        const link = tocList.querySelector(`a[href="#${id}"]`);
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-30% 0px -70% 0px", threshold: 0 });

  headings.forEach(h => observer.observe(h));
});
