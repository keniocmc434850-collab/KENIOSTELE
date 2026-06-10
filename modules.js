const { Markup } = require("telegraf");

function backBtn() {
  return Markup.inlineKeyboard([[Markup.button.callback("‹ Quay lại Menu", "menu_main")]]);
}

const modules = {
  mod_quantri: (ctx) => ctx.editMessageText(
    `🛡️ <b>Quản trị</b>\n\nLệnh quản lý thành viên:\n` +
    `/ban @user - Cấm thành viên\n/unban @user - Bỏ cấm\n/kick @user - Đuổi khỏi nhóm\n` +
    `/mute @user [thời gian] - Im lặng\n/unmute @user - Bỏ im lặng\n/promote @user - Thăng cấp\n/demote @user - Hạ cấp`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_afk: (ctx) => ctx.editMessageText(
    `💤 <b>AFK - Vắng mặt</b>\n\n` +
    `/afk [lý do] - Bật chế độ vắng\n/back - Trở lại\n\nBot tự động thông báo khi bạn được nhắc đến.`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_antiflood: (ctx) => ctx.editMessageText(
    `🌊 <b>Antiflood</b>\n\n` +
    `/setflood [số] - Giới hạn tin nhắn liên tiếp\n/setflood 0 - Tắt antiflood\n/flood - Xem cài đặt hiện tại`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_antiraid: (ctx) => ctx.editMessageText(
    `🚫 <b>AntiRaid</b>\n\n` +
    `/antiraid on - Bật chế độ chống raid\n/antiraid off - Tắt\n/raidmode - Xem trạng thái\n\nTự động kick thành viên mới khi bật.`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_authenticate: (ctx) => ctx.editMessageText(
    `🔐 <b>Xác thực (Captcha)</b>\n\n` +
    `/captcha on - Bật xác thực\n/captcha off - Tắt\n/setcaptcha [text|button|math] - Kiểu captcha`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_tudong: (ctx) => ctx.editMessageText(
    `⚙️ <b>Tự động trả lời</b>\n\n` +
    `/addfilter [từ khóa] [trả lời] - Thêm\n/rmfilter [từ khóa] - Xoá\n/filters - Xem danh sách`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_autoreact: (ctx) => ctx.editMessageText(
    `😍 <b>AutoReact</b>\n\n` +
    `/react add [emoji] [từ khóa] - Thêm react\n/react remove [từ khóa] - Xoá\n/react list - Xem tất cả`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_blacklist: (ctx) => ctx.editMessageText(
    `🚷 <b>Blacklist</b>\n\n` +
    `/addblacklist [từ] - Thêm từ cấm\n/rmblacklist [từ] - Xoá\n/blacklist - Xem danh sách\n/setblacklistaction [warn|mute|kick|ban]`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_chaomung: (ctx) => ctx.editMessageText(
    `👋 <b>Chào mừng</b>\n\n` +
    `/setwelcome [nội dung] - Đặt tin chào\n/welcome - Xem tin chào hiện tại\n/resetwelcome - Đặt lại mặc định\n\nBiến: {name} {username} {id} {count}`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_diemdanh: (ctx) => ctx.editMessageText(
    `✅ <b>Điểm danh</b>\n\n` +
    `/diemdanh - Điểm danh hôm nay\n/bangdiem - Xem bảng điểm danh\n/diemdanh_reset - Đặt lại`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_famerank: (ctx) => ctx.editMessageText(
    `🏆 <b>FameRank - Bảng xếp hạng</b>\n\n` +
    `/rank - Xếp hạng của bạn\n/top - Top 10 thành viên\n/leaderboard - Bảng xếp hạng đầy đủ`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_boloc: (ctx) => ctx.editMessageText(
    `🔍 <b>Bộ lọc</b>\n\n` +
    `/addfilter [từ] [trả lời] - Thêm bộ lọc\n/rmfilter [từ] - Xoá\n/filters - Danh sách\n/stop [từ] - Dừng filter`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_khoa: (ctx) => ctx.editMessageText(
    `🔒 <b>Khóa nhóm</b>\n\n` +
    `/lock [loại] - Khóa tính năng\n/unlock [loại] - Mở khóa\n/locktypes - Xem các loại\n\nLoại: sticker, gif, url, forward, bot, photo, video, voice`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_modmail: (ctx) => ctx.editMessageText(
    `✉️ <b>Modmail</b>\n\n` +
    `/modmail [nội dung] - Gửi thư đến quản trị\n/modmailreply [id] [trả lời] - Phản hồi\n/modmaillist - Xem hộp thư`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_nightmode: (ctx) => ctx.editMessageText(
    `🌙 <b>NightMode</b>\n\n` +
    `/nightmode on [giờ bắt đầu] [giờ kết thúc] - Bật\n/nightmode off - Tắt\nVí dụ: /nightmode on 22:00 06:00`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_ghichu: (ctx) => ctx.editMessageText(
    `📝 <b>Ghi chú</b>\n\n` +
    `/save [tên] [nội dung] - Lưu ghi chú\n/get [tên] - Lấy ghi chú\n#[tên] - Gọi nhanh ghi chú\n/notes - Xem tất cả\n/clear [tên] - Xoá ghi chú`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_phantich: (ctx) => ctx.editMessageText(
    `📊 <b>Phân tích & Thống kê</b>\n\n` +
    `/stats - Thống kê nhóm\n/activity - Hoạt động thành viên\n/report - Báo cáo vi phạm\n/admins - Danh sách admin`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_translate: (ctx) => ctx.editMessageText(
    `🌐 <b>Dịch thuật</b>\n\n` +
    `/tr vi [text] - Dịch sang Tiếng Việt\n/tr en [text] - Dịch sang Tiếng Anh\n/tr auto [text] - Tự nhận diện ngôn ngữ`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_taive: (ctx) => ctx.editMessageText(
    `⬇️ <b>Tải về</b>\n\n` +
    `/dl [url] - Tải file từ link\n/ytdl [url] - Tải YouTube\n/mp3 [url] - Tải nhạc\n/mp4 [url] - Tải video`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_yeughet: (ctx) => ctx.editMessageText(
    `❤️ <b>YêuGhét</b>\n\n` +
    `/love @user - Bày tỏ tình cảm\n/hate @user - Bày tỏ không thích\n/loveboard - Bảng xếp hạng tình cảm`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_lichsutenq: (ctx) => ctx.editMessageText(
    `📅 <b>Lịch sử Tên</b>\n\n` +
    `/namelog @user - Xem lịch sử tên\n/clearnames @user - Xoá lịch sử`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_sieukqt: (ctx) => ctx.editMessageText(
    `⚡ <b>Siêu Quản Trị</b>\n\n` +
    `/gban @user - Cấm toàn cầu\n/ungban @user - Bỏ cấm toàn cầu\n/broadcast [nội dung] - Gửi thông báo tất cả nhóm`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_chude: (ctx) => ctx.editMessageText(
    `🎨 <b>Chủ đề</b>\n\n` +
    `/settheme [tên] - Đặt chủ đề\n/themes - Xem danh sách chủ đề\n/resettheme - Đặt lại mặc định`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_warn: (ctx) => ctx.editMessageText(
    `⚠️ <b>Cảnh báo</b>\n\n` +
    `/warn @user [lý do] - Cảnh báo\n/warns @user - Xem số cảnh báo\n/resetwarn @user - Đặt lại\n/setwarnlimit [số] - Giới hạn cảnh báo`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_importex: (ctx) => ctx.editMessageText(
    `📦 <b>Import/Export</b>\n\n` +
    `/export - Xuất dữ liệu nhóm\n/import [file] - Nhập dữ liệu\n/backup - Sao lưu cài đặt`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_developer: (ctx) => ctx.editMessageText(
    `👨‍💻 <b>Developer</b>\n\n` +
    `/eval [code] - Chạy code (chỉ dev)\n/logs - Xem logs\n/reload - Tải lại modules\n/ping - Kiểm tra bot`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_channelp: (ctx) => ctx.editMessageText(
    `📢 <b>Channel Post</b>\n\n` +
    `/setpost [channel_id] - Đặt kênh đăng bài\n/post [nội dung] - Đăng lên kênh\n/autopost on|off - Tự động đăng`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_channels: (ctx) => ctx.editMessageText(
    `📡 <b>Channel Sync</b>\n\n` +
    `/sync add [channel] - Thêm kênh đồng bộ\n/sync remove [channel] - Xoá\n/synclist - Danh sách kênh`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_cleanserv: (ctx) => ctx.editMessageText(
    `🧹 <b>CleanServer</b>\n\n` +
    `/cleanservice on|off - Bật/tắt dọn dẹp\n/purge [số] - Xoá tin nhắn gần đây\n/del - Xoá tin nhắn được reply`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_ketnoi: (ctx) => ctx.editMessageText(
    `🔗 <b>Kết nối</b>\n\n` +
    `/connect [group_id] - Kết nối nhóm\n/disconnect - Ngắt kết nối\n/connected - Xem kết nối hiện tại`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_congcudan: (ctx) => ctx.editMessageText(
    `📋 <b>CôngCụDán</b>\n\n` +
    `/paste [nội dung] - Đăng nội dung dài\n/getpaste [id] - Lấy nội dung\n/pastelist - Danh sách`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_daoly: (ctx) => ctx.editMessageText(
    `📜 <b>Đạo lý / Nội quy</b>\n\n` +
    `/setrules [nội quy] - Đặt nội quy\n/rules - Xem nội quy\n/clearrules - Xoá nội quy`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_ownereve: (ctx) => ctx.editMessageText(
    `👑 <b>OwnerEvent</b>\n\n` +
    `/setevent [tên] [mô tả] - Tạo sự kiện\n/events - Xem sự kiện\n/notify [nội dung] - Thông báo tất cả`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_trichxuat: (ctx) => ctx.editMessageText(
    `📤 <b>TríchXuất</b>\n\n` +
    `/extract members - Xuất danh sách thành viên\n/extract messages - Trích xuất tin nhắn\n/extract admins - Danh sách admin`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_timkiem: (ctx) => ctx.editMessageText(
    `🔎 <b>TìmKiếmÀ</b>\n\n` +
    `/search [từ khóa] - Tìm tin nhắn\n/searchuser [tên] - Tìm thành viên\n/searchnote [từ] - Tìm ghi chú`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_tinhnang1: (ctx) => ctx.editMessageText(
    `🧠 <b>TínhNăng AI</b>\n\n` +
    `/ai [câu hỏi] - Hỏi AI\n/summarize - Tóm tắt cuộc trò chuyện\n/translate ai [text] - Dịch thông minh`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_tinhnang2: (ctx) => ctx.editMessageText(
    `✨ <b>TínhNăng mở rộng</b>\n\n` +
    `/poll [câu hỏi] [lựa chọn] - Tạo bình chọn\n/quiz - Tạo quiz\n/game - Mini game\n/weather [thành phố] - Thời tiết`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_taophien: (ctx) => ctx.editMessageText(
    `🗂️ <b>TạoPhiên</b>\n\n` +
    `/session start [tên] - Bắt đầu phiên\n/session end - Kết thúc\n/session list - Xem phiên`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  mod_nhandan: (ctx) => ctx.editMessageText(
    `🏷️ <b>NhãnDán</b>\n\n` +
    `/tag @user [nhãn] - Gán nhãn\n/untag @user - Gỡ nhãn\n/tags - Xem danh sách nhãn`,
    { parse_mode: "HTML", ...backBtn() }
  ),
  menu_dong: (ctx) => ctx.editMessageText("✅ Đã đóng menu."),
};

module.exports = modules;
