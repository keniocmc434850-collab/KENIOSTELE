module.exports = (bot, db) => {
  const isAdmin = async (ctx) => {
    try {
      const member = await ctx.getChatMember(ctx.from.id);
      return ["administrator","creator"].includes(member.status);
    } catch { return false; }
  };

  bot.command("ban", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Chỉ admin mới dùng được lệnh này.");
    const reply = ctx.message.reply_to_message;
    if (!reply) return ctx.reply("⚠️ Reply tin nhắn của người cần cấm.");
    try {
      await ctx.banChatMember(reply.from.id);
      ctx.reply(`🔨 Đã cấm <b>${reply.from.first_name}</b>`, { parse_mode: "HTML" });
    } catch(e) { ctx.reply("❌ Không thể cấm: " + e.message); }
  });

  bot.command("unban", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Chỉ admin mới dùng được lệnh này.");
    const args = ctx.message.text.split(" ");
    if (!args[1]) return ctx.reply("⚠️ Dùng: /unban [user_id]");
    try {
      await ctx.unbanChatMember(args[1]);
      ctx.reply(`✅ Đã bỏ cấm user <code>${args[1]}</code>`, { parse_mode: "HTML" });
    } catch(e) { ctx.reply("❌ Lỗi: " + e.message); }
  });

  bot.command("kick", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Chỉ admin mới dùng được.");
    const reply = ctx.message.reply_to_message;
    if (!reply) return ctx.reply("⚠️ Reply tin nhắn người cần kick.");
    try {
      await ctx.banChatMember(reply.from.id);
      await ctx.unbanChatMember(reply.from.id);
      ctx.reply(`👢 Đã kick <b>${reply.from.first_name}</b>`, { parse_mode: "HTML" });
    } catch(e) { ctx.reply("❌ Không thể kick: " + e.message); }
  });

  bot.command("mute", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Chỉ admin mới dùng được.");
    const reply = ctx.message.reply_to_message;
    if (!reply) return ctx.reply("⚠️ Reply tin nhắn người cần mute.");
    try {
      await ctx.restrictChatMember(reply.from.id, { permissions: { can_send_messages: false } });
      ctx.reply(`🔇 Đã mute <b>${reply.from.first_name}</b>`, { parse_mode: "HTML" });
    } catch(e) { ctx.reply("❌ Không thể mute: " + e.message); }
  });

  bot.command("unmute", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Chỉ admin mới dùng được.");
    const reply = ctx.message.reply_to_message;
    if (!reply) return ctx.reply("⚠️ Reply tin nhắn người cần unmute.");
    try {
      await ctx.restrictChatMember(reply.from.id, {
        permissions: { can_send_messages: true, can_send_media_messages: true, can_send_polls: true, can_send_other_messages: true }
      });
      ctx.reply(`🔊 Đã unmute <b>${reply.from.first_name}</b>`, { parse_mode: "HTML" });
    } catch(e) { ctx.reply("❌ Không thể unmute: " + e.message); }
  });

  bot.command("admins", async (ctx) => {
    try {
      const admins = await ctx.getChatAdministrators();
      const list = admins.map(a => `• ${a.user.first_name} (${a.status})`).join("\n");
      ctx.replyWithHTML(`👮 <b>Danh sách Admin:</b>\n${list}`);
    } catch(e) { ctx.reply("❌ Lỗi: " + e.message); }
  });

  bot.command("info", async (ctx) => {
    const chat = ctx.chat;
    ctx.replyWithHTML(
      `ℹ️ <b>Thông tin nhóm</b>\n\n` +
      `📌 Tên: <b>${chat.title || chat.first_name}</b>\n` +
      `🆔 ID: <code>${chat.id}</code>\n` +
      `📋 Loại: ${chat.type}\n` +
      `👤 Bạn: ${ctx.from.first_name}`
    );
  });
};
