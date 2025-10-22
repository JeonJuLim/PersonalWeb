# 🔄 JavaScript: Event Loop – Trái Tim Của Bất Đồng Bộ

> “Event Loop là nhạc trưởng của dàn nhạc JavaScript – điều phối mọi âm thanh sao cho không chồng chéo.”

![JavaScript Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop/event-loop.png)

---

## 🧠 I. Giới Thiệu

JavaScript là **ngôn ngữ đơn luồng (single-threaded)** — chỉ có **một Call Stack** để thực thi code.
Nhưng vẫn có thể **xử lý nhiều việc cùng lúc** nhờ cơ chế **Event Loop** kết hợp với **Web APIs**, **Callback Queue**, và **Microtask Queue**.

> 💡 Nói đơn giản: Event Loop giúp JavaScript *vừa tải dữ liệu, vừa hiển thị giao diện, vừa lắng nghe sự kiện người dùng* mà không bị đứng hình.

---

## 🧩 II. Các Thành Phần Chính

| Thành phần                      | Vai trò                                                                   |
| ------------------------------- | ------------------------------------------------------------------------- |
| **Call Stack**                  | Nơi thực thi các hàm hiện tại                                             |
| **Web APIs**                    | Xử lý tác vụ bất đồng bộ như `setTimeout`, `fetch`, DOM events            |
| **Callback Queue (Task Queue)** | Hàng chờ chứa các callback từ Web APIs                                    |
| **Microtask Queue**             | Hàng chờ ưu tiên cao hơn (Promises, MutationObserver)                     |
| **Event Loop**                  | Cơ chế giám sát Stack, chuyển callback từ Queue vào Stack khi Stack trống |

---

## ⚙️ III. Cách Event Loop Hoạt Động

1. Hàm đồng bộ được đưa vào **Call Stack** và chạy ngay.
2. Khi gặp tác vụ bất đồng bộ (như `setTimeout`), nó được chuyển sang **Web APIs** để xử lý nền.
3. Khi hoàn tất, callback được đưa vào **Callback Queue** hoặc **Microtask Queue**.
4. **Event Loop** kiểm tra Call Stack:

   * Nếu rỗng → đưa callback từ Microtask Queue vào Stack trước.
   * Nếu Microtask Queue trống → lấy callback từ Callback Queue.

---

## 💻 IV. Ví Dụ Minh Họa

```javascript
console.log("1. Bắt đầu");

setTimeout(() => {
  console.log("2. Timeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise callback");
});

console.log("4. Kết thúc");
```

**Kết quả:**

```
1. Bắt đầu
4. Kết thúc
3. Promise callback
2. Timeout callback
```

### 🧩 Giải thích:

* `setTimeout` (0ms) → chuyển sang **Web APIs**, callback vào **Callback Queue**.
* `Promise` → callback vào **Microtask Queue** (ưu tiên cao hơn).
* Event Loop thực thi các **microtask trước**, nên Promise chạy trước Timeout.

> 🧠 **Theo Feynman:**
> Hãy tưởng tượng bạn là **người điều phối nhà hàng** 🍽️:
>
> * **Bếp chính (Call Stack)** đang nấu món hiện tại.
> * **Bếp phụ (Web APIs)** chuẩn bị nguyên liệu (timeout, fetch).
> * **Danh sách việc cần làm (Queue)** chờ khi bếp chính rảnh.
>   Event Loop chính là **người quản lý**, luôn kiểm tra: “Bếp chính xong chưa? Nếu rồi, lấy món tiếp theo từ danh sách!”

---

## 🧭 V. Visual Flow (Luồng hoạt động)

```
     ┌───────────────┐
     │   Call Stack  │
     └──────┬────────┘
            │
            ▼
     ┌───────────────┐
     │   Web APIs    │
     └──────┬────────┘
            │ (khi xong)
            ▼
     ┌───────────────┐
     │ Callback Queue│
     └──────┬────────┘
            │
            ▼
     ┌───────────────┐
     │  Event Loop   │
     └───────────────┘
```

---

## 🚀 VI. Tổng Kết

| Cấu phần            | Mục đích                            |
| ------------------- | ----------------------------------- |
| **Call Stack**      | Thực thi code đồng bộ               |
| **Web APIs**        | Xử lý bất đồng bộ nền               |
| **Callback Queue**  | Nơi chứa callback chờ thực thi      |
| **Microtask Queue** | Ưu tiên hơn Callback Queue          |
| **Event Loop**      | Liên tục giám sát và di chuyển task |

---

> 💬 **Kết luận:**
> **Event Loop là trái tim của JavaScript runtime.**
> Nhờ nó, JavaScript có thể vừa tải dữ liệu, vừa phản hồi người dùng, vừa hoạt động mượt mà – tất cả chỉ trên **một luồng duy nhất**.
