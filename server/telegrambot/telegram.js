// username bot @spgpolitobot
//5081840301:AAEk17sOGoPEQ24wNCh5pQ7-YSRcY1Usyss

const Telegraf = require("telegraf");
const TOKEN = "5081840301:AAEk17sOGoPEQ24wNCh5pQ7-YSRcY1Usyss";
const SERVER_URL = "https://c1d9-95-251-143-39.ngrok.io";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

const bot = new Telegraf(TOKEN);

const Dao = require("./DaoBot.js");

bot.command("quit", async (ctx) => {
  try{
    await Dao.logout(ctx.message.chat.id);
    ctx.reply("Logout successful. Type /start to restart bot");
  }
  catch (err){
    console.log(err);
  }
  
});

bot.start(async (ctx) => {
  const username = ctx.message.from.username ? (ctx.message.from.username):(ctx.message.chat.first_name);
  /*We use the function getUser to check if chatid is associated to client
  If yes, user is auto logged*/
  const user = await Dao.getUser(ctx.message.chat.id);
  if(user){
    ctx.reply(
      `Welcome back ${user.name} ${user.surname}\n\nCommand list:\n\n/balance to get your current balance\n/quit to logout`
    );
  }  
  else{
  await Dao.SaveChatId(ctx.message.chat.id, username);
  console.log(ctx.message.chat.id);
  ctx.reply(
    `Hi ${username}, to login please send a message with your credentials in this format email:password`
  );
}
});

bot.command("balance", (ctx) => {
  Dao.getWalletBalance(ctx.message.chat.id)
    .then((wallet) => {
      if (!wallet) {
        ctx.reply(
          `Please before send your credentials in this format email:password`
        );
      } else {
        ctx.reply(`Your current balance is ${wallet.amount} €`);
      }
    })
    .catch((err) => ctx.reply(`${err}`));
});

bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

bot.on("text", async (ctx) => {
  console.log(ctx.message.text);
  const username = ctx.message.from.username ? (ctx.message.from.username):(ctx.message.chat.first_name);
  if (ctx.message.text.includes(":")) {
    var email = ctx.message.text.split(":")[0];
    var pasw = ctx.message.text.split(":")[1];
    Dao.UpdateCredentials(
      ctx.message.chat.id,
      username,
      email,
      pasw
    )
      .then((res) => {
        if (res === false) {
          ctx.reply(`Oh, seems there is a problem retry later`);
        } else {
          ctx.reply(`Login successfull!\n\nCommand list:\n\n/balance to get your current balance\n/quit to logout`);
        }
      })
      .catch(() => {
        ctx.reply(`Oh, seems there is a problem retry later`);
      });
  } else {
    ctx.reply(`The Command is worng please use the format email:password`);
  }
});
