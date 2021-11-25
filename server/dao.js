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
        }
        resolve(true);
      }
    );
  });
};

// edit qty of a product_week
exports.editQtyProductWeek = (product) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE PRODUCT_WEEK SET QTY = QTY - ? WHERE ID = ?";
    db.run(sql, [product.Dec_Qty, product.ID_Product], function (err, row) {
      if (err) {
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
  return new Promise((resolve, reject) => {
    const sql = "UPDATE BOOKING SET STATE = ? WHERE ID_BOOKING = ?";
    db.run(sql, [booking.state, booking.id], function (err) {
      if (err) {
        reject(err);
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
        const amount = { balance: row.AMOUNT }
        resolve(amount);
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


//get all products
exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT f.email,p.ID,p.NAME,p.PRICE,p.QTY,c.name as categoryName FROM product_week p join farmer f on f.ID=p.FARMER_ID join category c on c.ID=p.CATEGORY_ID";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const products = rows.map((e) => ({
        id: e.ID,
        name: e.NAME,
        category: e.categoryName,
        price: e.PRICE,
        qty: e.QTY,
        farmer_email: e.EMAIL
      }));
      resolve(products);
    });
  });
};

//get all bookings
exports.getAllBookings = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT b.ID_BOOKING, b.STATE,c.EMAIL,c.NAME,c.SURNAME,bp.QTY,p.NAME as productName FROM BOOKING b join CLIENT c on b.CLIENT_ID=c.ID join BOOKING_PRODUCTS bp on b.ID_BOOKING=bp.ID_BOOKING join PRODUCT_WEEK p on p.ID=bp.ID_PRODUCT";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const bookings = rows.map((e) => ({
        id: e.ID_BOOKING,
        state: e.STATE,
        email: e.EMAIL,
        name: e.NAME,
        surname: e.SURNAME,
        qty: e.QTY,
        product: e.productName,

      }));
      resolve(bookings);
    });
  });
};

// Edit the wallet balance for a certain client
exports.updateWallet = (wallet) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE CLIENT_WALLET SET AMOUNT=?  WHERE ID_CLIENT=?";
    db.run(
      sql, [wallet.amount, wallet.id],
      function (err) {
        if (err) {
          reject(err.message);
          return;
        }
        if(wallet.id === undefined){
          reject({err:"CLIENT ID NOT PROVIDED"});
          return;
        }
        if (this.changes === 0) {
          reject({err:"CLIENT NOT FOUND"});
          return;
        }
        else
          resolve(wallet);

      }

    );
  });
};

// Create a new wallet
exports.createWallet = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO CLIENT_WALLET(ID_CLIENT,AMOUNT ) VALUES(?, ?)';
    db.run(sql, [id, 0.00], function (err) {
      if (err) {
        reject(false);
        return;
      }
      resolve(true);
    });
  });
};

// Get all bookings with PendingCancelation state
exports.getBookingsStatePendingCancelation = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT b.ID_BOOKING, b.STATE, c.EMAIL, c.NAME as nameClient, c.SURNAME, bp.QTY, pw.NAME as nameProduct FROM BOOKING b join CLIENT c on c.ID=b.CLIENT_ID join BOOKING_PRODUCTS bp on b.ID_BOOKING=bp.ID_BOOKING join PRODUCT_WEEK pw on bp.ID_PRODUCT=pw.ID WHERE STATE = 'PENDINGCANCELATION'";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      const bookings = rows.map((e) => ({
        id: e.ID_BOOKING,
        state: e.STATE,
        email: e.EMAIL,
        name: e.nameClient,
        surname: e.SURNAME,
        qty: e.QTY,
        product: e.nameProduct
      }));

      resolve(bookings);
    });
  });
};

//USED ONLY FOR TESTS TO CLEAN DB
exports.cleanDb = async () => {

  const errTest = (err) =>{
    if (err) {
      throw err;
    }
  }
  if (testmode) {
    //Clean the db

    await db.run("DELETE FROM BOOKING_PRODUCTS WHERE ID_BOOKING != ?",[1], (err) => {
      errTest(err);
    });

    await db.run("DELETE FROM BOOKING WHERE ID_BOOKING != ?",[1], (err) => {
      errTest(err);
    });


    await db.run("DELETE FROM CLIENT_WALLET WHERE ID_CLIENT != ?", [1], (err) => {
      errTest(err);
    });

    await db.run("DELETE FROM CLIENT WHERE ID != ?", [1], (err) => {
      errTest(err);
    });

    await db.run(
      "UPDATE sqlite_sequence SET seq = ? WHERE name = ? OR name = ?",
      [1, "CLIENT","BOOKING"],
      (err) => {
        errTest(err);
      }
    );
  }
};

