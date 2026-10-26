# ⚽ MatchPitch - Hệ Thống Ghép Trận & Tìm Đối Bóng Đá Online (Ranked Matchmaking)

> Nền tảng ghép trận bóng đá phong trào tự động mô phỏng cơ chế tìm trận của các tựa game Esport (như *League of Legends, CS2, FIFA, Valorant*).

🌐 **Live Demo:** [https://anhhoang61.github.io/booking-soccer/](https://anhhoang61.github.io/booking-soccer/)

---

## 🚀 Các Tính Năng Chính

- **⚔️ Hàng Chờ Tìm Trận (Matchmaking Queue):** Quét radar tìm đối thủ online theo thời gian thực, ước tính thời gian chờ, hỗ trợ thu nhỏ thanh tìm trận để tự do lướt xem BXH.
- **🏆 3 Chế Độ Ghép Trận:**
  - **Đấu Xếp Hạng (Ranked):** Ghép chặt chẽ theo bậc **ELO** (±75 điểm), thăng/giáng hạng.
  - **Giao Hữu Nhanh (Quick Match):** Tìm đối thủ gần nhất và nhanh nhất (<30s).
  - **Kèo Thách Đấu (High Stakes):** Đội thua chịu 100% tiền sân hoặc chầu nước.
- **🔔 Modal "MATCH FOUND" & Sẵn Sàng (Ready Check):** Đếm ngược 15 giây, hiệu ứng âm thanh fanfare sống động bằng Web Audio API, sẵn sàng 2/2.
- **🛡️ Sảnh Đối Đầu (Match Room):**
  - Màn hình VS so sánh chỉ số 2 đội, ELO, đội trưởng.
  - Tự động phát hiện và cảnh báo trùng màu áo (Color Clash Detection).
  - Kênh Chat Đội Trưởng kèm các câu thoại nhanh (Quick Chat).
  - Tự động đề xuất sân bóng trung gian tiện nhất cho 2 đội.
- **🎫 Xuất Vé Trận Đấu (Match Ticket):** Mã QR check-in tại quầy lễ tân sân bóng, nút sao chép gửi nhóm Zalo, nút thêm vào Google Calendar.
- **📋 Phòng Chờ Mở (Custom Lobbies):** Đăng kèo và nhận kèo giao lưu trực tiếp.
- **📊 Bảng Xếp Hạng (Leaderboard) & Điểm Uy Tín (Fair-Play):** Chống bùng kèo, chấm điểm văn hóa sân cỏ.

---

## 🛠️ Công Nghệ Sử Dụng

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Canvas Confetti**
- **Web Audio API** (tổng hợp âm thanh không cần file ngoài)

---

## 💻 Cài Đặt & Chạy Cục Bộ

```bash
# Cài đặt dependencies
npm install

# Khởi chạy dev server
npm run dev
```
Mở trình duyệt tại `http://localhost:5188/`.
