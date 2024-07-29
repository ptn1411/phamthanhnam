# Module Cập Nhật Bảng Điểm

Module này chịu trách nhiệm quản lý và cập nhật bảng điểm cho trang web của chúng tôi, nơi hiển thị 10 điểm số hàng đầu của người dùng. Nó xử lý các cập nhật trực tiếp khi điểm số của người dùng thay đổi và đảm bảo rằng chỉ các cập nhật điểm được ủy quyền mới được xử lý để ngăn chặn hành vi xấu.

## Tổng Quan

- **Mục Đích**: Cập nhật và quản lý bảng điểm trực tiếp dựa trên hành động của người dùng và đảm bảo xử lý điểm số an toàn.
- **Tính Năng Chính**:
  - Cập nhật trực tiếp 10 điểm số hàng đầu.
  - API an toàn để cập nhật điểm số nhằm ngăn chặn thay đổi không được ủy quyền.

## Các Điểm Cuối API

### 1. **Cập Nhật Điểm Người Dùng**

- **Điểm Cuối**: `POST /api/scores/update`
- **Mô Tả**: Cập nhật điểm số của một người dùng cụ thể sau khi họ hoàn thành hành động.
- **Tham Số Yêu Cầu**:
  - `user_id` (chuỗi): Mã định danh duy nhất của người dùng.
  - `score` (số nguyên): Điểm số mới sẽ được cộng vào điểm số hiện tại của người dùng.
- **Nội Dung Yêu Cầu**:

  ```json
  {
  	"user_id": "chuỗi",
  	"score": 0
  }
  ```

- **Phản Hồi**:
  - Thành Công: 200 OK với điểm số cập nhật của người dùng.
  - Lỗi: 400 Bad Request nếu yêu cầu không hợp lệ, 401 Unauthorized nếu xác thực không thành công, 403 Forbidden nếu người dùng không được phép cập nhật điểm số.

### 2. **Lấy 10 Điểm Số Hàng Đầu**

- **Điểm Cuối: GET /api/scores/top**
- **Mô Tả: Lấy 10 điểm số hàng đầu từ bảng điểm.**
- **Tham Số Yêu Cầu: Không có**
- **Phản Hồi**:

  ```json
  [
  	{
  		"user_id": "chuỗi",
  		"score": 0
  	}
  ]
  ```
- **Trạng Thái Phản Hồi**:
  - Thành Công: 200 OK với danh sách 10 điểm số hàng đầu.
  - Lỗi: 500 Internal Server Error nếu có sự cố khi lấy điểm số.

###  **An Ninh** 
- **Xác Thực: Các cuộc gọi API phải bao gồm khóa API hợp lệ trong tiêu đề yêu cầu.**
- **Ủy Quyền: Chỉ những người dùng hoặc dịch vụ được ủy quyền mới có thể gửi cập nhật điểm số.**
- **Xác Thực Dữ Liệu: Tất cả dữ liệu đầu vào cần được xác thực để đảm bảo định dạng đúng và nằm trong phạm vi mong đợi.**
- **Giới Hạn Tốc Độ: Thực hiện giới hạn tốc độ để ngăn chặn lạm dụng và yêu cầu quá mức từ cùng một người dùng hoặc địa chỉ IP.**

###  **Sơ Đồ Luồng Dữ Liệu** 
- **Mô Tả**:
  - Hành Động của Người Dùng: Người dùng thực hiện một hành động dẫn đến việc cập nhật điểm số.
  - Cuộc Gọi API: Trang web thực hiện yêu cầu POST /api/scores/update để cập nhật điểm số của người dùng.
  - Kiểm Tra Xác Thực: Máy chủ xác minh khóa API và quyền ủy quyền.
  - Cập Nhật Điểm Số: Máy chủ xử lý cập nhật điểm số và lưu điểm số mới.
  - Cập Nhật 10 Điểm Số Hàng Đầu: Máy chủ cập nhật danh sách 10 điểm số hàng đầu.
  - Cập Nhật Trực Tiếp: Bảng điểm trên trang web phản ánh điểm số cập nhật trong thời gian thực.
  
###  **Nhận Xét Thêm**
  - Xử Lý Lỗi: Bao gồm thông báo lỗi chi tiết và nhật ký để hỗ trợ gỡ lỗi và giám sát.
  - Kiểm Thử: Kiểm tra kỹ lưỡng API cho các kịch bản khác nhau, bao gồm yêu cầu hợp lệ và không hợp lệ, để đảm bảo độ tin cậy.
  - Tài Liệu: Cung cấp tài liệu API với ví dụ để dễ dàng tích hợp bởi các nhóm frontend.

