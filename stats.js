module.exports = (bot, db) => {
  bot.command("stats", async (ctx) => {
    try {
      const count = await ctx.getChatMembersCount();
      const fame = db.load("fame");
      const totalUsers = Object.keys(fame).length;
      ctx.replyWithHTML(
        `📊 <b>Thống kê nhóm</b>\n\n` +
        `👥 Thành viên: <b>${count}</b>\n` +
        `🏆 Người dùng hoạt động: <b>${totalUsers}</b>\n` +
        `📅 Ngày: ${new Date().toLocaleDateString("vi-VN")}`
      );
    } catch(e) { ctx.reply("❌ Lỗi lấy thống kê: " + e.message); }
  });

  bot.command("ping", (ctx) => {
    const start = Date.now();
    ctx.reply("🏓 Pong!").then(() => {
      ctx.reply(`⚡ Độ trễ: <b>${Date.now() - start}ms</b>`, { parse_mode: "HTML" });
    });
  });

  bot.command("id", (ctx) => {
    ctx.replyWithHTML(
      `🆔 <b>ID của bạn:</b> <code>${ctx.from.id}</code>\n` +
      `🆔 <b>ID nhóm:</b> <code>${ctx.chat.id}</code>`
    );
  });
};
