# 📊 Các Thông Số & Ma Trận Đánh Giá Mô Hình Học Máy Dành Cho Sinh Viên

> “Một mô hình không chỉ cần chạy được — mà phải được **đo lường, hiểu và cải thiện**.”

![Confusion Matrix Visualization](https://upload.wikimedia.org/wikipedia/commons/2/2b/Confusion_matrix.svg)

---

## 🧠 I. Giới Thiệu

Sau khi huấn luyện mô hình học máy, bước quan trọng nhất là **đánh giá hiệu suất** của mô hình đó.
Các chỉ số và ma trận này giúp bạn **biết mô hình học tốt đến đâu**, có **đoán đúng không**, và **nên cải thiện chỗ nào**.

> 💡 **Feynman nói:** “Nếu bạn không thể đo được, bạn không thể hiểu nó.”
> Vì vậy, học cách đọc **chỉ số đánh giá (metrics)** chính là chìa khóa để hiểu mô hình của bạn.

---

## ⚙️ II. Các Thông Số Cơ Bản

| Thông số      | Ý nghĩa                                            | Áp dụng                                   |
| ------------- | -------------------------------------------------- | ----------------------------------------- |
| **Accuracy**  | Tỷ lệ dự đoán đúng                                 | Phân loại cân bằng                        |
| **Precision** | Trong số dự đoán dương, bao nhiêu là đúng          | Khi sai dương (false positive) gây hại    |
| **Recall**    | Trong số thật dương, bao nhiêu được phát hiện đúng | Khi bỏ sót là vấn đề nghiêm trọng         |
| **F1-score**  | Trung hòa giữa Precision và Recall                 | Khi dữ liệu mất cân bằng                  |
| **Loss**      | Mức sai lệch trung bình của mô hình                | Mọi loại mô hình (học sâu, hồi quy, v.v.) |

---

## 🔢 III. Ma Trận Nhầm Lẫn (Confusion Matrix)

Ma trận nhầm lẫn thể hiện **so sánh giữa kết quả thật và kết quả dự đoán**.

|                | Dự đoán Dương       | Dự đoán Âm          |
| -------------- | ------------------- | ------------------- |
| **Thật Dương** | TP (True Positive)  | FN (False Negative) |
| **Thật Âm**    | FP (False Positive) | TN (True Negative)  |

### 📘 Ví dụ:

```python
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

y_true = [1, 0, 1, 1, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1]

cm = confusion_matrix(y_true, y_pred)
ConfusionMatrixDisplay(cm).plot()
```

![Confusion Matrix Example](https://miro.medium.com/v2/resize\:fit:800/1*6G8y2vM_jnZ7ElA2YHfM5w.png)

> 🧠 **Theo Feynman:**
> Hãy tưởng tượng bạn là **bác sĩ chẩn đoán bệnh** 🩺.
>
> * **TP:** bạn nói bệnh nhân có bệnh, và họ thật sự có. ✅
> * **FP:** bạn nói có bệnh, nhưng họ khỏe. ❌
> * **FN:** bạn nói khỏe, nhưng họ có bệnh thật. ⚠️
> * **TN:** bạn nói khỏe, và họ khỏe thật. ✅
>   Hiểu ma trận này giúp bạn biết **mô hình “chẩn đoán” tốt đến đâu.**

---

## 📈 IV. Các Chỉ Số Phổ Biến Trong Phân Loại

### 1. **Accuracy (Độ Chính Xác)**

```python
from sklearn.metrics import accuracy_score
accuracy = accuracy_score(y_true, y_pred)
print("Accuracy:", accuracy)
```

> Công thức:
> ( Accuracy = \frac{TP + TN}{TP + TN + FP + FN} )

### 2. **Precision (Độ Chính Xác Dự Đoán Dương)**

```python
from sklearn.metrics import precision_score
precision = precision_score(y_true, y_pred)
print("Precision:", precision)
```

> ( Precision = \frac{TP}{TP + FP} )

### 3. **Recall (Độ Nhạy)**

```python
from sklearn.metrics import recall_score
recall = recall_score(y_true, y_pred)
print("Recall:", recall)
```

> ( Recall = \frac{TP}{TP + FN} )

### 4. **F1-score (Trung Hòa Giữa Precision & Recall)**

```python
from sklearn.metrics import f1_score
f1 = f1_score(y_true, y_pred)
print("F1-score:", f1)
```

> ( F1 = 2 * \frac{Precision * Recall}{Precision + Recall} )

> 🧠 **Theo Feynman:**
> Accuracy giống như **điểm trung bình cả lớp**, nhưng F1-score giống như **điểm của bạn trong hai môn quan trọng nhất** – nó cho bạn **cái nhìn cân bằng hơn**.

---

## 📉 V. Các Chỉ Số Cho Mô Hình Hồi Quy

| Thông số                              | Ý nghĩa                         |
| ------------------------------------- | ------------------------------- |
| **MAE (Mean Absolute Error)**         | Sai số trung bình tuyệt đối     |
| **MSE (Mean Squared Error)**          | Bình phương sai số trung bình   |
| **RMSE (Root Mean Squared Error)**    | Căn bậc hai của MSE             |
| **R² (Coefficient of Determination)** | Mức độ mô hình khớp với dữ liệu |

### 💻 Ví dụ:

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

true = [2.5, 0.0, 2.1, 1.6]
pred = [3.0, -0.1, 2.0, 1.5]

mae = mean_absolute_error(true, pred)
mse = mean_squared_error(true, pred)
rmse = mean_squared_error(true, pred, squared=False)
r2 = r2_score(true, pred)

print(f"MAE: {mae:.2f}, MSE: {mse:.2f}, RMSE: {rmse:.2f}, R²: {r2:.2f}")
```

> 🧠 **Theo Feynman:**
> Nếu bạn là người ném phi tiêu 🎯, thì:
>
> * **MAE** là khoảng cách trung bình đến tâm.
> * **MSE** phạt nặng hơn nếu bạn ném quá lệch.
> * **R²** cho biết **đường ném của bạn ổn định đến mức nào.**

---

## 🧮 VI. Đường ROC & AUC

Đường **ROC (Receiver Operating Characteristic)** cho thấy khả năng mô hình **phân biệt giữa 2 lớp**.

* **AUC (Area Under Curve)** = diện tích dưới đường ROC.
* AUC gần 1 → mô hình phân biệt tốt.
* AUC = 0.5 → mô hình “đoán đại”.

```python
from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt

y_score = [0.9, 0.4, 0.3, 0.8, 0.2]
fpr, tpr, thresholds = roc_curve(y_true, y_score)
roc_auc = auc(fpr, tpr)

plt.plot(fpr, tpr, label=f'AUC = {roc_auc:.2f}')
plt.plot([0,1], [0,1], 'k--')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend()
plt.show()
```

![ROC Curve Example](https://upload.wikimedia.org/wikipedia/commons/1/13/Roc_curve.svg)

> 🧠 **Theo Feynman:**
> ROC giống như **biểu đồ phản ứng của radar** 🛰️ — càng tách biệt rõ “tàu địch” và “tàu ta”, mô hình càng thông minh.

---

## 🧭 VII. Tổng Kết

| Nhóm mô hình                   | Chỉ số chính                             | Dụng cụ hỗ trợ             |
| ------------------------------ | ---------------------------------------- | -------------------------- |
| **Phân loại (Classification)** | Accuracy, Precision, Recall, F1, ROC/AUC | Confusion Matrix           |
| **Hồi quy (Regression)**       | MAE, MSE, RMSE, R²                       | Biểu đồ dự đoán vs thực tế |

---

> 💬 **Kết luận:**
> Biết đánh giá mô hình là **bước trưởng thành** của một sinh viên học máy.
> Khi bạn hiểu từng chỉ số, bạn không chỉ biết mô hình đúng hay sai —
> mà còn **hiểu vì sao nó đúng, vì sao nó sai**, và **làm sao để cải thiện nó.**
