module.exports = (bot, db) => {
  const lockTypes = ["sticker","gif","url","forward","bot","photo","video","voice","document"];

  bot.command("lock", async (ctx) => {
    const args = ctx.message.text.split(" ");
    const type = args[1];
    if (!type || !lockTypes.includes(type)) return ctx.reply(`⚠️ Loại: ${lockTypes.join(", ")}`);
    const locks = db.get("locks", ctx.chat.id.toString()) || [];
    if (!locks.includes(type)) locks.push(type);
    db.set("locks", ctx.chat.id.toString(), locks);
    ctx.reply(`🔒 Đã khóa: <b>${type}</b>`, { parse_mode: "HTML" });
  });

  bot.command("unlock", (ctx) => {
    const args = ctx.message.text.split(" ");
    const type = args[1];
    const locks = db.get("locks", ctx.chat.id.toString()) || [];
    const newLocks = locks.filter(l => l !== type);
    db.set("locks", ctx.chat.id.toString(), newLocks);
    ctx.reply(`🔓 Đã mở khóa: <b>${type}</b>`, { parse_mode: "HTML" });
  });

  bot.command("locktypes", (ctx) => {
    const locks = db.get("locks", ctx.chat.id.toString()) || [];
    ctx.replyWithHTML(`🔒 <b>Các loại khóa:</b>\nTất cả: ${lockTypes.join(", ")}\n\nĐang khóa: ${locks.length ? locks.join(", ") : "Không có"}`);
  });

  bot.on(["sticker","photo","video","voice","document"], async (ctx, next) => {
    const locks = db.get("locks", ctx.chat.id.toString()) || [];
    const type = ctx.updateType;
    if (locks.includes(type)) {
      try { await ctx.deleteMessage(); } catch {}
      return ctx.reply(`🔒 <b>${type}</b> bị khóa trong nhóm này.`, { parse_mode: "HTML" });
    }
    next();
  });
};
