# 🧩 Java: Generics – Lập Trình Tổng Quát Trong Java

> “Generics giúp code của bạn thông minh hơn: viết một lần, dùng cho mọi kiểu dữ liệu.”

![Java Generics](https://upload.wikimedia.org/wikipedia/commons/9/98/Generic_programming_diagram.png)

---

## ☕ I. Giới Thiệu

Trong Java, **Generics** cho phép bạn viết các **class, interface hoặc method có thể làm việc với nhiều kiểu dữ liệu khác nhau**, mà vẫn đảm bảo **an toàn kiểu (type safety)**.

Ví dụ, thay vì viết 2 hàm xử lý `Integer` và `String`, bạn có thể viết **một hàm tổng quát** hoạt động cho cả hai.

---

## 🧱 II. Vấn Đề Khi Không Có Generics

Trước Java 5, bạn phải dùng kiểu `Object` để lưu trữ mọi loại dữ liệu — nhưng điều đó làm mất an toàn kiểu và dễ xảy ra lỗi ép kiểu.

```java
List list = new ArrayList();
list.add("Xin chào");
list.add(123); // Không lỗi khi compile, nhưng có thể lỗi runtime

String s = (String) list.get(1); // ❌ ClassCastException
```

> 💡 Khi dùng `Object`, bạn phải **ép kiểu thủ công**, rất dễ lỗi khi dữ liệu không đúng loại.

---

## ✅ III. Giải Pháp Với Generics

Generics cho phép chỉ định kiểu dữ liệu ngay khi khai báo:

```java
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Spring");

String s = list.get(0); // Không cần ép kiểu
```

> 🧠 **Theo Feynman:**
> Hãy tưởng tượng bạn có **chiếc tủ hồ sơ có nhãn “Hồ sơ sinh viên”** 🎓.
> Bạn chỉ được phép cho **tài liệu sinh viên** vào tủ đó – Java Generics làm điều tương tự:
> **ngăn chặn sai sót ngay từ lúc biên dịch.**

---

## 🔧 IV. Cách Dùng Generics Trong Class Và Method

### 🔹 Class Generic

```java
class Box<T> { // T là tham số kiểu (Type Parameter)
    private T value;

    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

public class Main {
    public static void main(String[] args) {
        Box<Integer> intBox = new Box<>();
        intBox.set(100);
        System.out.println(intBox.get());

        Box<String> strBox = new Box<>();
        strBox.set("Hello Generics");
        System.out.println(strBox.get());
    }
}
```

**Kết quả:**

```
100
Hello Generics
```

### 🔹 Method Generic

```java
public static <T> void printArray(T[] arr) {
    for (T element : arr) {
        System.out.print(element + " ");
    }
}

public static void main(String[] args) {
    Integer[] nums = {1, 2, 3};
    String[] words = {"Java", "Generics"};

    printArray(nums);
    printArray(words);
}
```

> 🧠 **Theo Feynman:**
> `T` giống như **“ô trống” trên form đăng ký** 🧾 – bạn có thể điền `Integer`, `String` hay bất kỳ kiểu nào khác.
> Java sẽ tự động “điền” kiểu đó vào trong toàn bộ code của bạn.

---

## 🧮 V. Giới Hạn Kiểu (Bounded Type Parameters)

Bạn có thể **giới hạn** kiểu dữ liệu được chấp nhận bằng `extends`:

```java
class MathBox<T extends Number> { // chỉ chấp nhận kiểu con của Number
    private T value;

    public MathBox(T value) { this.value = value; }

    public double square() {
        return value.doubleValue() * value.doubleValue();
    }
}

public class Main {
    public static void main(String[] args) {
        MathBox<Integer> box = new MathBox<>(5);
        System.out.println(box.square()); // 25.0
    }
}
```

> 🧠 **Theo Feynman:**
> Đây giống như việc bạn **chỉ tuyển sinh viên ngành Khoa học máy tính**,
> chứ không nhận ai ngoài chuyên ngành đó 🎓.

---

## 🧭 VI. Tổng Kết

| Ký hiệu | Ý nghĩa                                     |
| ------- | ------------------------------------------- |
| `T`     | Type (kiểu dữ liệu bất kỳ)                  |
| `E`     | Element (thường dùng trong Collections)     |
| `K, V`  | Key, Value (dùng trong Map)                 |
| `?`     | Wildcard – đại diện cho kiểu không xác định |

---

> 💬 **Kết luận:**
> Generics giúp bạn **viết code tổng quát, tái sử dụng và an toàn**.
> Thay vì viết lại 10 lần cùng một logic cho 10 kiểu dữ liệu khác nhau,
> bạn chỉ cần **viết một lần** – và để Java làm phần còn lại.
