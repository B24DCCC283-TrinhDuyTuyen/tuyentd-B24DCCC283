# Hệ thống Quản lý Ngân hàng Câu hỏi Tự luận

## Tổng quan

Hệ thống quản lý ngân hàng câu hỏi tự luận là một ứng dụng web toàn diện cho phép:
- Quản lý danh sách các khối kiến thức
- Quản lý thông tin môn học (mã, tên, tín chỉ)
- Lưu trữ và tìm kiếm câu hỏi tự luận theo độ khó và khối kiến thức
- Tạo cấu trúc đề thi linh hoạt
- Sinh đề thi tự động từ ngân hàng câu hỏi

---

## Kiến trúc Hệ thống

### 1. Cấu trúc dữ liệu (Data Models)

#### Subject (Môn học)
```typescript
{
  id: string;           // ID duy nhất
  code: string;         // Mã môn học (VD: WEB101, JAVA102)
  name: string;         // Tên môn học
  credits: number;      // Số tín chỉ
  createdAt?: number;   // Thời gian tạo
}
```

#### KnowledgeBlock (Khối kiến thức)
```typescript
{
  id: string;           // ID duy nhất
  name: string;         // Tên khối (VD: Tổng quan, Chuyên sâu)
}
```

#### Question (Câu hỏi)
```typescript
{
  id: string;           // ID duy nhất
  code: string;         // Mã câu hỏi (VD: Q001, Q002)
  subject: string;      // ID của môn học
  content: string;      // Nội dung câu hỏi
  difficulty: "Dễ" | "Trung bình" | "Khó" | "Rất khó";
  block: string;        // ID của khối kiến thức
  createdAt?: number;   // Thời gian tạo
}
```

#### ExamRule (Quy tắc cấu trúc)
```typescript
{
  id: string;
  difficulty: "Dễ" | "Trung bình" | "Khó" | "Rất khó";
  block: string;        // ID khối kiến thức
  count: number;        // Số lượng câu hỏi cần có
}
```

#### ExamStructure (Cấu trúc đề thi)
```typescript
{
  id: string;           // ID duy nhất
  name: string;         // Tên cấu trúc (VD: Đề giữa kỳ)
  subject: string;      // ID của môn học
  rules: ExamRule[];    // Danh sách các quy tắc
  totalQuestions: number; // Tổng số câu hỏi
  description?: string;
  createdAt?: number;
}
```

#### Exam (Đề thi)
```typescript
{
  id: string;           // ID duy nhất
  subject: string;      // ID của môn học
  structureId: string;  // ID của cấu trúc đề
  questions: Question[]; // Danh sách câu hỏi
  createdAt?: number;
}
```

---

## Các tính năng chính

### 1. Quản lý Môn học
**Đường dẫn:** Phần `Quản lý môn học`

**Tính năng:**
- ✅ Thêm môn học mới (với mã, tên, tín chỉ)
- ✅ Hiển thị danh sách môn học trong bảng
- ✅ Tìm kiếm môn học theo mã hoặc tên
- ✅ Chỉnh sửa thông tin môn học
- ✅ Xoá môn học

**Quy trình thêm môn học:**
1. Nhấn nút "Thêm môn học"
2. Điền mã môn, tên môn, số tín chỉ
3. Nhấn "Lưu" để thêm

### 2. Quản lý Khối kiến thức
**Đường dẫn:** Phần `Quản lý khối kiến thức`

**Tính năng:**
- ✅ Thêm khối kiến thức mới
- ✅ Hiển thị danh sách khối kiến thức
- ✅ Tìm kiếm khối kiến thức
- ✅ Chỉnh sửa tên khối kiến thức
- ✅ Xoá khối kiến thức

**Công dụng:** Dùng để phân loại câu hỏi và tạo cấu trúc đề thi

### 3. Quản lý Câu hỏi
**Đường dẫn:** Phần `Quản lý câu hỏi tự luận`

**Tính năng:**
- ✅ Thêm câu hỏi mới với thông tin:
  - Mã câu hỏi
  - Nội dung
  - Môn học
  - Khối kiến thức
  - Độ khó (Dễ, Trung bình, Khó, Rất khó)
- ✅ Hiển thị danh sách câu hỏi trong bảng
- ✅ Tìm kiếm câu hỏi theo mã hoặc nội dung
- ✅ Lọc câu hỏi theo:
  - Môn học
  - Khối kiến thức
  - Độ khó
- ✅ Chỉnh sửa câu hỏi
- ✅ Xoá câu hỏi

**Màu sắc độ khó:**
- 🟢 Dễ: Xanh lá
- 🟠 Trung bình: Cam
- 🔴 Khó: Đỏ
- ⚫ Rất khó: Đỏ đậm

