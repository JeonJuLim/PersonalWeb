# ⚙️ Kỹ Thuật Tối Ưu Thông Số (Hyperparameter Optimization) Trong Học Máy

> “Huấn luyện mô hình là nghệ thuật — còn tối ưu tham số là khoa học.” 🧠

![Hyperparameter Tuning](https://miro.medium.com/v2/resize\:fit:1200/1*VMTc3aK7FQDL4tJ8u4b5bQ.png)

---

## 🧭 I. Giới Thiệu

Trong học máy, **hyperparameters** là những “nút điều chỉnh” bên ngoài mô hình — bạn **không học được chúng từ dữ liệu**, mà **phải chọn thủ công hoặc dùng thuật toán tối ưu**.

Ví dụ:

* Học máy cổ điển: số cây trong Random Forest, k trong KNN.
* Học sâu: learning rate, batch size, số layer, số neuron.

> 💡 **Theo Feynman:**
> Hãy tưởng tượng bạn đang **nướng bánh** 🍞 — bạn không học công thức từ bột, mà bạn phải **tự thử nhiệt độ, thời gian, và lượng đường** để ra chiếc bánh hoàn hảo. Đó chính là tinh thần của hyperparameter tuning.

---

## 🔢 II. Phân Loại Hyperparameter Theo Mô Hình

| Loại mô hình                            | Thông số cần tối ưu                           | Ảnh hưởng                     |
| --------------------------------------- | --------------------------------------------- | ----------------------------- |
| **Hồi quy / Phân loại (Logistic, SVM)** | Regularization (C), kernel, gamma             | Kiểm soát overfitting         |
| **Cây quyết định / Random Forest**      | Số cây (n_estimators), độ sâu (max_depth)     | Độ khái quát của mô hình      |
| **KNN**                                 | Số láng giềng (k), khoảng cách (metric)       | Cân bằng độ mượt và chính xác |
| **Neural Network / Deep Learning**      | Learning rate, batch size, dropout, optimizer | Tốc độ và khả năng học        |

---

## ⚙️ III. Kỹ Thuật Tối Ưu Hyperparameter

### 🔹 1. Grid Search – Tìm kiếm toàn bộ lưới tham số

Thử **mọi tổ hợp có thể** trong tập giá trị cho trước.

```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15]
}

grid = GridSearchCV(RandomForestClassifier(), param_grid, cv=3)
grid.fit(X_train, y_train)

print(grid.best_params_)
```

> ✅ Ưu điểm: Tìm được cấu hình tối ưu.
> ⚠️ Nhược điểm: Tốn thời gian, đặc biệt với nhiều tham số.

---

### 🔹 2. Random Search – Thử ngẫu nhiên trong không gian tham số

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint

param_dist = {
    'n_estimators': randint(50, 500),
    'max_depth': randint(2, 20)
}

random_search = RandomizedSearchCV(RandomForestClassifier(), param_dist, n_iter=10)
random_search.fit(X_train, y_train)

print(random_search.best_params_)
```

> ✅ Ưu điểm: Nhanh, hiệu quả với không gian lớn.
> ⚠️ Nhược điểm: Có thể bỏ lỡ vùng tối ưu.

> 🧠 **Theo Feynman:**
> Giống như **bạn thử nướng bánh ở các nhiệt độ ngẫu nhiên khác nhau**, đôi khi lại tìm ra “bí kíp gia truyền” không ngờ tới.

---

### 🔹 3. Bayesian Optimization – Tối ưu thông minh dựa trên xác suất

Dùng mô hình thống kê (Gaussian Process) để **dự đoán vùng tham số tiềm năng**, sau đó chỉ thử ở vùng đó.

```python
from skopt import BayesSearchCV

search_spaces = {
    'C': (1e-6, 1e+6, 'log-uniform'),
    'gamma': (1e-6, 1e+1, 'log-uniform')
}

opt = BayesSearchCV(SVC(), search_spaces, n_iter=32, cv=3)
opt.fit(X_train, y_train)
print(opt.best_params_)
```

> ✅ Ưu điểm: Tiết kiệm thời gian, hiệu quả cao.
> ⚠️ Nhược điểm: Cài đặt phức tạp hơn, cần thư viện ngoài (`scikit-optimize`).

> 🧠 **Theo Feynman:**
> Giống như bạn **học từ kinh nghiệm nướng bánh lần trước**, thay vì thử lại từ đầu.

---

### 🔹 4. Hyperband & Optuna – Thử nhanh, dừng sớm

#### 📘 Optuna Example

```python
import optuna

def objective(trial):
    n_estimators = trial.suggest_int('n_estimators', 50, 300)
    max_depth = trial.suggest_int('max_depth', 2, 15)

    clf = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth)
    clf.fit(X_train, y_train)
    return clf.score(X_val, y_val)

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=20)

