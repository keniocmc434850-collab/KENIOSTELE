module.exports = (bot, db) => {
  bot.command("rank", (ctx) => {
    const uid = ctx.from.id.toString();
    const score = db.get("fame", uid) || { name: ctx.from.first_name, points: 0 };
    ctx.reply(`🏆 <b>${score.name}</b>\n⭐ Điểm: ${score.points}`, { parse_mode: "HTML" });
  });

  bot.command("top", (ctx) => {
    const all = db.load("fame");
    const sorted = Object.values(all).sort((a, b) => b.points - a.points).slice(0, 10);
    if (!sorted.length) return ctx.reply("📊 Chưa có dữ liệu xếp hạng.");
    const medals = ["🥇","🥈","🥉"];
    const list = sorted.map((u, i) => `${medals[i] || (i+1)+"."} <b>${u.name}</b> - ${u.points} điểm`).join("\n");
    ctx.replyWithHTML(`🏆 <b>Top thành viên:</b>\n\n${list}`);
  });

  bot.command("leaderboard", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "📊 Đang tải bảng xếp hạng...").then(() => {
      const all = db.load("fame");
      const sorted = Object.values(all).sort((a, b) => b.points - a.points);
      if (!sorted.length) return ctx.reply("Chưa có dữ liệu.");
      const list = sorted.map((u, i) => `${i+1}. ${u.name} - ${u.points} điểm`).join("\n");
      ctx.replyWithHTML(`🏆 <b>Bảng xếp hạng đầy đủ:</b>\n\n${list}`);
    });
  });

  // Add points when user sends message
  bot.on("text", (ctx, next) => {
    const uid = ctx.from.id.toString();
    const score = db.get("fame", uid) || { name: ctx.from.first_name, points: 0 };
    score.points += 0.1;
    score.name = ctx.from.first_name;
    db.set("fame", uid, score);
    next();
  });
};
