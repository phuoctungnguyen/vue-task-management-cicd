# Todo Management System (Fullstack OOP & SOLID Plan)

## 1. Tổng quan

- **Dự án:** Todo Management System (Enterprise Architecture)
- **Mục tiêu:** Xây dựng ứng dụng quản lý công việc chuyên nghiệp, tách biệt hoàn toàn Business Logic và UI.
- **Trọng tâm kỹ thuật:**
  - **Backend (NestJS):** Sử dụng Mongoose với class-based schema, áp dụng Repository Pattern để tuân thủ Dependency Inversion.
  - **Frontend (Vue 3):** Sử dụng Composition API kết hợp Service Classes để quản lý dữ liệu và logic nghiệp vụ.
- **Nguyên tắc cốt lõi:** SOLID, Clean Architecture, Type Safety.

## 2. Tech Stack

- **Frontend:** Vue 3 (Composition API), TypeScript, Pinia, Axios
- **Backend:** NestJS, TypeScript, MongoDB (Mongoose)
- **Database Management:** MongoDB Atlas (Cloud) hoặc MongoDB Compass (Local GUI)
- **Tools:** Swagger, class-validator, Docker (optional)

## 3. Cấu trúc thư mục (Updated)

### Backend (NestJS)

```text
src/
├── core/                        # Abstraction Layer
│   └── interfaces/
│       ├── itodo.service.ts
│       └── itodo.repository.ts
├── modules/
│   └── todo/
│       ├── schemas/             # MongoDB Class-based Schemas
│       │   └── todo.schema.ts
│       ├── dto/                 # Validation Layer
│       │   ├── create-todo.dto.ts
│       │   └── update-todo.dto.ts
│       ├── todo.controller.ts
│       ├── todo.service.ts
│       └── todo.repository.ts   # Mongoose Implementation
└── main.ts
```

### Frontend (Vue 3)

```text
src/
├── core/                        # Business Logic (Pure TS)
│   ├── models/                  # OOP Classes (Todo Entity)
│   ├── interfaces/              # Contract definitions
│   └── services/                # Service Layer (logic không phụ thuộc UI)
│       └── TodoService.ts
├── infra/                       # Infrastructure (API Implementation)
│   └── TodoApiClient.ts
├── stores/                      # State Management (Orchestrator)
│   └── todoStore.ts
├── components/                  # UI Components
└── views/                       # Pages
```

## 4. Roadmap (6 Phases)

### 🔹 Phase 1: Foundation & MongoDB Setup

- **🎯 Mục tiêu:** Thiết lập kết nối Database và cấu trúc chuẩn.
- MongoDB Atlas: Khởi tạo cluster, lấy connection string.
- NestJS Setup: Cấu hình `MongooseModule`, thiết lập biến môi trường `.env`.
- Class-based Schema: Định nghĩa todo schema bằng decorators (`@Schema`, `@Prop`).

### 🔹 Phase 2: Backend Core (SOLID Repository)

- **🎯 Mục tiêu:** Xây dựng tầng truy vấn dữ liệu linh hoạt.
- Repository Pattern: Thực thi `TodoRepository` để bọc các hàm của Mongoose.
- Ý nghĩa: Giúp service không phụ thuộc trực tiếp vào Mongoose (Dependency Inversion).
- DTO & Validation: Sử dụng `class-validator` để đảm bảo dữ liệu sạch trước khi vào DB.
- Swagger: Tích hợp `@nestjs/swagger` để làm tài liệu API.

### 🔹 Phase 3: Frontend OOP Infrastructure

- **🎯 Mục tiêu:** Xây dựng "đầu não" cho frontend trước khi làm UI.
- Model Class: Tạo class `Todo` ở FE với các phương thức như `isExpired()`, `getFormattedDate()`.
- Service Layer: Viết `TodoService.ts` để xử lý logic filter, sort và gọi API.
- Axios Instance: Cấu hình interceptors để xử lý lỗi hệ thống (global error handling).

### 🔹 Phase 4: Pinia Store & UI Integration

- **🎯 Mục tiêu:** Hiển thị dữ liệu lên màn hình.
- Store Orchestration: Pinia gọi qua service class, giúp store mỏng và dễ test.
- Vue Components:
  - `TodoLayout.vue`: Bố cục chính.
  - `TodoItem.vue`: Áp dụng logic từ model class.
- Reactive States: Xử lý loading, empty state và error state.

### 🔹 Phase 5: Advanced Features & Business Logic

