module.exports = (bot, db) => {
  bot.command("warn", async (ctx) => {
    const reply = ctx.message.reply_to_message;
    if (!reply) return ctx.reply("⚠️ Reply tin nhắn người cần cảnh báo.");
    const uid = reply.from.id.toString();
    const cid = ctx.chat.id.toString();
    const key = `${cid}:${uid}`;
    const warns = db.get("warns", key) || 0;
    const limit = db.get("warnlimit", cid) || 3;
    db.set("warns", key, warns + 1);
    if (warns + 1 >= limit) {
      try { await ctx.banChatMember(reply.from.id); } catch {}
      return ctx.reply(`⛔ <b>${reply.from.first_name}</b> đã bị cấm sau ${limit} cảnh báo!`, { parse_mode: "HTML" });
    }
    ctx.reply(`⚠️ Cảnh báo <b>${reply.from.first_name}</b>: ${warns+1}/${limit}`, { parse_mode: "HTML" });
  });

  bot.command("warns", (ctx) => {
    const reply = ctx.message.reply_to_message;
    const uid = reply ? reply.from.id.toString() : ctx.from.id.toString();
    const name = reply ? reply.from.first_name : ctx.from.first_name;
    const key = `${ctx.chat.id}:${uid}`;
    const w = db.get("warns", key) || 0;
    const limit = db.get("warnlimit", ctx.chat.id.toString()) || 3;
    ctx.reply(`⚠️ <b>${name}</b>: ${w}/${limit} cảnh báo`, { parse_mode: "HTML" });
  });

  bot.command("resetwarn", (ctx) => {
    const reply = ctx.message.reply_to_message;
    if (!reply) return ctx.reply("⚠️ Reply tin nhắn người cần đặt lại.");
    db.del("warns", `${ctx.chat.id}:${reply.from.id}`);
    ctx.reply(`✅ Đã xoá cảnh báo của <b>${reply.from.first_name}</b>`, { parse_mode: "HTML" });
  });

  bot.command("setwarnlimit", (ctx) => {
    const args = ctx.message.text.split(" ");
    const num = parseInt(args[1]);
    if (isNaN(num) || num < 1) return ctx.reply("⚠️ Dùng: /setwarnlimit [số]");
    db.set("warnlimit", ctx.chat.id.toString(), num);
    ctx.reply(`✅ Giới hạn cảnh báo: <b>${num}</b>`, { parse_mode: "HTML" });
  });
};
