"use strict";
const TOKEN = "5081840301:AAEk17sOGoPEQ24wNCh5pQ7-YSRcY1Usyss";
const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");

const { Telegraf, Telegram } = require("telegraf");

//Set to true to enable testdatabase
const testmode = true;

// open the database for bot methods
const db = new sqlite.Database(
  testmode ? "../testdatabase.db" : "../database.db",
  (err) => {
    if (err) throw err;
  }
);

// open the database for sendMessage method
const db2 = new sqlite.Database(
  testmode ? "./testdatabase.db" : "./database.db",
  (err) => {
    if (err) throw err;
  }
);

exports.SendMessage = (clientId, msg) => {
  const bot = new Telegram(TOKEN);
  return new Promise((resolve, reject) => {
    const sql = "SELECT CHATID FROM TELEGRAM WHERE CLIENT_ID = ?";
    db2.get(sql, [clientId], (err, row) => {
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
            const clientId=row.ID;
            const sql2 = "UPDATE TELEGRAM SET CLIENT_ID = ? WHERE CLIENT_ID=?";
            const sql3 =
              "UPDATE TELEGRAM SET CLIENT_ID=? WHERE CHATID=? AND USERNAME=?";
            db.run(sql2, [-1, clientId], function (err1) {
              if (err1) {
                reject(err1);
              } else {
                db.run(sql3, [clientId, chatId, username], function (err2) {
                  if (err2) {
                    reject(err2);
                  } else {
                    resolve("OK");
                  }
                });
              }
            });
          } else {
            resolve(false);
          }
        });
      }
    });
  });
};

exports.logout = (chatid) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE TELEGRAM SET CLIENT_ID=? WHERE CHATID=?";
    db.run(sql, [-1, chatid], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

exports.getUser = (chatid) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT CLIENT_ID  FROM TELEGRAM Where CHATID=?";
    db.get(sql, [chatid], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == null) {
        resolve(false);
      } else {
        if (row.CLIENT_ID == -1) {
          resolve(false);
        } else {
          const sql2 = "SELECT NAME,SURNAME FROM CLIENT Where ID=?";
          db.get(sql2, [row.CLIENT_ID], function (err1, row1) {
            if (err1) {
              reject(err1);
              return;
            }
            const result = { name: row1.NAME, surname: row1.SURNAME };
            resolve(result);
          });
        }
      }
    });
  });
};

//check if the chatid has a client id int the table telegram then if all correct retrieve the balance
exports.getWalletBalance = (chatid) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT CLIENT_ID  FROM TELEGRAM Where CHATID=?";
    db.get(sql, [chatid], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == null) {
        resolve(false);
      } else {
        if (row.CLIENT_ID == -1) {
          resolve(false);
        } else {
          const sql2 = "SELECT AMOUNT  FROM CLIENT_WALLET Where ID_CLIENT=?";
          db.get(sql2, [row.CLIENT_ID], function (err1, row1) {
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
