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

//get Categories
exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM CATEGORY";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows === undefined) {
        resolve(false);
      } else {
        resolve(
          rows.map((x) => {
            return {
              id: `${x.ID}`,
              name: x.NAME,
              measure: x.MEASURE,
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

//get warehouse worker
exports.getWarehouseWorker = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM WAREHOUSE_WORKER WHERE EMAIL = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: `W${row.ID}`, username: row.EMAIL };

        bcrypt.compare(password, row.PASSWORD).then((result) => {
          if (result) resolve(user);
          else resolve(false);
        });
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

//get Manager
exports.getManager = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM MANAGER WHERE EMAIL = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = {
          id: `M${row.ID}`,
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

//get Manager by Id
exports.getManagerById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM MANAGER WHERE ID = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: `M${row.ID}`, username: row.EMAIL };
        resolve(user);
      }
    });
  });
};

//get Warehouse worker by Id
exports.getWarehouseWorkerById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM WAREHOUSE_WORKER WHERE ID = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: `W${row.ID}`, username: row.EMAIL };
        resolve(user);
      }
    });
  });
};

// add a new acknowledge
exports.createAcknowledge = (ack) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO MANAGER_ACKNOWLEDGE (FARMER_ID,FARMER, STATUS) VALUES(?, ?, ?)";
    db.run(sql, [ack.idFarmer, ack.email, ack.state], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
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
      } else if (row === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// Increment the quantity of a product
exports.IncrementQtyProductWeek = (product) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE PRODUCT_WEEK SET QTY = QTY + ? WHERE ID = ?";
    db.run(sql, [product.Inc_Qty, product.ID_Product], function (err, row) {
      if (err) {
        reject(err);
        return;
      } else if (row === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// edit state of a product_week
exports.editStateProductWeek = (product) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE PRODUCT_WEEK SET STATE = ? WHERE ID = ?";
    db.run(sql, [product.state, product.id], function (err) {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(true);
      }
    });
  });
};

// INSERT into Product_WEEK by receiving a product confirmed by farmer with state = CONFIRMED
exports.insertTupleProductWEEK = (product) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO PRODUCT_WEEK (NAME, CATEGORY_ID, PRICE, QTY, FARMER_ID, STATE) VALUES(?, ?, ?, ?, ?, ?)";
    db.run(
      sql,
      [
        product.name,
        product.category_id,
        product.price,
        product.qty,
        product.farmer_id,
        product.state,
      ],
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

// edit state of a booking
exports.editStateBooking = (booking) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE BOOKING SET STATE = ? WHERE ID_BOOKING = ?";
    db.run(sql, [booking.state, booking.id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// edit state of an ack
exports.editStateAck = (ack) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE MANAGER_ACKNOWLEDGE SET STATUS = ? WHERE ID = ?";
    db.run(sql, [ack.state, ack.id], function (err) {
      if (err) {
        reject(err);
      } else {
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
        const amount = { balance: row.AMOUNT };
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
    const sql =
      "SELECT f.email,p.ID,p.NAME,p.PRICE,p.QTY,c.name as categoryName FROM product_week p join farmer f on f.ID=p.FARMER_ID join category c on c.ID=p.CATEGORY_ID WHERE p.STATE ='EXPECTED'";
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
        farmer_email: e.EMAIL,
      }));
      resolve(products);
    });
  });
};

// get products from PRODUCT_WEEK with EXPECTED STATE according to the id of a farmer
exports.getAllProductsExpectedForFarmer = (idFarmer) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT f.email,p.ID,p.NAME,p.PRICE,p.QTY,p.STATE,c.name as categoryName FROM PRODUCT_WEEK p join farmer f on f.ID=p.FARMER_ID join category c on c.ID=p.CATEGORY_ID WHERE p.FARMER_ID=? AND p.STATE=?";

    db.all(sql, [idFarmer, "EXPECTED"], (err, rows) => {
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
        farmer_email: e.EMAIL,
        state: e.STATE,
      }));
      resolve(products);
    });
  });
};

//get all products in state = CONFIRMED of a particular farmer from PRODUCT_WEEK table
exports.getAllProductsForFarmer = (farmerId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT f.email,p.ID,p.NAME,p.PRICE,p.QTY,c.name as categoryName FROM product_week p join farmer f on f.ID=p.FARMER_ID join category c on c.ID=p.CATEGORY_ID where p.FARMER_ID=?";
    db.all(sql, [farmerId], (err, rows) => {
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
        farmer_email: e.EMAIL,
      }));
      resolve(products);
    });
  });
};

//get all bookings
exports.getAllBookings = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT b.ID_BOOKING, b.STATE,c.EMAIL,c.NAME,c.SURNAME,bp.QTY,p.NAME as productName,p.ID as productID FROM BOOKING b join CLIENT c on b.CLIENT_ID=c.ID join BOOKING_PRODUCTS bp on b.ID_BOOKING=bp.ID_BOOKING join PRODUCT_WEEK p on p.ID=bp.ID_PRODUCT";
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
        productID: e.productID
      }));
      resolve(bookings);
    });
  });
};

//get all bookings for a particular client
exports.getAllBookingsForClient = (clientId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT b.ID_BOOKING, b.STATE,c.EMAIL,c.NAME,c.SURNAME,bp.QTY,p.NAME as productName FROM BOOKING b join CLIENT c on b.CLIENT_ID=c.ID join BOOKING_PRODUCTS bp on b.ID_BOOKING=bp.ID_BOOKING join PRODUCT_WEEK p on p.ID=bp.ID_PRODUCT where b.CLIENT_ID=?";
    db.all(sql, [clientId], (err, rows) => {
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
    db.run(sql, [wallet.amount, wallet.id], function (err) {
      if (err) {
        reject(err.message);
        return;
      }
      if (wallet.id === undefined) {
        reject({ err: "CLIENT ID NOT PROVIDED" });
        return;
      }
      if (this.changes === 0) {
        reject({ err: "CLIENT NOT FOUND" });
        return;
      } else resolve(wallet);
    });
  });
};

