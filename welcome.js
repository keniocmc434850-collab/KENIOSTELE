module.exports = (bot, db) => {
  bot.command("setwelcome", async (ctx) => {
    const text = ctx.message.text.split(" ").slice(1).join(" ");
    if (!text) return ctx.reply("⚠️ Dùng: /setwelcome [nội dung]\nBiến: {name} {username} {id}");
    db.set("welcome", ctx.chat.id.toString(), text);
    ctx.reply("✅ Đã đặt tin chào mừng!");
  });

  bot.command("welcome", (ctx) => {
    const w = db.get("welcome", ctx.chat.id.toString());
    ctx.reply(w ? `👋 Tin chào hiện tại:\n${w}` : "👋 Chưa đặt tin chào. Dùng /setwelcome");
  });

  bot.command("resetwelcome", (ctx) => {
    db.del("welcome", ctx.chat.id.toString());
    ctx.reply("✅ Đã xoá tin chào mừng.");
  });

  bot.on("new_chat_members", async (ctx) => {
    const on = db.get("antiraid", ctx.chat.id.toString());
    if (on) return;
    const tmpl = db.get("welcome", ctx.chat.id.toString());
    for (const member of ctx.message.new_chat_members) {
      const text = (tmpl || "👋 Chào mừng {name} đến với nhóm!")
        .replace("{name}", member.first_name)
        .replace("{username}", member.username ? "@" + member.username : member.first_name)
        .replace("{id}", member.id);
      ctx.reply(text);
    }
  });
};
