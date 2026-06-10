# 🤖 Bot Liễu Như Yên - Telegram Bot

Bot quản lý nhóm Telegram đầy đủ tính năng, hỗ trợ Tiếng Việt 🇻🇳 và English 🇺🇸

## 📦 Cài đặt

### Yêu cầu
- Node.js v18+ (https://nodejs.org)

### Bước 1: Cài dependencies
```bash
cd telegram-bot
npm install
```

### Bước 2: Chạy bot
```bash
npm start
```

---

## 🧩 Danh sách lệnh

### 🛡️ Quản trị
| Lệnh | Mô tả |
|------|-------|
| /ban | Reply → Cấm thành viên |
| /unban [id] | Bỏ cấm |
| /kick | Reply → Kick thành viên |
| /mute | Reply → Im lặng thành viên |
| /unmute | Reply → Bỏ im lặng |
| /admins | Danh sách admin |
| /info | Thông tin nhóm |

### 💤 AFK
| Lệnh | Mô tả |
|------|-------|
| /afk [lý do] | Bật chế độ vắng mặt |
| /back | Quay lại hoạt động |

### 🌊 Antiflood
| Lệnh | Mô tả |
|------|-------|
| /setflood [số] | Giới hạn tin nhắn (0=tắt) |
| /flood | Xem cài đặt |

### 🚫 AntiRaid
| Lệnh | Mô tả |
|------|-------|
| /antiraid on\|off | Bật/tắt chống raid |
| /raidmode | Xem trạng thái |

### ⚠️ Cảnh báo
| Lệnh | Mô tả |
|------|-------|
| /warn | Reply → Cảnh báo |
| /warns | Xem số cảnh báo |
| /resetwarn | Đặt lại cảnh báo |
| /setwarnlimit [số] | Giới hạn cảnh báo |

### 👋 Chào mừng
| Lệnh | Mô tả |
|------|-------|
| /setwelcome [text] | Đặt tin chào (biến: {name} {username} {id}) |
| /welcome | Xem tin chào |
| /resetwelcome | Xoá tin chào |

### 📝 Ghi chú
| Lệnh | Mô tả |
|------|-------|
| /save [tên] [nội dung] | Lưu ghi chú |
| /get [tên] | Lấy ghi chú |
| /notes | Xem tất cả |
| /clear [tên] | Xoá ghi chú |
| #[tên] | Gọi nhanh |

### ✅ Điểm danh
| Lệnh | Mô tả |
|------|-------|
| /diemdanh | Điểm danh hôm nay |
| /bangdiem | Xem bảng điểm |

### 🏆 FameRank
| Lệnh | Mô tả |
|------|-------|
| /rank | Xếp hạng của bạn |
| /top | Top 10 |
| /leaderboard | Bảng xếp hạng đầy đủ |

### 🔒 Khóa
| Lệnh | Mô tả |
|------|-------|
| /lock [loại] | Khóa loại nội dung |
| /unlock [loại] | Mở khóa |
| /locktypes | Xem các loại |

### 🌙 NightMode
| Lệnh | Mô tả |
|------|-------|
| /nightmode on [HH:MM] [HH:MM] | Bật (mặc định 22:00-06:00) |
| /nightmode off | Tắt |

### 🌐 Dịch thuật
| Lệnh | Mô tả |
|------|-------|
| /tr vi [text] | Dịch sang Tiếng Việt |
| /tr en [text] | Dịch sang Tiếng Anh |

### 🚷 Blacklist
| Lệnh | Mô tả |
|------|-------|
| /addblacklist [từ] | Thêm từ cấm |
| /rmblacklist [từ] | Xoá từ cấm |
| /blacklist | Xem danh sách |

### 🔐 Captcha
| Lệnh | Mô tả |
|------|-------|
| /captcha on\|off | Bật/tắt xác minh |
| /verify [đáp án] | Xác minh captcha |

### 📊 Thống kê
| Lệnh | Mô tả |
|------|-------|
| /stats | Thống kê nhóm |
| /ping | Kiểm tra bot |
| /id | Xem ID của bạn/nhóm |

---

## ⚠️ Lưu ý bảo mật
> Token bot của bạn đang được nhúng trực tiếp trong code.
> Nếu chia sẻ code, hãy dùng biến môi trường:
> ```
> BOT_TOKEN=your_token node index.js
> ```
> Và trong index.js thay bằng: `process.env.BOT_TOKEN`
