"use strict";
const TOKEN = "5081840301:AAEk17sOGoPEQ24wNCh5pQ7-YSRcY1Usyss";
const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");

const { Telegraf, Telegram } = require("telegraf");

//Set to true to enable testdatabase
const testmode = true;

// open the database
const db = new sqlite.Database(
  testmode ? "testdatabase.db" : "database.db",
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
      }
    });
  });
};

//check password and email, if correct update the telegram table with the client id
exports.UpdateCredentials = (chatId, username, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CLIENT WHERE EMAIL = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        bcrypt.compare(password, row.PASSWORD).then((result) => {
          if (result) {
            const sql2 =
              "UPDATE TELEGRAM SET CLIENT_ID=? WHERE CHATID=? AND USERNAME=?";
            db.run(sql2, [row.ID, chatId, username], function (err1) {
              if (err1) {
                reject(err1);
                return;
              }
              resolve("OK");
            });
          } else {
            resolve(false);
          }
        });
      }
    });
  });
};

//check if the chatid has a client id int the table telegram then if all correct retrieve the balance
exports.getWalletBalance = (chatid) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT CLIENTID  FROM TELEGRAM Where CHATID=?";
    db.get(sql, [chatid], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == null) {
        resolve(false);
      } else {
        if (row.CLIENTID == -1) {
          resolve(false);
        } else {
          const sql2 = "SELECT AMOUNT  FROM CLIENT_WALLET Where ID_CLIENT=?";
          db.get(sql2, [row.CLIENTID], function (err1, row1) {
            if (err1) {
              reject(err1);
              return;
            }
            const result = { amount: row1.AMOUNT };
            resolve(result);
          });
        }
      }
    });
  });
};

exports.SaveChatId = (chatId, userName) => {
  // const bot = new Telegram(TOKEN);
  return new Promise((resolve, reject) => {
    // bot.sendMessage(chatId, "test riuscito");
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
