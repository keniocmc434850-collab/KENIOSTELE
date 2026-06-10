module.exports = (bot, db) => {
  bot.command("antiraid", async (ctx) => {
    const args = ctx.message.text.split(" ");
    const mode = args[1];
    if (!["on","off"].includes(mode)) return ctx.reply("⚠️ Dùng: /antiraid on|off");
    db.set("antiraid", ctx.chat.id.toString(), mode === "on");
    ctx.reply(mode === "on" ? "🚫 AntiRaid đã bật! Thành viên mới sẽ bị kick." : "✅ AntiRaid đã tắt.");
  });

  bot.command("raidmode", (ctx) => {
    const on = db.get("antiraid", ctx.chat.id.toString());
    ctx.reply(`🚫 AntiRaid: <b>${on ? "Đang bật 🔴" : "Đang tắt 🟢"}</b>`, { parse_mode: "HTML" });
  });

  bot.on("new_chat_members", async (ctx) => {
    const on = db.get("antiraid", ctx.chat.id.toString());
    if (!on) return;
    for (const member of ctx.message.new_chat_members) {
      try {
        await ctx.banChatMember(member.id);
        await ctx.unbanChatMember(member.id);
      } catch {}
    }
    ctx.reply("🚫 AntiRaid: Thành viên mới đã bị kick!");
  });
};
