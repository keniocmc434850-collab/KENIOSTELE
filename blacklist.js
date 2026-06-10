module.exports = (bot, db) => {
  bot.command("addblacklist", (ctx) => {
    const word = ctx.message.text.split(" ").slice(1).join(" ").toLowerCase();
    if (!word) return ctx.reply("⚠️ Dùng: /addblacklist [từ]");
    const list = db.get("blacklist", ctx.chat.id.toString()) || [];
    if (!list.includes(word)) list.push(word);
    db.set("blacklist", ctx.chat.id.toString(), list);
    ctx.reply(`🚷 Đã thêm từ cấm: <b>${word}</b>`, { parse_mode: "HTML" });
  });

  bot.command("rmblacklist", (ctx) => {
    const word = ctx.message.text.split(" ")[1]?.toLowerCase();
    if (!word) return ctx.reply("⚠️ Dùng: /rmblacklist [từ]");
    const list = (db.get("blacklist", ctx.chat.id.toString()) || []).filter(w => w !== word);
    db.set("blacklist", ctx.chat.id.toString(), list);
    ctx.reply(`✅ Đã xoá từ cấm: <b>${word}</b>`, { parse_mode: "HTML" });
  });

  bot.command("blacklist", (ctx) => {
    const list = db.get("blacklist", ctx.chat.id.toString()) || [];
    if (!list.length) return ctx.reply("🚷 Danh sách đen trống.");
    ctx.replyWithHTML(`🚷 <b>Từ bị cấm:</b>\n${list.map(w => `• ${w}`).join("\n")}`);
  });

  bot.on("text", async (ctx, next) => {
    const list = db.get("blacklist", ctx.chat.id.toString()) || [];
    const text = ctx.message.text.toLowerCase();
    const found = list.find(w => text.includes(w));
    if (found) {
      try { await ctx.deleteMessage(); } catch {}
      return ctx.reply(`🚷 Tin nhắn chứa từ bị cấm: <b>${found}</b>`, { parse_mode: "HTML" });
    }
    next();
  });
};
