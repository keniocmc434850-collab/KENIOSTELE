const { Telegraf, Markup } = require("telegraf");
const fs = require("fs");
const path = require("path");

const BOT_TOKEN = "8620336521:AAG_u9AYArtryE9fGjJ1R8gny8NtoO4tUgo";
const bot = new Telegraf(BOT_TOKEN);

// Load modules
const db = require("./db");
const modules = require("./modules");

// ─── MENU CHÍNH ───────────────────────────────────────────────
bot.start((ctx) => {
  const name = ctx.from.first_name || "bạn";
  ctx.replyWithHTML(
    `👋 Xin chào <b>${name}</b>!\n\nTôi là <b>Liễu Như Yên</b> 🤖\nTôi hỗ trợ Tiếng Việt 🇻🇳 và English 🇺🇸\n\nChọn module bên dưới để bắt đầu:`,
    showMainMenu()
  );
});

bot.help((ctx) => {
  ctx.replyWithHTML(
    `📚 <b>Hướng dẫn sử dụng</b>\n\n` +
    `• /start - Menu chính\n` +
    `• /menu - Hiển thị menu\n` +
    `• /help - Hướng dẫn\n` +
    `• /info - Thông tin nhóm\n` +
    `• /stats - Thống kê\n\n` +
    `<i>Chọn module trong menu để xem thêm lệnh.</i>`
  );
});

bot.command("menu", (ctx) => {
  ctx.reply("🏠 Menu chính:", showMainMenu());
});

// ─── CALLBACK HANDLER ─────────────────────────────────────────
bot.on("callback_query", async (ctx) => {
  const data = ctx.callbackQuery.data;
  await ctx.answerCbQuery();

  if (data === "menu_main") return ctx.editMessageText("🏠 Menu chính:", showMainMenu());
  if (data === "menu_huongdan") return showHuongDan(ctx);
  if (data === "menu_timkiem") return ctx.editMessageText("🔍 Nhập từ khoá tìm kiếm module:");

  // Module callbacks
  const handler = modules[data];
  if (handler) return handler(ctx);

  ctx.editMessageText(`⚙️ Module <b>${data}</b> đang được xử lý...`, {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([[Markup.button.callback("‹ Quay lại", "menu_main")]])
  });
});

// ─── MAIN MENU ────────────────────────────────────────────────
function showMainMenu() {
  return {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      [btn("🛡️ Quản trị", "mod_quantri"), btn("💤 AFK", "mod_afk"), btn("🌊 Antiflood", "mod_antiflood")],
      [btn("🚫 AntiRaid", "mod_antiraid"), btn("🔐 Xác thực", "mod_authenticate"), btn("⚙️ Tự động C", "mod_tudong")],
      [btn("😍 AutoReact", "mod_autoreact"), btn("🚷 BlacklistC", "mod_blacklist"), btn("📢 ChannelP", "mod_channelp")],
      [btn("📡 ChannelS", "mod_channels"), btn("🧹 CleanServ", "mod_cleanserv"), btn("🔗 Kết nối", "mod_ketnoi")],
      [btn("📋 CôngCụDán", "mod_congcudan"), btn("📜 Đạo lý", "mod_daoly"), btn("👨‍💻 Developer", "mod_developer")],
      [btn("✅ DiemDanh", "mod_diemdanh"), btn("🏆 FameRank", "mod_famerank"), btn("🔍 Bộ lọc", "mod_boloc")],
      [btn("👋 Chào mừng", "mod_chaomung"), btn("📦 Import/Ex", "mod_importex"), btn("🔒 Khóa", "mod_khoa")],
      [btn("✉️ Modmail", "mod_modmail"), btn("🏷️ NhãnDán", "mod_nhandan"), btn("🌙 NightMode", "mod_nightmode")],
      [btn("📝 Ghi chú", "mod_ghichu"), btn("👑 OwnerEve", "mod_ownereve"), btn("📊 PhânTích", "mod_phantich")],
      [btn("📅 Lịch sử Tên", "mod_lichsutenq"), btn("⚡ SiêuQuảnTrị", "mod_sieukqt"), btn("🎨 Chủ đề", "mod_chude")],
      [btn("🌐 Translate", "mod_translate"), btn("📤 TríchXuất", "mod_trichxuat"), btn("🔎 TìmKiếm", "mod_timkiem")],
      [btn("🧠 TínhNăngI", "mod_tinhnang1"), btn("✨ TínhNăng", "mod_tinhnang2"), btn("🗂️ TạoPhiên", "mod_taophien")],
      [btn("⬇️ TảiVề", "mod_taive"), btn("❤️ YêuGhét", "mod_yeughet")],
      [Markup.button.callback("🔍 Tìm kiếm", "menu_timkiem"), Markup.button.callback("❌ Đóng", "menu_dong")],
      [Markup.button.callback("📚 Hướng dẫn đầy đủ", "menu_huongdan")],
    ])
  };
}

