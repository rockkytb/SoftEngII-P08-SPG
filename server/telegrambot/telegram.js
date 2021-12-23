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

bot.start((ctx) => {
  // await Dao.InsertChatId(ctx.message.chat.id, ctx.message.from.username);
  console.log(ctx.message.chat.id);
  ctx.reply(`Dear ${ctx.message.from.username} Welcome`);
  ctx.reply(`Please send your number`);
});

bot.command("wallet", (ctx) => {
  ctx.reply(`Please send your number`);
});

bot.command("notifications", (ctx) => {
  ctx.reply(`you can see your wallet`);
});

bot.launch();
// Enable graceful stop
//process.once("SIGINT", () => bot.stop("SIGINT"));
//process.once("SIGTERM", () => bot.stop("SIGTERM"));
/*
bot.on("text", async (ctx) => {
  console.log(ctx.message.text);
  if (ctx.message.text.length == 10) {
    var x = await Dao.updateNumber(ctx.message.text, ctx.message.chat.id);
    ctx.reply(
      `Your Number is Saved, For Change it you can send phone number again in the chat`
    );
    ctx.replyWithHTML(
      `Now You can change or send your password,attention: send your password with this template For Example:`
    );
    ctx.reply(`my password: mnbvcxz`);
    return;
  }

  if (ctx.message.text.split(":")[0] === "my password") {
    return;
  }
  ctx.reply(`The Command is worng Please Use From Command To Help You`);
});*/
