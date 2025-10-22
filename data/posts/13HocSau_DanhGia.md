# 🧠 Đánh Giá Mô Hình Học Sâu (Deep Learning): Hiểu, Đo Lường Và Cải Thiện

> “Huấn luyện mô hình là phần dễ, **hiểu nó đang học gì và học tốt đến đâu** mới là phần khó.”

![Loss Curve Visualization](https://miro.medium.com/v2/resize\:fit:1200/1*o4r7o8vXYyJ7rViJg8pQfw.png)

---

## 📚 I. Giới Thiệu

Khi sinh viên bắt đầu huấn luyện các mô hình học sâu (Deep Learning) – từ mạng nơ-ron (ANN) đến CNN, RNN, hay Transformer – việc **đánh giá mô hình** là kỹ năng bắt buộc.

Không chỉ xem “độ chính xác” (accuracy), bạn cần **đọc hiểu các đồ thị, ma trận, và thông số** để:

* Biết mô hình có đang học thật hay chỉ ghi nhớ (overfitting).
* Phát hiện sớm lỗi trong quá trình huấn luyện.
* Cải thiện hiệu suất mô hình qua tuning hoặc regularization.

> 🧠 **Theo Feynman:**
> Hãy tưởng tượng bạn là **huấn luyện viên bóng đá** ⚽ — bạn không chỉ cần biết tỉ số trận đấu (accuracy), mà còn phải xem **đội hình có cân bằng không, cầu thủ có mệt quá không, và chiến thuật có hợp lý không.**

---

## ⚙️ II. Loss & Accuracy – Hai Đường Cong Quan Trọng

Mỗi khi bạn huấn luyện mô hình, Colab hay PyTorch đều hiển thị hai chỉ số chính:

* **Loss:** sai số giữa dự đoán và giá trị thật.
* **Accuracy:** tỉ lệ dự đoán đúng.

### 💻 Ví dụ (Keras)

```python
history = model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=20)
```

### 📈 Vẽ biểu đồ Loss & Accuracy

```python
import matplotlib.pyplot as plt

plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.legend()
plt.title('Loss qua từng Epoch')
plt.show()
```

> 💡 **Quan sát:**
>
> * Nếu **train loss ↓** và **val loss ↓ cùng lúc** → mô hình học tốt.
> * Nếu **train loss ↓** nhưng **val loss ↑** → mô hình đang **overfitting**.

![Loss Overfitting Graph](https://miro.medium.com/v2/resize\:fit:1100/1*WNHhUo0aHHMtG0K2WBphMg.png)

> 🧠 **Theo Feynman:**
> Hãy tưởng tượng bạn học thuộc đề cũ để làm bài kiểm tra.
> Điểm luyện tập cao, nhưng thi thật thấp → bạn **học vẹt** chứ không **hiểu bài**.
> Đó chính là **overfitting.**

---

## 🧩 III. Các Thông Số Đánh Giá Trong Deep Learning

| Thông số                          | Ý nghĩa                        | Mục tiêu                               |
| --------------------------------- | ------------------------------ | -------------------------------------- |
| **Training Loss**                 | Sai số trên dữ liệu huấn luyện | Càng nhỏ càng tốt                      |
| **Validation Loss**               | Sai số trên dữ liệu kiểm định  | Càng nhỏ càng tốt, không tăng đột ngột |
| **Accuracy**                      | Tỷ lệ dự đoán đúng             | Càng cao càng tốt                      |
| **Precision / Recall / F1-score** | Độ chính xác và nhạy cảm       | Cân bằng khi dữ liệu mất cân bằng      |
| **AUC-ROC**                       | Khả năng phân biệt giữa 2 lớp  | Gần 1 là tốt                           |

---

## 🔎 IV. Ma Trận Nhầm Lẫn Cho Mô Hình Deep Learning

Ngay cả với CNN hay Transformer, bạn vẫn có thể tạo **Confusion Matrix** để xem lỗi mô hình.

```python
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import numpy as np

y_pred = np.argmax(model.predict(X_test), axis=1)
y_true = np.argmax(y_test, axis=1)

cm = confusion_matrix(y_true, y_pred)
ConfusionMatrixDisplay(cm).plot(cmap='Blues')
```

![Confusion Matrix Example](https://miro.medium.com/v2/resize\:fit:700/1*6G8y2vM_jnZ7ElA2YHfM5w.png)

> 💬 **Ý nghĩa:**
> Bạn biết mô hình **hay nhầm lẫn giữa lớp nào** — ví dụ, nhầm “mèo” với “chó” 🐱🐶 thì cần thêm dữ liệu rõ ràng hơn.

---

## 🧠 V. Kiểm Tra Overfitting & Underfitting

| Dấu hiệu                       | Training | Validation | Kết luận                               |
| ------------------------------ | -------- | ---------- | -------------------------------------- |
| Loss cao, Accuracy thấp        | Cao      | Cao        | Underfitting (chưa học đủ)             |
| Loss thấp, Accuracy cao        | Thấp     | Cao        | Tốt (mô hình cân bằng)                 |
| Loss thấp, nhưng Val Loss tăng | Thấp     | Tăng       | Overfitting (học quá kỹ dữ liệu train) |

### 🔧 Cách khắc phục Overfitting

* **Regularization:** thêm `Dropout`, `L2`, hoặc `BatchNorm`.
* **Data Augmentation:** xoay, cắt, đảo ảnh.
* **Early Stopping:** dừng huấn luyện khi val loss không giảm nữa.

```python
from keras.callbacks import EarlyStopping

callback = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=30, callbacks=[callback])
```

> 🧠 **Theo Feynman:**
> Hãy tưởng tượng bạn đang luyện hát 🎤 —
> Nếu bạn chỉ hát một bài suốt 1 tháng, bạn sẽ thuộc lòng (overfit).
> Nhưng nếu bạn tập nhiều bài, luyện hơi, luyện nhịp — bạn trở thành **ca sĩ thực thụ (generalize).**

---

## 📊 VI. Đường Cong Learning Curve & Validation Curve

### 1. Learning Curve – theo dõi mô hình học theo thời gian

```python
from sklearn.model_selection import learning_curve
```

### 2. Validation Curve – theo dõi ảnh hưởng của siêu tham số (hyperparameter)

```python
from sklearn.model_selection import validation_curve
```

> 💡 Dùng hai đường cong này để **tối ưu mô hình mà không cần đoán mò.**

![Learning Curve Example](https://miro.medium.com/v2/resize\:fit:1000/1*BPTF8A9DncZWd2DwU8K62g.png)

---

## 🧩 VII. Đánh Giá Bằng TensorBoard

TensorBoard là công cụ mạnh mẽ của TensorFlow để trực quan hóa quá trình huấn luyện.

```python
from tensorflow.keras.callbacks import TensorBoard

tensorboard = TensorBoard(log_dir='./logs')
model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=10, callbacks=[tensorboard])
```

Chạy TensorBoard:

```bash
!tensorboard --logdir ./logs
```

> 📈 Xem biểu đồ loss, accuracy, graph mô hình, histogram của tham số và learning rate.

---

## 🧭 VIII. Tổng Kết

| Chỉ số                    | Ý nghĩa                     | Cách đọc                         |
| ------------------------- | --------------------------- | -------------------------------- |
| **Train Loss / Val Loss** | Sai số học và kiểm định     | Nếu chênh lệch lớn → overfitting |
| **Accuracy / F1-score**   | Độ chính xác dự đoán        | Càng cao càng tốt                |
| **Confusion Matrix**      | Phân tích lỗi từng lớp      | Dùng cho phân loại               |
| **ROC-AUC**               | Đánh giá khả năng phân biệt | Gần 1 là tốt                     |
| **Learning Curve**        | Theo dõi quá trình học      | Giúp chọn epoch tối ưu           |
| **TensorBoard**           | Quan sát toàn bộ quá trình  | Trực quan, chuyên nghiệp         |

---

> 💬 **Kết luận:**
> Một sinh viên học máy giỏi không chỉ biết “train mô hình” mà còn biết **đọc mô hình như đọc nhạc phổ** 🎼.
> Mỗi chỉ số là **một nốt nhạc** — hiểu được chúng, bạn sẽ điều khiển “bản giao hưởng AI” của mình thật hoàn hảo.
