"use strict";
/* Data Access Object (DAO) module for accessing tasks */

const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");

//Set to true to enable testdatabase
const testmode = true;

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
    db.all(sql, [], (err, rows) => {
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

// add a new bookingProduct
exports.createBookingProduct = (bookingProduct) => {
  console.log(bookingProduct);
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO BOOKING_PRODUCTS (ID_BOOKING, ID_PRODUCT, QTY) VALUES(?, ?, ?)";
    db.run(
      sql,
      [
        bookingProduct.ID_Booking,
        bookingProduct.ID_Product,
        bookingProduct.Qty,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      }
    );
  });
};

// edit qty of a product_week
exports.editQtyProductWeek = (product) => {
  return new Promise((resolve, reject) =>{
    const sql = "UPDATE PRODUCT_WEEK SET QTY = ? WHERE ID = ?";
    db.run(sql, [product.New_Qty,product.ID_Product], function (err, row) {
      if(err){
        reject(err);
        return;
      }
     else if (row === undefined) {
      resolve(false);
     }
     else {
       resolve(true);
     }
    });
  });
};

// edit state of a booking
exports.editStateBooking = (booking) => {
  return new Promise((resolve, reject) =>{
    const sql = "UPDATE BOOKING SET STATE = ? WHERE ID_BOOKING = ?";
    db.run(sql, [booking.New_State,booking.ID_Booking], function (err) {
      if(err){
        reject(err);
        return;
      }
     else {
       resolve(true);
     }
    });
  });
};
// get a booking
exports.getBooking = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM BOOKING WHERE ID = ?";
    db.get(sql, [id], function (err, row) {
      if (err) {
        reject(err);
        return;
      } else if (row === undefined) {
        resolve(false);
      } else {
        const booking = { id: row.ID_BOOKING };
        resolve(booking);
      }
    });
  });
};

// get a wallet
exports.getWallet = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CLIENT_WALLET WHERE ID_CLIENT = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        resolve(row.AMOUNT);
      }
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

//USED ONLY FOR TESTS TO CLEAN DB
exports.cleanDb = async () => {
  if (testmode) {
    //Clean the db

    await db.run("DELETE FROM BOOKING", (err) => {
      if (err) {
        throw err;
      }
    });

    await db.run(
      "UPDATE sqlite_sequence SET seq = ? WHERE name = ?",
      [0, "BOOKING"],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

    await db.run("DELETE FROM CLIENT WHERE ID != ?", [1], (err) => {
      if (err) {
        throw err;
      }
    });

    await db.run(
      "UPDATE sqlite_sequence SET seq = ? WHERE name = ?",
      [1, "CLIENT"],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }
};