### 4. Quản lý Cấu trúc Đề thi
**Đường dẫn:** Phần `Quản lý cấu trúc đề thi`

**Tính năng:**
- ✅ Tạo cấu trúc đề thi mới với:
  - Tên cấu trúc
  - Chọn môn học
  - Mô tả (tuỳ chọn)
  - Thêm các quy tắc (rules)
- ✅ Mỗi quy tắc bao gồm:
  - Độ khó (Dễ, Trung bình, Khó, Rất khó)
  - Khối kiến thức
  - Số lượng câu hỏi cần có
- ✅ Thêm/xoá quy tắc một cách linh hoạt
- ✅ Chỉnh sửa cấu trúc đề
- ✅ Xoá cấu trúc đề
- ✅ Hiển thị tổng số câu hỏi của cấu trúc

**Ví dụ cấu trúc đề:**
```
Tên: Đề thi giữa kỳ
Môn học: Lập trình Web
Tổng câu hỏi: 5

Quy tắc:
1. Dễ + Tổng quan: 1 câu
2. Trung bình + Tổng quan: 2 câu
3. Khó + Chuyên sâu: 2 câu
```

### 5. Quản lý Đề thi
**Đường dẫn:** Phần `Quản lý đề thi`

**Tính năng:**
- ✅ Tạo đề thi mới từ cấu trúc
- ✅ Hệ thống tự động:
  - Tìm kiếm câu hỏi phù hợp từ ngân hàng
  - Kiểm tra điều kiện (có đủ câu hỏi không)
  - Sinh đề ngẫu nhiên
- ✅ Hiển thị danh sách đề thi đã tạo
- ✅ Xem chi tiết đề thi (Drawer):
  - ID đề thi
  - Môn học
  - Cấu trúc sử dụng
  - Danh sách đầy đủ câu hỏi
- ✅ Xóa đề thi

**Quy trình tạo đề thi:**
1. Nhấn nút "Tạo đề thi mới"
2. Chọn cấu trúc đề từ dropdown
3. Nhấn "Tạo đề"
4. Hệ thống sẽ:
   - Kiểm tra xem có đủ câu hỏi không
   - Nếu có: Sinh đề thi và hiển thị thông báo thành công
   - Nếu không: Hiển thị lỗi với chi tiết (cần bao nhiêu câu, thiếu bao nhiêu)

---

## Luồng công việc (Workflow)

### Quy trình Setup hệ thống ban đầu

```
1. Thêm Khối kiến thức
   ↓
   (VD: Tổng quan, Chuyên sâu, Nâng cao)

2. Thêm Môn học
   ↓
   (VD: WEB101 - Lập trình Web, 3 tín chỉ)

3. Thêm Câu hỏi
   ↓
   (Mỗi câu hỏi liên kết với một môn học, khối kiến thức, và độ khó)
   (Ít nhất 5-10 câu hỏi cho mỗi môn học)

4. Tạo Cấu trúc Đề thi
   ↓
   (Định nghĩa cấu trúc: bao nhiêu câu dễ, trung bình, khó...)

5. Sinh Đề thi
   ↓
   (Hệ thống tự động tạo đề từ cấu trúc và ngân hàng câu hỏi)
```

### Quy trình sử dụng hàng ngày

```
1. Kiểm tra/cập nhật Câu hỏi
   └─ Thêm câu hỏi mới
   └─ Sửa câu hỏi hiện có
   └─ Xoá câu hỏi lỗi

2. Tạo Đề thi
   └─ Chọn cấu trúc
   └─ Sinh đề
   └─ Xem chi tiết đề

3. Quản lý Đề thi
   └─ Xem/in đề thi
   └─ Xoá đề thi không cần thiết
```

---

## Xử lý lỗi

### Lỗi khi tạo đề thi

**Lỗi:** "Không đủ câu hỏi cho năng lực [độ khó], khối [tên khối]. Cần X câu nhưng chỉ có Y"

**Giải quyết:**
1. Kiểm tra số lượng câu hỏi hiện có
2. Thêm câu hỏi mới phù hợp
3. Thử tạo đề thi lại

### Lỗi khác

**Lỗi:** "Vui lòng chọn cấu trúc đề thi"
- Nguyên nhân: Chưa chọn cấu trúc
- Giải quyết: Chọn cấu trúc từ dropdown

**Lỗi:** "Vui lòng thêm ít nhất một quy tắc"
- Nguyên nhân: Cấu trúc không có quy tắc
- Giải quyết: Thêm ít nhất một quy tắc khi tạo cấu trúc

