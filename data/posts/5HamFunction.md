# 🧠 JavaScript: Hàm (Functions) – Linh Hồn Của Ngôn Ngữ Web

> “Một hàm là cách bạn dạy máy tính thực hiện một nhiệm vụ cụ thể – và có thể lặp lại nhiều lần.”

![JavaScript Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions/function-diagram.svg)

---

## 🧩 I. Giới Thiệu

Trong JavaScript, **hàm (function)** là khối mã có thể **tái sử dụng**, **nhận dữ liệu đầu vào (parameters)** và **trả về kết quả (return)**.

Hàm giúp mã nguồn trở nên **ngắn gọn, rõ ràng** và **dễ bảo trì** hơn. Có hai loại phổ biến:

* **Function Declaration** (khai báo hàm truyền thống)
* **Arrow Function** (hàm mũi tên, ra đời trong ES6)

---

## 📘 II. Cú Pháp Cơ Bản

### 🔹 Hàm truyền thống:

```javascript
function greet(name) {
  return `Xin chào, ${name}!`;
}
```

### 🔹 Hàm mũi tên (Arrow Function):

```javascript
const greet = (name) => `Xin chào, ${name}!`;
```

Cả hai đều có tác dụng giống nhau, nhưng **Arrow Function** ngắn gọn hơn và không có `this` riêng.

---

## 💻 III. Ví Dụ Minh Họa

```javascript
function tinhTong(a, b) {
  return a + b;
}

const binhPhuong = (x) => x * x;

console.log(tinhTong(5, 3)); // 8
console.log(binhPhuong(4)); // 16
```

**Kết quả:**

```
8
16
```

---

## 🧠 IV. Theo Feynman – Hiểu Đơn Giản Là...

> Hãy tưởng tượng bạn là **đầu bếp** 👨‍🍳.
> Một **hàm** chính là **công thức nấu ăn**: bạn định nghĩa cách làm một món ăn (function),
> và mỗi khi muốn ăn, bạn chỉ cần **gọi công thức** đó (call function) thay vì nấu lại từ đầu.

Hàm giúp bạn **tự động hóa** các hành động lặp lại và **giảm lỗi con người**.

---

## 🧭 V. Tổng Kết

| Cú pháp                 | Loại hàm             | Ưu điểm                         |
| ----------------------- | -------------------- | ------------------------------- |
| `function name() {}`    | Function Declaration | Dễ đọc, có hoisting             |
| `const name = () => {}` | Arrow Function       | Gọn gàng, không có `this` riêng |

> 💬 **Ghi nhớ:** Viết hàm là cách bạn dạy JavaScript *tư duy có cấu trúc* – giúp bạn làm chủ được sự phức tạp của web.
