module.exports = (bot, db) => {
  bot.command("save", (ctx) => {
    const args = ctx.message.text.split(" ");
    if (args.length < 3) return ctx.reply("⚠️ Dùng: /save [tên] [nội dung]");
    const name = args[1].toLowerCase();
    const content = args.slice(2).join(" ");
    const notes = db.get("notes", ctx.chat.id.toString()) || {};
    notes[name] = content;
    db.set("notes", ctx.chat.id.toString(), notes);
    ctx.reply(`📝 Đã lưu ghi chú: <b>${name}</b>`, { parse_mode: "HTML" });
  });

  bot.command("get", (ctx) => {
    const args = ctx.message.text.split(" ");
    if (!args[1]) return ctx.reply("⚠️ Dùng: /get [tên]");
    const notes = db.get("notes", ctx.chat.id.toString()) || {};
    const note = notes[args[1].toLowerCase()];
    if (!note) return ctx.reply(`❌ Không tìm thấy ghi chú: ${args[1]}`);
    ctx.reply(`📝 <b>${args[1]}</b>:\n${note}`, { parse_mode: "HTML" });
  });

  bot.command("notes", (ctx) => {
    const notes = db.get("notes", ctx.chat.id.toString()) || {};
    const keys = Object.keys(notes);
    if (!keys.length) return ctx.reply("📝 Chưa có ghi chú nào.");
    ctx.reply(`📝 <b>Danh sách ghi chú:</b>\n${keys.map(k => `• #${k}`).join("\n")}`, { parse_mode: "HTML" });
  });

  bot.command("clear", (ctx) => {
    const args = ctx.message.text.split(" ");
    if (!args[1]) return ctx.reply("⚠️ Dùng: /clear [tên]");
    const notes = db.get("notes", ctx.chat.id.toString()) || {};
    delete notes[args[1].toLowerCase()];
    db.set("notes", ctx.chat.id.toString(), notes);
    ctx.reply(`✅ Đã xoá ghi chú: <b>${args[1]}</b>`, { parse_mode: "HTML" });
  });

  bot.hears(/^#(\w+)$/, (ctx) => {
    const name = ctx.match[1].toLowerCase();
    const notes = db.get("notes", ctx.chat.id.toString()) || {};
    const note = notes[name];
    if (note) ctx.reply(`📝 <b>${name}</b>:\n${note}`, { parse_mode: "HTML" });
  });
};
