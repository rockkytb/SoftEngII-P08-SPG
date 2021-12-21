// username bot @spgpolitobot
const Telegraf = require("telegraf");
const bot = new Telegraf("");
bot.start((context) => {
  console.log("Servizio avviato...");
  context.reply("Servizio ECHO avviato");
});
bot.on("text", (context) => {
  text = context.update.message.text;
  context.reply("Hai scritto: " + text);
});
bot.launch();
