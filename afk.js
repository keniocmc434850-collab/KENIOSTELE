module.exports = (bot, db) => {
  bot.command("afk", (ctx) => {
    const args = ctx.message.text.split(" ").slice(1).join(" ");
    const reason = args || "Không có lý do";
    db.set("afk", ctx.from.id.toString(), { reason, time: Date.now(), name: ctx.from.first_name });
    ctx.reply(`💤 <b>${ctx.from.first_name}</b> đang vắng mặt\n📝 Lý do: ${reason}`, { parse_mode: "HTML" });
  });

  bot.command("back", (ctx) => {
    const afkData = db.get("afk", ctx.from.id.toString());
    if (!afkData) return ctx.reply("Bạn không trong chế độ AFK.");
    const dur = Math.round((Date.now() - afkData.time) / 60000);
    db.del("afk", ctx.from.id.toString());
    ctx.reply(`✅ <b>${ctx.from.first_name}</b> đã quay lại sau ${dur} phút!`, { parse_mode: "HTML" });
  });

  bot.on("text", (ctx, next) => {
    const mention = ctx.message.entities?.find(e => e.type === "mention");
    if (mention) {
      const allAfk = db.load("afk");
      for (const [uid, data] of Object.entries(allAfk)) {
        if (ctx.message.text.includes(data.name)) {
          const dur = Math.round((Date.now() - data.time) / 60000);
          ctx.reply(`💤 <b>${data.name}</b> đang vắng mặt (${dur} phút)\n📝 ${data.reason}`, { parse_mode: "HTML" });
        }
      }
    }
    next();
  });
};
