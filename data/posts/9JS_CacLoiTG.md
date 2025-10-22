# 💥 JavaScript: Các Loại Lỗi Thường Gặp Khi Lập Trình Và Cách Khắc Phục

> “Sai lầm không giết bạn – trừ khi bạn `undefined` nó.” 😅

![JavaScript Errors](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong/javascript-error-message.png)

---

## 🧠 I. Giới Thiệu

Lập trình JavaScript rất linh hoạt, nhưng chính sự linh hoạt đó khiến **lỗi (error)** dễ xảy ra hơn.
Nắm vững các **loại lỗi thường gặp** sẽ giúp bạn **debug nhanh hơn** và **tránh tái phạm**.

Trong JavaScript, lỗi có thể đến từ:

* Sai cú pháp (Syntax Error)
* Lỗi logic (Logic Error)
* Lỗi runtime (Runtime Error)
* Lỗi bất đồng bộ (Asynchronous Error)

---

## 🧩 II. 1. Syntax Errors – Lỗi Cú Pháp

### 💡 Nguyên nhân

* Quên dấu ngoặc, dấu chấm phẩy.
* Sai tên biến hoặc từ khóa.
* Dùng cú pháp không hợp lệ.

### 💻 Ví dụ:

```javascript
function sayHi() {
  console.log("Hello, world!" // ❌ Thiếu dấu đóng ngoặc
}
```

**Kết quả:**

```
Uncaught SyntaxError: missing ) after argument list
```

> 🧠 **Theo Feynman:**
> Lỗi cú pháp giống như **viết câu văn mà quên dấu chấm cuối câu**.
> Trình thông dịch JavaScript là **giáo viên ngữ pháp nghiêm khắc** – sẽ dừng đọc ngay tại lỗi đầu tiên.

---

## ⚙️ III. 2. Reference Errors – Lỗi Tham Chiếu

### 💡 Nguyên nhân

* Gọi biến chưa được khai báo.
* Gọi biến ngoài phạm vi (scope).

### 💻 Ví dụ:

```javascript
console.log(message); // ❌ message chưa được khai báo
let message = "Hello";
```

**Kết quả:**

```
Uncaught ReferenceError: Cannot access 'message' before initialization
```

> 🧠 **Theo Feynman:**
> Đây là lỗi kiểu **“hỏi tên ai đó trong phòng trước khi họ bước vào”**.
> Biến chưa được “xuất hiện trên sân khấu”, nhưng bạn đã gọi tên họ rồi.

---

## 🧩 IV. 3. Type Errors – Lỗi Kiểu Dữ Liệu

### 💡 Nguyên nhân

* Gọi phương thức không tồn tại trên kiểu dữ liệu.
* Gán giá trị sai kiểu.

### 💻 Ví dụ:

```javascript
let count = 5;
count.toUpperCase(); // ❌ Number không có phương thức toUpperCase
```

**Kết quả:**

```
Uncaught TypeError: count.toUpperCase is not a function
```

> 🧠 **Theo Feynman:**
> Giống như **bắt một con cá đi bay** 🐟✈️ –
> Nó không thể làm điều bạn yêu cầu, vì **bản chất không phù hợp**.

---

## ⚙️ V. 4. Range Errors – Lỗi Phạm Vi

### 💡 Nguyên nhân

* Sử dụng giá trị ngoài phạm vi hợp lệ.
* Gọi hàm với tham số quá lớn hoặc quá nhỏ.

### 💻 Ví dụ:

```javascript
let arr = new Array(-5); // ❌ Không thể tạo mảng âm phần tử
```

**Kết quả:**

```
Uncaught RangeError: Invalid array length
```

> 🧠 **Theo Feynman:**
> Bạn không thể **đặt -5 chiếc ghế trong phòng học** 🎓 – phạm vi không hợp lệ.
> Range Error nhắc bạn “hãy thực tế hơn!”.

---

## ⚙️ VI. 5. Logic Errors – Lỗi Tư Duy

### 💡 Nguyên nhân

* Sai điều kiện trong `if`.
* Viết sai công thức hoặc quên cập nhật biến.

### 💻 Ví dụ:

```javascript
let age = 18;
if (age > 18) {
  console.log("Được vào!");
} else {
  console.log("Không đủ tuổi!"); // ❌ Sai điều kiện, 18 phải được vào
}
```

> 🧠 **Theo Feynman:**
> Lỗi logic giống như **bạn cài bản đồ ngược chiều** 🧭 –
> Bạn đi rất nhanh, chỉ là đi sai hướng.
> Cách khắc phục: **console.log() và kiểm tra từng giá trị.**

---

## ⚙️ VII. 6. Asynchronous Errors – Lỗi Bất Đồng Bộ

### 💡 Nguyên nhân

* Gọi dữ liệu chưa kịp trả về từ API.
* Dùng `await` bên ngoài `async`.

### 💻 Ví dụ:

```javascript
const data = fetch('https://api.example.com/users'); // ❌ Quên await
console.log(data); // Promise chưa hoàn thành
```

> 🧠 **Theo Feynman:**
> Giống như **bạn mở nồi cơm khi nó chưa chín** 🍚 –
> Dữ liệu chưa sẵn sàng, nhưng bạn đã cố gắng dùng nó.

---

## 🧰 VIII. Cách Phòng Tránh Và Sửa Lỗi

### ✅ 1. Dùng `try...catch`

```javascript
try {
  JSON.parse('{name: "Linh"}'); // ❌ Sai JSON
} catch (error) {
  console.error("Lỗi JSON:", error.message);
}
```

### ✅ 2. Dùng `console.log()` để debug

```javascript
console.log(variableName);
```

### ✅ 3. Dùng công cụ DevTools (Chrome / VS Code)

* Tab **Console**: xem lỗi chi tiết.
* Tab **Network**: kiểm tra request và response.
* Tab **Sources**: gỡ lỗi từng dòng.

---

## 🧭 IX. Tổng Kết

| Loại lỗi           | Khi xảy ra                        | Cách xử lý                                |
| ------------------ | --------------------------------- | ----------------------------------------- |
| **SyntaxError**    | Khi code sai cú pháp              | Kiểm tra dấu ngoặc, từ khóa               |
| **ReferenceError** | Khi biến chưa được định nghĩa     | Đảm bảo biến được khai báo trước khi dùng |
| **TypeError**      | Khi gọi sai kiểu dữ liệu          | Kiểm tra kiểu bằng `typeof`               |
| **RangeError**     | Khi giá trị nằm ngoài phạm vi     | Giới hạn đầu vào hợp lý                   |
| **Logic Error**    | Khi kết quả sai                   | In log, test từng bước                    |
| **Async Error**    | Khi làm việc với Promise hoặc API | Dùng `await`, `try...catch`               |

---

> 💬 **Kết luận:**
> JavaScript không sai – chỉ là bạn **chưa nói chuyện với nó theo cách nó hiểu** 😄.
> Hiểu lỗi chính là **học cách JavaScript suy nghĩ**, và từ đó bạn có thể điều khiển nó như một chuyên gia!