// Create a new wallet
exports.createWallet = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO CLIENT_WALLET(ID_CLIENT,AMOUNT ) VALUES(?, ?)";
    db.run(sql, [id, 0.0], function (err) {
      if (err) {
        reject(false);
        return;
      }
      resolve(true);
    });
  });
};

// Get all ACK with new state
exports.getAcksStateNew = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT ID,FARMER_ID,FARMER,STATUS FROM MANAGER_ACKNOWLEDGE WHERE STATUS = 'NEW'";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const acks = rows.map((e) => ({
        id: e.ID,
        state: e.STATUS,
        farmer: e.FARMER,
        farmerId: e.FARMER_ID,
      }));

      resolve(acks);
    });
  });
};

// Get all bookings with PendingCancelation state
exports.getBookingsStatePendingCancelation = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT b.ID_BOOKING, b.STATE, c.EMAIL, c.NAME as nameClient, c.SURNAME, bp.QTY, pw.NAME as nameProduct FROM BOOKING b join CLIENT c on c.ID=b.CLIENT_ID join BOOKING_PRODUCTS bp on b.ID_BOOKING=bp.ID_BOOKING join PRODUCT_WEEK pw on bp.ID_PRODUCT=pw.ID WHERE b.STATE = 'PENDINGCANCELATION'";
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
        product: e.nameProduct,
      }));

      resolve(bookings);
    });
  });
};

// INSERT a new tuple into PRODUCT_EXPECTED
exports.insertTupleProductExpected = (pdtExp) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO PRODUCT_EXPECTED (NAME, CATEGORY_ID, PRICE, QTY, FARMER_ID) VALUES (?,?,?,?,?)";
    db.run(
      sql,
      [
        pdtExp.name,
        pdtExp.category,
        pdtExp.price,
        pdtExp.qty,
        pdtExp.farmer_id,
      ],
      function (err) {
        if (err) {
          reject(false);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

//GET /api/clientsPreparation

exports.getClientsPreparation = (productId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT DISTINCT(C.ID), C.EMAIL, C.NAME, C.SURNAME FROM BOOKING_PRODUCTS BP, BOOKING B, CLIENT C WHERE ID_PRODUCT=? AND BP.ID_BOOKING=B.ID_BOOKING AND B.CLIENT_ID=C.ID";
    db.all(sql, [productId], (err, rows) => {
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

// Create a new booking mode
exports.createBookingMode = (bookingMode) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO BOOKING_MODE (id_booking ,delivery, street, city, province, postal_code, country, date, time, extra_fee) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.run(
      sql,
      [
        bookingMode.idBooking,
        bookingMode.delivery,
        bookingMode.street,
        bookingMode.city,
        bookingMode.province,
        bookingMode.postal_code,
        bookingMode.country,
        bookingMode.date,
        bookingMode.time,
        bookingMode.extra_fee,
      ],
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
  const errTest = (err) => {
    if (err) {
      throw err;
    }
  };
  if (testmode) {
    //Clean the db

    await db.run(
      "DELETE FROM BOOKING_PRODUCTS WHERE ID_BOOKING != ?",
      [1],
      (err) => {
        errTest(err);
      }
    );

    await db.run("DELETE FROM BOOKING WHERE ID_BOOKING != ?", [1], (err) => {
      errTest(err);
    });
    await db.run("DELETE FROM BOOKING_MODE ", (err) => {
      errTest(err);
    });

    await db.run(
      "DELETE FROM CLIENT_WALLET WHERE ID_CLIENT != ?",
      [1],
      (err) => {
        errTest(err);
      }
    );

    await db.run("DELETE FROM PRODUCT_WEEK WHERE ID >= ?", [3], (err) => {
      errTest(err);
    });

    await db.run(
      "DELETE FROM PRODUCT_WEEK WHERE ID != ? AND STATE!=?",
      [1, "CONFIRMED"],
      (err) => {
        errTest(err);
      }
    );

    await db.run(
      "DELETE FROM MANAGER_ACKNOWLEDGE WHERE ID != ?",
      [1],
      (err) => {
        errTest(err);
      }
    );

    await db.run("DELETE FROM CLIENT WHERE ID != ?", [1], (err) => {
      errTest(err);
    });

    await db.run(
      "UPDATE sqlite_sequence SET seq = ? WHERE name = ? OR name = ? OR name = ?",
      [1, "CLIENT", "BOOKING", "MANAGER_ACKNOWLEDGE"],
      (err) => {
        errTest(err);
      }
    );
  }
};

//SHORT-TERM:
exports.getTotal = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT b.ID_BOOKING, b.CLIENT_ID, SUM(p.PRICE * bp.QTY) AS TOTAL\
      FROM BOOKING b, BOOKING_PRODUCTS bp, PRODUCT_WEEK p \
      WHERE b.ID_BOOKING = bp.ID_BOOKING AND bp.ID_PRODUCT = p.ID AND p.STATE='CONFIRMED'\
      GROUP BY b.ID_BOOKING, b.CLIENT_ID";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const bookings = rows.map((e) => ({
        id: e.ID_BOOKING,
        client: e.CLIENT_ID,
        total: e.TOTAL,
      }));

      resolve(bookings);
    });
  });
};