---

## Ghi chú kỹ thuật

### Thư mục dự án

```
src/
├── services/NganHangCauHoi/
│   ├── subject.ts           # Dịch vụ môn học
│   ├── knowledgeBlock.ts    # Dịch vụ khối kiến thức
│   ├── question.ts          # Dịch vụ câu hỏi
│   ├── examStructure.ts     # Dịch vụ cấu trúc đề
│   └── exam.ts              # Dịch vụ đề thi

├── models/NganHangCauHoi/
│   ├── subject.ts           # Model Umi cho môn học
│   ├── knowledgeBlock.ts    # Model Umi cho khối kiến thức
│   ├── question.ts          # Model Umi cho câu hỏi
│   ├── examStructure.ts     # Model Umi cho cấu trúc đề
│   └── exam.ts              # Model Umi cho đề thi

└── pages/NganHangCauHoi/
    ├── index.tsx
    └── components/
        ├── Subject.tsx              # Component môn học
        ├── KnowledgeBlock.tsx       # Component khối kiến thức
        ├── Question.tsx             # Component câu hỏi
        ├── ExamStrcuture.tsx        # Component cấu trúc đề
        └── GenerateExam.tsx         # Component đề thi
```

### Công nghệ sử dụng

- **Framework:** Umi.js (React framework)
- **UI Library:** Ant Design
- **State Management:** Umi Models (DVA)
- **Language:** TypeScript

### Lưu trữ dữ liệu

Hiện tại, dữ liệu được lưu trong bộ nhớ (các biến array trong services).
Để sử dụng dữ liệu lâu dài, bạn nên kết nối với API backend hoặc database.

### Kế tiếp có thể cải thiện

- [ ] Kết nối API backend
- [ ] Hỗ trợ import/export đề thi (PDF, Word, Excel)
- [ ] Lưu lịch sử sinh đề
- [ ] Tính năng in đề thi
- [ ] Hỗ trợ multiple choice questions
- [ ] Thống kê sử dụng câu hỏi
- [ ] Phân quyền người dùng
- [ ] Đánh giá độ khó tự động

---

## Hướng dẫn sử dụng chi tiết

### Ví dụ thực hành hoàn chỉnh

#### Bước 1: Tạo Khối kiến thức

1. Truy cập phần "Quản lý khối kiến thức"
2. Nhấn "Thêm khối kiến thức"
3. Thêm các khối:
   - Tổng quan
   - Chuyên sâu
   - Nâng cao

#### Bước 2: Tạo Môn học

1. Truy cập phần "Quản lý môn học"
2. Nhấn "Thêm môn học"
3. Thêm:
   - Mã: WEB101
   - Tên: Lập trình Web
   - Tín chỉ: 3

#### Bước 3: Thêm Câu hỏi

1. Truy cập phần "Quản lý câu hỏi tự luận"
2. Nhấn "Thêm câu hỏi"
3. Điền thông tin:
   - Mã câu: Q001
   - Nội dung: "Giải thích HTML là gì?"
   - Môn học: WEB101 - Lập trình Web
   - Khối kiến thức: Tổng quan
   - Độ khó: Dễ
4. Lặp lại thêm ít nhất 10-15 câu hỏi với các độ khó khác nhau

#### Bước 4: Tạo Cấu trúc Đề

1. Truy cập phần "Quản lý cấu trúc đề thi"
2. Nhấn "Tạo cấu trúc đề"
3. Điền:
   - Tên cấu trúc: Đề thi giữa kỳ
   - Môn học: WEB101 - Lập trình Web
   - Mô tả: Đề thi kiểm tra kiến thức giữa kỳ
4. Thêm quy tắc:
   - Rule 1: Dễ + Tổng quan: 2 câu
   - Rule 2: Trung bình + Tổng quan: 2 câu
   - Rule 3: Khó + Chuyên sâu: 1 câu
5. Nhấn "Lưu"

#### Bước 5: Sinh Đề thi

1. Truy cập phần "Quản lý đề thi"
2. Nhấn "Tạo đề thi mới"
3. Chọn cấu trúc: "Đề thi giữa kỳ"
4. Nhấn "Tạo đề"
5. Xem kết quả và có thể xem chi tiết đề

---

## Support

Nếu bạn gặp vấn đề, hãy:
1. Kiểm tra lỗi trong console (F12)
2. Xem phần "Xử lý lỗi" ở trên
3. Kiểm tra dữ liệu (có đủ câu hỏi không)
4. Tạo issue hoặc liên hệ support

---

**Phiên bản:** 1.0.0  
**Cập nhật lần cuối:** 2026-03-10
