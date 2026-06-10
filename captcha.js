const pending = {};
module.exports = (bot, db) => {
  bot.command("captcha", (ctx) => {
    const on = ctx.message.text.includes("on");
    db.set("captcha", ctx.chat.id.toString(), on);
    ctx.reply(on ? "🔐 Captcha đã bật. Thành viên mới phải xác minh." : "✅ Captcha đã tắt.");
  });

  bot.on("new_chat_members", async (ctx) => {
    const on = db.get("captcha", ctx.chat.id.toString());
    const raid = db.get("antiraid", ctx.chat.id.toString());
    if (!on || raid) return;
    for (const member of ctx.message.new_chat_members) {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      pending[`${ctx.chat.id}:${member.id}`] = num1 + num2;
      try {
        await ctx.restrictChatMember(member.id, { permissions: { can_send_messages: false } });
      } catch {}
      ctx.reply(`🔐 Chào <b>${member.first_name}</b>! Xác minh: ${num1} + ${num2} = ?\nDùng /verify [đáp án]`, { parse_mode: "HTML" });
    }
  });

  bot.command("verify", async (ctx) => {
    const key = `${ctx.chat.id}:${ctx.from.id}`;
    const answer = pending[key];
    if (!answer) return;
    const given = parseInt(ctx.message.text.split(" ")[1]);
    if (given === answer) {
      delete pending[key];
      try {
        await ctx.restrictChatMember(ctx.from.id, {
          permissions: { can_send_messages: true, can_send_media_messages: true, can_send_polls: true, can_send_other_messages: true }
        });
      } catch {}
      ctx.reply(`✅ <b>${ctx.from.first_name}</b> đã xác minh thành công!`, { parse_mode: "HTML" });
    } else {
      ctx.reply(`❌ Sai rồi! Thử lại.`);
    }
  });
};
