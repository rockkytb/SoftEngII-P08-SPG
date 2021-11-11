"use strict";
/* Data Access Object (DAO) module for accessing tasks */

const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");

//Set to true to enable testdatabase
const testmode = false;

// open the database
const db = new sqlite.Database(
  testmode ? "testdatabase.db" : "database.db",
  (err) => {
    if (err) throw err;
  }
);

//get Clients
exports.getClients = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CLIENT";
    db.get_all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows === undefined) {
        resolve(false);
      } else {
        resolve(
          rows.map((x) => {
            return {
              id: `C${x.ID}`,
              username: x.EMAIL,
              name: x.NAME,
              surname: x.SURNAME,
            };
          })
        );
      }
    });
  });
};

//get Client
exports.getClient = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CLIENT WHERE EMAIL = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = {
          id: `C${row.ID}`,
          username: row.EMAIL,
          name: row.NAME,
          surname: row.SURNAME,
        };

        bcrypt.compare(password, row.PASSWORD).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

//get Client by Id
exports.getClientById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CLIENT WHERE ID = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: `C${row.ID}`, username: row.EMAIL };
        resolve(user);
      }
    });
  });
};

//get Client by Email
exports.getClientByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CLIENT WHERE EMAIL = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        const user = { id: -1 };
        resolve(user);
      } else {
        const user = { id: `C${row.ID}` };
        resolve(user);
      }
    });
  });
};

//get Farmer
exports.getFarmer = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM FARMER WHERE EMAIL = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: `F${row.ID}`, username: row.EMAIL };

        bcrypt.compare(password, row.PASSWORD).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

//get Shop Employee
exports.getShopEmployee = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM SHOP_EMPLOYEE WHERE EMAIL = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: `S${row.ID}`, username: row.EMAIL };

        bcrypt.compare(password, row.PASSWORD).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
      }
    });
  });
};

//get Farmer by Id
exports.getFarmerById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM FARMER WHERE ID = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: `F${row.ID}`, username: row.EMAIL };
        resolve(user);
      }
    });
  });
};

//get ShopEmployee by Id
exports.getShopEmployeeById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM SHOP_EMPLOYEE WHERE ID = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: `S${row.ID}`, username: row.EMAIL };
        resolve(user);
      }
    });
  });
};

// add a new booking
exports.createBooking = (booking) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO BOOKING (CLIENT_ID, STATE) VALUES(?, ?)";
    db.run(sql, [booking.idClient, booking.state], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

// add a new client
exports.createClient = (client) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO CLIENT (EMAIL, NAME, SURNAME, PASSWORD) VALUES(?, ?, ?, ?)";
    db.run(
      sql,
      [client.email, client.name, client.surname, client.password],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

//get all products
exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT f.email,p.ID,p.NAME,p.PRICE,p.QTY,c.name as categoryName FROM product_week p join farmer f on f.ID=p.FARMER_ID join category c on c.ID=p.CATEGORY_ID";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(rows)
      const products = rows.map((e) => ({
        id: e.ID,
        name: e.NAME,
        category:e.categoryName,
        price: e.PRICE,
        qty:e.QTY,
        farmer_email:e.EMAIL
      }));
      resolve(products);
    });
  });
};
