// username bot @spgpolitobot
//5081840301:AAEk17sOGoPEQ24wNCh5pQ7-YSRcY1Usyss

const Telegraf = require("telegraf");
const TOKEN = "5081840301:AAEk17sOGoPEQ24wNCh5pQ7-YSRcY1Usyss";
const SERVER_URL = "https://c1d9-95-251-143-39.ngrok.io";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

const bot = new Telegraf(TOKEN);

const Dao = require("./DaoBot.js");
const axios = require("axios");

//bot.telegram.setWebhook(SERVER_URL);

bot.command("quit", (ctx) => {
  ctx.telegram.leaveChat(ctx.message.chat.id);
  ctx.leaveChat();
});

bot.start(async (ctx) => {
  await Dao.SaveChatId(ctx.message.chat.id, ctx.message.from.username);
  console.log(ctx.message.chat.id);
  ctx.reply(
    `Hi ${ctx.message.from.username}, please send your credentials in this format email:password`
  );
});

bot.command("balance", (ctx) => {
  Dao.getWalletBalance(ctx.message.chat.id)
    .then((wallet) => {
      ctx.reply(`This is your balance:${wallet}`);
    })
    .catch((err) => ctx.reply(`${err}`));
});

bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

bot.on("text", async (ctx) => {
  console.log(ctx.message.text);

  if (ctx.message.text.includes(":")) {
    email = ctx.message.text.split(":")[0];
    pasw = ctx.message.text.split(":")[1];
    await UpdateCredentials(
      ctx.ctx.message.chat.id,
      ctx.message.from.username,
      email,
      pasw
    );
    return;
  } else {
    ctx.reply(`The Command is worng please use the format email:password`);
  }
});
