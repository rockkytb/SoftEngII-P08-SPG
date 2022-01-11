"use strict";
const TOKEN = "5081840301:AAEk17sOGoPEQ24wNCh5pQ7-YSRcY1Usyss";
const sqlite = require("sqlite3");

const { Telegraf, Telegram } = require("telegraf");

//Set to true to enable testdatabase
const testmode = false;

// open the database for sendMessage method
const db = new sqlite.Database(
  testmode ? "./testdatabase.db" : "./database.db",
  (err) => {
    if (err) throw err;
  }
);

exports.SendMessage = (clientId, msg) => {
  const bot = new Telegram(TOKEN);
  return new Promise((resolve, reject) => {
    const sql = "SELECT CHATID FROM TELEGRAM WHERE CLIENT_ID = ?";
    db.get(sql, [clientId], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        bot.sendMessage(row.CHATID, msg);
        resolve(true);
      }
    });
  });
};


