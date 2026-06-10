const floodTrack = {};
module.exports = (bot, db) => {
  bot.command("setflood", async (ctx) => {
    const args = ctx.message.text.split(" ");
    const num = parseInt(args[1]);
    if (isNaN(num)) return ctx.reply("⚠️ Dùng: /setflood [số] (0 để tắt)");
    db.set("flood", ctx.chat.id.toString(), num);
    if (num === 0) return ctx.reply("✅ Đã tắt antiflood.");
    ctx.reply(`✅ Antiflood: giới hạn <b>${num}</b> tin/10 giây`, { parse_mode: "HTML" });
  });

  bot.command("flood", (ctx) => {
    const limit = db.get("flood", ctx.chat.id.toString()) || 0;
    ctx.reply(limit ? `🌊 Antiflood: <b>${limit}</b> tin/10 giây` : "🌊 Antiflood đang tắt", { parse_mode: "HTML" });
  });

  bot.on("text", async (ctx, next) => {
    const limit = db.get("flood", ctx.chat.id.toString());
    if (!limit) return next();
    const key = `${ctx.chat.id}:${ctx.from.id}`;
    if (!floodTrack[key]) floodTrack[key] = { count: 0, reset: Date.now() + 10000 };
    if (Date.now() > floodTrack[key].reset) floodTrack[key] = { count: 0, reset: Date.now() + 10000 };
    floodTrack[key].count++;
    if (floodTrack[key].count > limit) {
      try {
        await ctx.restrictChatMember(ctx.from.id, { permissions: { can_send_messages: false } });
        ctx.reply(`⚠️ <b>${ctx.from.first_name}</b> đã bị mute do spam!`, { parse_mode: "HTML" });
      } catch {}
    }
    next();
  });
};
