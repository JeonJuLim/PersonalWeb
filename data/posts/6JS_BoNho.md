# 🧩 JavaScript: Closure & Scope – Hiểu Sâu Về Bộ Nhớ Và Phạm Vi Biến

> “Closure là nơi JavaScript cất giữ ký ức — giúp hàm nhớ được những gì đã xảy ra trong quá khứ.”

![JavaScript Scope and Closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures/closure_diagram.svg)

---

## 🧠 I. Giới Thiệu

Khi bạn viết JavaScript, bạn đang làm việc trong các **phạm vi (scope)** – nơi biến được định nghĩa và truy cập.

* **Global Scope**: Biến có thể được truy cập ở bất cứ đâu.
* **Local Scope / Function Scope**: Biến chỉ tồn tại trong hàm.
* **Block Scope (ES6)**: Biến khai báo bằng `let` hoặc `const` chỉ tồn tại trong khối `{}`.

Còn **closure** là hiện tượng xảy ra khi một hàm **“nhớ” môi trường nơi nó được tạo ra**, ngay cả sau khi hàm cha đã kết thúc.

---

## 🔍 II. Ví Dụ Về Scope

```javascript
let name = "JS"; // Global scope

function sayHello() {
  let greeting = "Xin chào"; // Local scope
  console.log(`${greeting}, ${name}!`);
}

sayHello();
console.log(name); // Hợp lệ
console.log(greeting); // ❌ Lỗi – ngoài phạm vi
```

**Kết quả:**

```
Xin chào, JS!
Uncaught ReferenceError: greeting is not defined
```

> 🧠 **Theo Feynman:**
> Scope giống như **ranh giới căn phòng** 🏠 – bạn chỉ có thể thấy những đồ vật (biến) trong phòng đó.
> Ra ngoài phòng, bạn không thể nhìn thấy những gì bên trong.

---

## 🔒 III. Closure Là Gì?

Closure xảy ra khi **một hàm con truy cập biến của hàm cha**, ngay cả sau khi hàm cha đã kết thúc.

### 💻 Ví Dụ Kinh Điển:

```javascript
function counter() {
  let count = 0; // biến nằm trong phạm vi của hàm cha

  return function() { // hàm con
    count++;
    return count;
  };
}

const dem = counter();
console.log(dem()); // 1
console.log(dem()); // 2
console.log(dem()); // 3
```

**Kết quả:**

```
1
2
3
```

Mặc dù `counter()` đã chạy xong, biến `count` **vẫn tồn tại trong bộ nhớ** vì closure giữ lại tham chiếu đến nó.

> 🧠 **Theo Feynman:**
> Hãy tưởng tượng `counter` là **nhà máy bánh** 🍪, còn hàm con là **nhân viên giữ sổ tồn kho**.
> Dù ông chủ (hàm cha) đã về, nhân viên vẫn **nhớ số bánh còn lại** (biến `count`).

---

## 🧩 IV. Ứng Dụng Thực Tế Của Closure

### ✅ 1. Giữ trạng thái riêng tư (private state)

```javascript
function bankAccount() {
  let balance = 1000;

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Nạp: ${amount}. Số dư: ${balance}`);
    },
    withdraw(amount) {
      balance -= amount;
      console.log(`Rút: ${amount}. Số dư: ${balance}`);
    }
  };
}

const account = bankAccount();
account.deposit(500);
account.withdraw(200);
```

### ✅ 2. Module pattern – mô phỏng hướng đối tượng

```javascript
const CounterModule = (function() {
  let value = 0;
  return {
    increment() { value++; console.log(value); },
    reset() { value = 0; console.log("Reset!"); }
  };
})();

CounterModule.increment();
CounterModule.increment();
CounterModule.reset();
```

> 🧠 **Theo Feynman:**
> Closure giống như **một căn hầm bí mật** 🗝️ – chỉ người tạo ra nó biết mật mã để truy cập.
> Dữ liệu bên trong được **bảo vệ khỏi thế giới bên ngoài**, nhưng vẫn **sống và hoạt động**.

---

## 🧭 V. Tổng Kết

| Khái Niệm    | Giải Thích                                          |
| ------------ | --------------------------------------------------- |
| **Scope**    | Phạm vi tồn tại của biến                            |
| **Closure**  | Cơ chế giúp hàm nhớ biến ở môi trường tạo ra nó     |
| **Ứng dụng** | Tạo dữ liệu riêng tư, module pattern, quản lý state |

---

> 💬 **Kết luận:**
> Closure là **trái tim bí mật của JavaScript** – nhờ nó mà ngôn ngữ này có thể viết được các ứng dụng web hiện đại, an toàn và mạnh mẽ.
> Hiểu closure, bạn sẽ hiểu “cách JavaScript tư duy”.
