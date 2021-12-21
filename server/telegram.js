const Telegraf = require("telegraf");
const bot = new Telegraf("5081840301:AAEk17sOGoPEQ24wNCh5pQ7-YSRcY1Usyss");
bot.start((context) => {
  console.log("Servizio avviato...");
  context.reply("Servizio ECHO avviato");
});
bot.on("text", (context) => {
  text = context.update.message.text;
  context.reply("Hai scritto: " + text);
});
bot.launch();
