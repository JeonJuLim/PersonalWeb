Lộ trình triển khai:

Khởi tạo dự án Next.js + TS + ESLint/Prettier.

Định nghĩa zod schemas + types (Article, Project…).

MSW mock cho /api/articles.

Xây Home UI (90%) + phần “Bài mới” dùng ArticleList limit=3 (mock).

Thiết lập Prisma + SQLite + migrate.

Repository/Service + API routes cho Articles.

Xây Blog List (dùng lại ArticleList, thêm pagination/filter).

E2E test Home ↔ Blog.

(Tuỳ chọn) Blog Detail, Admin (login), OG fetch/cache.

Đổi DB prod sang Postgres khi deploy.
