module.exports = (bot, db) => {
  bot.command("tr", async (ctx) => {
    const args = ctx.message.text.split(" ");
    const lang = args[1] || "vi";
    const text = args.slice(2).join(" ") || ctx.message.reply_to_message?.text;
    if (!text) return ctx.reply("⚠️ Dùng: /tr [vi|en] [text] hoặc reply tin nhắn");
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const data = await res.json();
      const translated = data[0].map(t => t[0]).join("");
      ctx.replyWithHTML(`🌐 <b>Dịch (${lang}):</b>\n${translated}`);
    } catch {
      ctx.reply("❌ Lỗi dịch thuật. Vui lòng thử lại.");
    }
  });
};