- **🎯 Mục tiêu:** Thêm các tính năng nâng cao bằng OOP.
- Filter Strategy: Lọc theo status (All, Active, Completed).
- Bulk Actions: Xóa nhiều công việc cùng lúc, đánh dấu tất cả là hoàn thành.
- Search Debounce: Tối ưu hiệu năng tìm kiếm.

### 🔹 Phase 6: Testing & Quality Assurance

- **🎯 Mục tiêu:** Đảm bảo hệ thống không có lỗi logic.
- Unit Test (NestJS): Test `TodoService` bằng cách mock repository.
- Unit Test (Vue 3): Kiểm tra các hàm logic trong `TodoService` ở FE.
- README: Viết hướng dẫn kiến trúc và cách triển khai với Docker.

## 5. Tiêu chí hoàn thành (Definition of Done)

Mỗi phase chỉ được xem là hoàn tất khi thỏa tất cả tiêu chí sau:

- Code đã merge theo đúng kiến trúc đã định nghĩa (SOLID + tách lớp rõ ràng).
- Unit test liên quan chạy pass.
- API/feature chính của phase hoạt động ổn định khi test thủ công.
- Swagger/README được cập nhật phản ánh đúng thay đổi mới.
- Không có lỗi TypeScript hoặc lỗi lint nghiêm trọng.

## 6. API Contract chuẩn hóa (Backend <-> Frontend)

**Quy ước response thành công:**

```json
{
  "success": true,
  "data": {},
  "message": "optional"
}
```

**Quy ước response lỗi:**

```json
{
  "success": false,
  "errorCode": "TODO_NOT_FOUND",
  "message": "Todo not found",
  "details": null
}
```

**Nguyên tắc:**

- FE chỉ xử lý theo contract chung, không phụ thuộc message tự do.
- Backend map exception nội bộ thành `errorCode` nhất quán.
- Validate input ở DTO trước khi vào tầng nghiệp vụ.

## 7. Dependency Injection Token (NestJS)

Để đảm bảo Dependency Inversion, chuẩn hóa token cho interface:

- `TODO_REPOSITORY`: interface truy cập dữ liệu Todo.
- `TODO_SERVICE`: interface xử lý nghiệp vụ Todo.

**Ví dụ hướng triển khai:**

- Module provider bind token -> class implementation.
- Service/controller inject qua token thay vì inject class cụ thể.

**Lợi ích:**

- Dễ mock khi unit test.
- Dễ thay thế Mongoose bằng nguồn dữ liệu khác trong tương lai.

## 8. Testing Strategy mở rộng

Bên cạnh unit test, bổ sung E2E test cho các luồng chính:

- `POST /todos` (create)
- `GET /todos` (list)
- `PATCH /todos/:id` (update)
- `DELETE /todos/:id` (delete)
- Filter theo status và search theo keyword

**Tiêu chí chất lượng kiểm thử:**

- Unit test tập trung logic nghiệp vụ (service/use case).
- E2E test đảm bảo contract API và tích hợp DB hoạt động đúng.
- FE test logic filter/sort/search trong service và store orchestration.

## 9. Quản lý môi trường & cấu hình

Thiết lập cấu hình theo môi trường:

- `.env.development`
- `.env.staging`
- `.env.production`

**Biến bắt buộc (gợi ý):**

- `MONGODB_URI`
- `PORT`
- `CORS_ORIGIN`
- `API_PREFIX`

**Nguyên tắc:**

- Không hardcode secret trong source code.
- Có file `.env.example` để onboarding nhanh.
- Cấu hình validate khi app khởi động để fail fast nếu thiếu biến quan trọng.

## 10. Risk & Mitigation

- **Rủi ro 1:** Service/backend phình to do dồn quá nhiều logic.
  - **Mitigation:** Tách use case theo hành vi chính (`CreateTodo`, `UpdateTodo`, `CompleteAll`, ...).
- **Rủi ro 2:** FE store chứa logic nghiệp vụ trùng với service.
  - **Mitigation:** Store chỉ orchestration state, domain logic đặt trong service/model.
- **Rủi ro 3:** Contract FE-BE thay đổi gây lỗi dây chuyền.
  - **Mitigation:** Quản lý version API và thêm E2E test contract.
- **Rủi ro 4:** Schema thay đổi làm hỏng dữ liệu cũ.
  - **Mitigation:** Có migration script/chiến lược tương thích ngược trước khi rollout.