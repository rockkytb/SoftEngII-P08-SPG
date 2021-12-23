"use strict";
const TOKEN = "5081840301:AAEk17sOGoPEQ24wNCh5pQ7-YSRcY1Usyss";
const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");

const { Telegraf, Telegram } = require("telegraf");

//Set to true to enable testdatabase
const testmode = true;

// open the database
const db = new sqlite.Database("testdatabase.db", (err) => {
  if (err) throw err;
});
//check password and email, if correct update the telegram table with the client id
exports.UpdateCredentials = (chatId, username, email, password) => {
  return new Promise((resolve, reject) => {});
};

//check if the chatid has a client id int the table telegram then if all correct retrieve the balance
exports.getWalletBalance = (chatid) => {
  return new Promise((resolve, reject) => {});
};

exports.SaveChatId = (chatId, userName) => {
  const bot = new Telegram(TOKEN);
  return new Promise((resolve, reject) => {
    bot.sendMessage(chatId, "test riuscito");
    let id = -1;
    const id_sql = "SELECT CHATID  FROM TELEGRAM Where CHATID=?";
    db.get(id_sql, [chatId], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == null) {
        const sql =
          "INSERT INTO TELEGRAM (CHATID,USERNAME,CLIENT_ID) VALUES(?,?,?)";
        db.run(sql, [chatId, userName, -1], function (err1) {
          if (err1) {
            reject(err1);
            return;
          }
          resolve("OK");
        });
        resolve("OK");
      }
      resolve("OK");
    });
  });
};