function btn(label, data) {
  return Markup.button.callback(label, data);
}

function showHuongDan(ctx) {
  ctx.editMessageText(
    `📚 <b>Hướng dẫn đầy đủ</b>\n\n` +
    `<b>🛡️ Quản trị</b> - /ban /unban /kick /mute /unmute /warn\n` +
    `<b>💤 AFK</b> - /afk [lý do] · /back\n` +
    `<b>🌊 Antiflood</b> - /setflood [số] · /flood\n` +
    `<b>🚫 AntiRaid</b> - /antiraid on|off · /raidmode\n` +
    `<b>🔐 Xác thực</b> - /captcha on|off · /verify\n` +
    `<b>😍 AutoReact</b> - /react add [emoji] [từ]\n` +
    `<b>🚷 Blacklist</b> - /addblacklist · /rmblacklist\n` +
    `<b>✅ DiemDanh</b> - /diemdanh · /bangdiem\n` +
    `<b>🏆 FameRank</b> - /rank · /top · /leaderboard\n` +
    `<b>👋 Chào mừng</b> - /setwelcome · /welcome\n` +
    `<b>🔒 Khóa</b> - /lock · /unlock · /locktypes\n` +
    `<b>✉️ Modmail</b> - /modmail [nội dung]\n` +
    `<b>🌙 NightMode</b> - /nightmode on|off [giờ]\n` +
    `<b>📝 Ghi chú</b> - /save [tên] · /get [tên] · /notes\n` +
    `<b>📊 PhânTích</b> - /stats · /activity · /report\n` +
    `<b>🌐 Translate</b> - /tr [ngôn ngữ] [text]\n` +
    `<b>⬇️ TảiVề</b> - /dl [url] · /ytdl [url]\n`,
    {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([[Markup.button.callback("‹ Quay lại", "menu_main")]])
    }
  );
}

// ─── LOAD MODULE HANDLERS ─────────────────────────────────────
require("./commands/quantri")(bot, db);
require("./commands/afk")(bot, db);
require("./commands/antiflood")(bot, db);
require("./commands/antiraid")(bot, db);
require("./commands/welcome")(bot, db);
require("./commands/warn")(bot, db);
require("./commands/notes")(bot, db);
require("./commands/diemdanh")(bot, db);
require("./commands/famerank")(bot, db);
require("./commands/lock")(bot, db);
require("./commands/nightmode")(bot, db);
require("./commands/translate")(bot, db);
require("./commands/blacklist")(bot, db);
require("./commands/captcha")(bot, db);
require("./commands/stats")(bot, db);

// ─── START BOT ────────────────────────────────────────────────
bot.launch().then(() => {
  console.log("✅ Bot Liễu Như Yên đã khởi động!");
  console.log("📡 Đang lắng nghe tin nhắn...");
}).catch(err => {
  console.error("❌ Lỗi khởi động:", err.message);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
