module.exports = (bot, db) => {
  bot.command("diemdanh", (ctx) => {
    const today = new Date().toDateString();
    const key = `${ctx.chat.id}:${today}`;
    const list = db.get("diemdanh", key) || [];
    const uid = ctx.from.id.toString();
    if (list.includes(uid)) return ctx.reply(`✅ <b>${ctx.from.first_name}</b> đã điểm danh hôm nay rồi!`, { parse_mode: "HTML" });
    list.push(uid);
    db.set("diemdanh", key, list);
    // Update score
    const score = db.get("fame", uid) || { name: ctx.from.first_name, points: 0 };
    score.points += 1;
    score.name = ctx.from.first_name;
    db.set("fame", uid, score);
    ctx.reply(`✅ <b>${ctx.from.first_name}</b> đã điểm danh!\n🏆 Điểm: ${score.points}`, { parse_mode: "HTML" });
  });

  bot.command("bangdiem", (ctx) => {
    const today = new Date().toDateString();
    const key = `${ctx.chat.id}:${today}`;
    const list = db.get("diemdanh", key) || [];
    ctx.reply(`📋 Điểm danh hôm nay: <b>${list.length}</b> người`, { parse_mode: "HTML" });
  });
};
