---
name: clean-ui-architect
description: Quy tắc thiết kế và code UI thực dụng, không border thừa, không boilerplate, dễ bảo trì.
---

# 1. NGUYÊN TẮC THỊ GIÁC: TIÊU DIỆT "AI-SLOP" & BORDER RÁC
- **CẤM DÙNG BORDER ĐỂ CHIA BỐ CỤC**: Không bao giờ tự ý bọc dữ liệu trong các thẻ Card có `border`, `shadow`, `rounded-lg` lồng nhau (Card-in-card). 
- **Phân tách bằng Khoảng trắng (Whitespace) & Tương phản nền (Surface Contrast)**:
  - Thay vì kẻ viền `border-gray-200`, hãy dùng khoảng cách (`gap-6`, `py-8`) hoặc lệch tông màu nền nhẹ (ví dụ: nền chính `bg-zinc-50`, khối nội dung `bg-white` không viền; hoặc dark mode nền `bg-zinc-950`, khối `bg-zinc-900/60`).
  - Chỉ được phép dùng border cho: Input/Select cần nhập liệu, đường kẻ chia dòng trong bảng dữ liệu lớn (`divide-y divide-zinc-200/50`), hoặc trạng thái Focus/Error.
- **Phân cấp bằng Typography, không phải bằng Khung**: Dùng độ đậm (`font-semibold` vs `font-normal`) và độ lệch màu chữ (`text-zinc-900` cho nhãn chính, `text-zinc-500` cho dữ liệu phụ) để gom nhóm thông tin. Sử dụng `tabular-nums` cho mọi con số, tiền tệ, thống kê để các cột số thẳng hàng tuyệt đối.

# 2. KIẾN TRÚC CODE: ZERO BOILERPLATE
- **Cấm tạo Wrapper vô nghĩa**: Không tạo các thẻ `<div>` chỉ để bọc một phần tử con mà không mang thuộc tính layout (`grid`, `flex`).
- **Không tách file quá sớm (Anti-Premature Abstraction)**: 
  - Giữ các sub-component nhỏ nằm chung trong cùng 1 file với màn hình chính cho đến khi nó thực sự được tái sử dụng ở 3 nơi khác nhau hoặc vượt quá 180 dòng code.
  - Cấm viết sẵn các `interface Props` có 10-15 thuộc tính dự phòng khi thực tế chỉ truyền vào 2 thuộc tính.
- **State tối giản (Derived State > useEffect)**:
  - Tuyệt đối không dùng `useEffect` + `useState` để đồng bộ dữ liệu có thể tính toán trực tiếp trong lúc render.
  - Không tạo `isLoading`, `isError` thủ công bằng `useState` nếu dự án đã có cơ chế fetch/action chuẩn.
- **Kế thừa Primitive có sẵn**: Luôn kiểm tra và dùng lại các thành phần cơ bản trong thư mục `components/ui/` (như của shadcn/ui, Radix) thay vì tự viết lại modal, dropdown, hay button từ đầu bằng HTML thuần.

# 3. QUY TẮC VIẾT CODE & BẢO TRÌ
- **Data-Driven UI**: Nếu có trên 3 phần tử lặp lại cấu trúc (danh sách thẻ, cột bảng, menu), bắt buộc đưa cấu hình ra mảng hằng số và `.map()`, cấm copy-paste khối JSX.
- **Cấm Magic Values**: Mọi khoảng cách, màu sắc phải đi theo hệ thống token có sẵn của Tailwind (`gap-4`, `text-sm`, `bg-muted`), không dùng giá trị tùy hứng kiểu `w-[347px]` hay mã hex cứng `#f4f4f6`.
- **Hàm xử lý gọn**: Không viết các hàm ẩn danh (inline arrow function) dài quá 2 dòng nằm trực tiếp trong thuộc tính `onClick` hay `onChange` của JSX.

# 4. CHECKLIST TỰ KIỂM TRA TRƯỚC KHI XUẤT CODE
Trước khi trả kết quả code UI, hãy tự rà soát:
1. Có thể xóa bớt 50% số lượng class `border` và `shadow` hiện tại mà giao diện vẫn rõ ràng nhờ `gap` và `padding` không? (Nếu có, hãy xóa ngay).
2. Có thẻ `<div>` nào xóa đi mà layout không vỡ không? (Nếu có, xóa ngay).
3. Có đoạn `useEffect` nào đang làm việc thừa thãi không?