print(study.best_params)
```

> ✅ Ưu điểm: Dừng sớm mô hình yếu, tập trung tài nguyên cho mô hình tốt.
> ⚠️ Nhược điểm: Cần GPU/CPU đủ mạnh nếu thử nhiều mô hình song song.

---

## 📈 IV. Các Thông Số Cần Tối Ưu Trong Deep Learning

| Thông số          | Mô tả                                 | Gợi ý tối ưu                                             |
| ----------------- | ------------------------------------- | -------------------------------------------------------- |
| **Learning Rate** | Bước nhảy khi cập nhật trọng số       | Thử theo log-scale: 1e-1 → 1e-5                          |
| **Batch Size**    | Số mẫu cập nhật mỗi lần               | Nhỏ (16-64): ổn định; Lớn (128+): nhanh nhưng dễ overfit |
| **Epochs**        | Số vòng lặp huấn luyện                | Dừng sớm bằng EarlyStopping                              |
| **Dropout**       | Xóa ngẫu nhiên neuron để giảm overfit | 0.2 – 0.5 là phổ biến                                    |
| **Optimizer**     | Cách tối ưu trọng số                  | Adam, SGD, RMSprop – thử nhiều để so sánh                |

### 🔍 Mẹo Thực Nghiệm:

* Dùng **Learning Rate Finder** (`lr_find` trong fastai).
* Vẽ **Loss vs Learning Rate** để chọn vùng “ổn định và giảm nhanh”.

> 🧠 **Theo Feynman:**
> Learning rate giống như **bước chân của bạn trên núi** 🏔️ —
> Bước quá to thì vấp ngã (diverge), bước quá nhỏ thì không bao giờ lên đỉnh.

---

## 🧩 V. Đánh Giá Sau Khi Tối Ưu

Dùng **cross-validation** để kiểm tra độ ổn định.

```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(grid.best_estimator_, X, y, cv=5)
print(f"Accuracy trung bình: {scores.mean():.3f} ± {scores.std():.3f}")
```

> 💬 Kết quả không chỉ cần **cao**, mà còn phải **ổn định giữa các lần chạy**.

---

## 🧭 VI. Tổng Kết

| Kỹ thuật                  | Khi nên dùng                | Ghi chú              |
| ------------------------- | --------------------------- | -------------------- |
| **Grid Search**           | Không gian nhỏ              | Toàn diện nhưng chậm |
| **Random Search**         | Không gian lớn              | Nhanh, dễ triển khai |
| **Bayesian Optimization** | Cần tối ưu thông minh       | Hiệu quả cao         |
| **Optuna / Hyperband**    | Deep learning, mô hình nặng | Dừng sớm mô hình yếu |

---

> 💬 **Kết luận:**
> Tối ưu hyperparameter không chỉ là “chạy nhiều lần” — mà là **hiểu mô hình, hiểu dữ liệu, và chọn hướng thông minh**.
> Một sinh viên giỏi Học máy không tìm ngẫu nhiên, mà **tìm có chiến lược và lý luận.**
