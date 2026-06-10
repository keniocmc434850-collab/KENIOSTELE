module.exports = (bot, db) => {
  bot.command("nightmode", async (ctx) => {
    const args = ctx.message.text.split(" ");
    if (args[1] === "off") {
      db.del("nightmode", ctx.chat.id.toString());
      return ctx.reply("☀️ NightMode đã tắt.");
    }
    const start = args[2] || "22:00";
    const end = args[3] || "06:00";
    db.set("nightmode", ctx.chat.id.toString(), { start, end });
    ctx.reply(`🌙 NightMode bật: <b>${start}</b> - <b>${end}</b>\nNhóm sẽ bị giới hạn trong giờ này.`, { parse_mode: "HTML" });
  });

  function isNight(start, end) {
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes();
    const cur = h * 60 + m;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const s = sh * 60 + sm, e = eh * 60 + em;
    return s > e ? (cur >= s || cur < e) : (cur >= s && cur < e);
  }

  bot.on("text", async (ctx, next) => {
    const nm = db.get("nightmode", ctx.chat.id.toString());
    if (!nm) return next();
    if (isNight(nm.start, nm.end)) {
      try { await ctx.deleteMessage(); } catch {}
      return;
    }
    next();
  });
};
