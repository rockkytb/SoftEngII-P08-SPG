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
              phone: x.PHONE
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
          phone: row.PHONE
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
        resolve(-1);
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

//get Warehouse Manager
exports.getWarehouseManager = (email, password) => {
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

//get Warehouse Manager by Id
exports.getWarehouseManagerById = (id) => {
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

//get Manager
exports.getManager = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM ADMIN WHERE EMAIL = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = {
          id: `A${row.ID}`,
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
    const sql = "SELECT * FROM ADMIN WHERE ID = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: `A${row.ID}`, username: row.EMAIL };
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
        resolve(this.lastID);
      }
    );
  });
};

// add a new bookingProduct
exports.updateBookingProduct = (bookingProduct) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE BOOKING_PRODUCTS SET QTY = ? WHERE ID_BOOKING = ? AND ID_PRODUCT = ?";
    db.run(
      sql,
      [
        bookingProduct.Qty,
        bookingProduct.ID_Booking,
        bookingProduct.ID_Product,
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
exports.IncrementQtyProductWeek = (Inc_Qty, ID_Product) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE PRODUCT_WEEK SET QTY = QTY + ? WHERE ID = ?";
    db.run(sql, [Inc_Qty, ID_Product], function (err) {
      if (err) {
        reject(err);
      } else {
        let updatedProduct = getProduct(ID_Product);
        resolve(updatedProduct);
      }
    });
  });
};

// retrieve a product with a given id
function getProduct(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from PRODUCT_WEEK WHERE ID = ?";
    db.get(sql, [id], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// edit state of a product_week
exports.editStateProductWeek = (product) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE PRODUCT_WEEK SET STATE = ? WHERE ID = ?";
    db.run(sql, [product.state, product.id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// delete a product from product_week
exports.deleteProduct = (productId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE from PRODUCT_WEEK WHERE ID = ?";
    db.run(sql, [productId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// delete a booking product from booking_product table!
exports.deleteBookingProduct = (productId, bookingId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "DELETE from BOOKING_PRODUCTS WHERE ID_BOOKING = ? and ID_PRODUCT=?";
    db.run(sql, [bookingId, productId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// INSERT into Product_WEEK by receiving a product confirmed by farmer with state = CONFIRMED
exports.insertTupleProductWEEK = (product) => {
  return new Promise((resolve, reject) => {
    const getUnity = "SELECT NAME FROM CATEGORY WHERE ID = ?";
    db.get(getUnity, [product.category_id], (err, row) => {
      if (err) reject(err);
      else {
        const sql =
          "INSERT INTO PRODUCT_WEEK (NAME, CATEGORY_ID, PRICE, QTY, FARMER_ID, STATE, SIZE, UNIT_OF_MEASURE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        db.run(
          sql,
          [
            product.name,
            product.category_id,
            product.price,
            product.qty,
            product.farmer_id,
            product.state,
            product.size,
            product.unit_of_measure,
          ],
          function (err) {
            if (err) {
              reject(err);
            }
            resolve(this.lastID);
          }
        );
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
      "INSERT INTO CLIENT (EMAIL, NAME, SURNAME, PASSWORD, PHONE) VALUES(?, ?, ?, ?, ?)";
    db.run(
      sql,
      [client.email, client.name, client.surname, client.password, client.phone],
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
      "SELECT p.SIZE, p.UNIT_OF_MEASURE, f.email,p.ID,p.NAME,p.PRICE,p.QTY,c.name as categoryName FROM product_week p join farmer f on f.ID=p.FARMER_ID join category c on c.ID=p.CATEGORY_ID WHERE p.STATE ='EXPECTED'";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      const products = rows.map((e) => ({
        id: e.ID,
        name: e.NAME,
        category: e.categoryName,
        price: e.PRICE,
        qty: e.QTY,
        size: e.SIZE,
        unit_of_measure: e.UNIT_OF_MEASURE,
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
      "SELECT p.SIZE, p.UNIT_OF_MEASURE, f.email,p.ID,p.NAME,p.PRICE,p.QTY,p.STATE,c.name as categoryName FROM PRODUCT_WEEK p join farmer f on f.ID=p.FARMER_ID join category c on c.ID=p.CATEGORY_ID WHERE p.FARMER_ID=? AND p.STATE=?";

    db.all(sql, [idFarmer, "EXPECTED"], (err, rows) => {
      if (err) {
        reject(err);
      }
      const products = rows.map((e) => ({
        id: e.ID,
        name: e.NAME,
        category: e.categoryName,
        price: e.PRICE,
        qty: e.QTY,
        size: e.SIZE,
        unit_of_measure: e.UNIT_OF_MEASURE,
        farmer_email: e.EMAIL,
        state: e.STATE,
      }));
      resolve(products);
    });
  });
};

//get all products in state = CONFIRMED of a particular farmer from PRODUCT_WEEK table
exports.getAllProductsConfirmedForFarmer = (farmerId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT p.SIZE, p.UNIT_OF_MEASURE, f.email,p.ID,p.NAME,p.PRICE,p.QTY,c.name as categoryName FROM product_week p join farmer f on f.ID=p.FARMER_ID join category c on c.ID=p.CATEGORY_ID where p.FARMER_ID=? and (p.STATE='CONFIRMED')";
    db.all(sql, [farmerId], (err, rows) => {
      if (err) {
        reject(err);
      }
      const products = rows.map((e) => ({
        id: e.ID,
        name: e.NAME,
        category: e.categoryName,
        price: e.PRICE,
        qty: e.QTY,
        size: e.SIZE,
        unit_of_measure: e.UNIT_OF_MEASURE,
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
      }
      const bookings = [];
      const prenotazioni = rows.map((e) => ({
        id: e.ID_BOOKING,
        state: e.STATE,
        email: e.EMAIL,
        name: e.NAME,
        surname: e.SURNAME,
        qty: e.QTY,
        product: e.productName,
        productID: e.productID,
      }));
      prenotazioni.forEach((p) => {
        if (bookings[p.id]) {
          bookings[p.id].products = [
            ...bookings[p.id].products,
            { productID: p.productID, product: p.product, qty: p.qty },
          ];
        } else {
          bookings[p.id] = {
            id: p.id,
            state: p.state,
            email: p.email,
            name: p.name,
            surname: p.surname,
            products: [
              {
                productID: p.productID,
                product: p.product,
                qty: p.qty,
              },
            ],
          };
        }
      });
      const list = bookings.filter((b) => b !== null);
      resolve(list);
    });
  });
  //veloce
};

// GET /api/bookingModesNew/pickup
exports.getbookingModesNewPickup = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT B.ID_BOOKING,B.CLIENT_ID,BM.DATE,BM.TIME,B.STATE AS STAT FROM BOOKING_MODE BM, BOOKING B WHERE B.ID_BOOKING=BM.ID_BOOKING AND BM.DELIVERY=?  AND BM.STATE=? AND B.STATE!=?";
    db.all(sql, [0, "NEW", "PENDINGCANCELATION"], (err, rows) => {
      if (err) {
        reject(err);
      }
      const bookings = rows.map((e) => ({
        idBooking: e.ID_BOOKING,
        idClient: e.CLIENT_ID,
        state: e.STAT,
        date: e.DATE,
        time: e.TIME,
      }));
      resolve(bookings);
    });
  });
};

//get  booking Modes Preparation
exports.getbookingModesPreparation = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT C.EMAIL,C.NAME,C.SURNAME,B.ID_BOOKING,B.CLIENT_ID,BM.DATE,BM.TIME,B.STATE AS STAT ,BP.QTY,P.NAME as productName,P.ID as productID FROM CLIENT C, BOOKING_MODE BM, BOOKING B, BOOKING_PRODUCTS BP, PRODUCT_WEEK P  WHERE C.ID=B.CLIENT_ID and P.ID=BP.ID_PRODUCT AND BP.ID_BOOKING=B.ID_BOOKING AND B.ID_BOOKING=BM.ID_BOOKING AND BM.DELIVERY=? AND BM.STATE=?";
    db.all(sql, [0, "PREPARATION"], (err, rows) => {
      if (err) {
        reject(err);
      }
      const bookings = [];
      const prenotazioni = rows.map((e) => ({
        id: e.ID_BOOKING,

        email: e.EMAIL,
        name: e.NAME,
        surname: e.SURNAME,
        qty: e.QTY,
        state: e.STAT,
        time: e.TIME,
        date: e.DATE,
        product: e.productName,
        productID: e.productID,
      }));
      prenotazioni.forEach((p) => {
        if (bookings[p.id]) {
          bookings[p.id].products = [
            ...bookings[p.id].products,
            { productID: p.productID, product: p.product, qty: p.qty },
          ];
        } else {
          bookings[p.id] = {
            id: p.id,
            state: p.state,
            email: p.email,
            name: p.name,
            time: p.time,
            date: p.date,
            surname: p.surname,
            products: [
              {
                productID: p.productID,
                product: p.product,
                qty: p.qty,
              },
            ],
          };
        }
      });
      const list = bookings.filter((b) => b !== null);
      resolve(list);
    });
  });
};

//get all bookings for a particular client
exports.getAllBookingsForClient = (clientId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT b.ID_BOOKING, b.STATE,c.EMAIL,c.NAME,c.SURNAME FROM BOOKING b join CLIENT c on b.CLIENT_ID=c.ID where b.CLIENT_ID=?";
    db.all(sql, [clientId], async (err, rows) => {
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
        products: []
      }));

      for (let booking of bookings)
        booking.products = await this.productsOfBooking(booking.id);

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
              surname: x.SURNAME
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
      "INSERT INTO BOOKING_MODE (id_booking ,delivery, street, city, province, postal_code, country, date, time, extra_fee, state) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
        "NEW",
      ],
      function (err) {
        if (err) {
          reject(err);
        }
        resolve(this.lastID);
      }
    );
  });
};

// edit state of a booking mode
exports.updateStateBookingMode = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE BOOKING_MODE SET STATE = ? WHERE ID_BOOKING = ?";
    db.run(sql, ["PREPARATION", id], function (error) {
      if (error) {
        reject(error.message);
        return;
      } else if (this.changes === 0) {
        reject({ error: "BOOKING MODE ID NOT FOUND" });
        return;
      } else {
        resolve(id);
      }
    });
  });
};

//get all the bookings of the client id that are in state booked

exports.getAllBookingsForClientBooked = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM BOOKING WHERE CLIENT_ID=? AND STATE='BOOKED'";
    db.all(sql, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows === undefined) {
        console.log("rows non è definito---------");
        resolve(false);
      } else {
        const bookings = rows.map((e) => ({
          id_booking: e.ID_BOOKING,
          id_client: e.CLIENT_ID,
          state: e.STATE,
        }));

        resolve(bookings);
      }
    });
  });
};

exports.productsOfBooking = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT p.ID, p.NAME, c.NAME as CATEGORY_NAME, p.PRICE, bp.QTY as QTY_BOOKING, f.EMAIL as FARMER_EMAIL, p.STATE FROM BOOKING_PRODUCTS bp join PRODUCT_WEEK p on bp.ID_PRODUCT=p.ID join CATEGORY c on p.CATEGORY_ID=c.ID join FARMER f on p.FARMER_ID=f.ID WHERE bp.ID_BOOKING=?";
    db.all(sql, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows === undefined) {
        console.log("rows non è definito---------");
        resolve(false);
      } else {
        const products = rows.map((e) => ({
          id_product: e.ID,
          product: e.NAME,
          category: e.CATEGORY_NAME,
          price: e.PRICE,
          qty: e.QTY_BOOKING,
          email: e.FARMER_EMAIL,
          state: e.STATE,
        }));

        resolve(products);
      }
    });
  });
};

exports.insertTupleBookingHistory = (booking) => {
  return new Promise((resolve, reject) => {
    const sql ="INSERT INTO BOOKING_HISTORY (ID_BOOKING, CLIENT_ID, STATE, START_DATE, END_DATE) VALUES (?, ?, ?, ?, ?)"
    db.run(sql, 
      [
        booking.ID_BOOKING, 
        booking.CLIENT_ID, 
        booking.STATE, 
        booking.START_DATE, 
        booking.END_DATE
      ], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};


exports.getBookingsUnretrieved = () => {
  return new Promise((resolve, reject) => {
    const sql ="SELECT bh.ID_BOOKING, bh.CLIENT_ID, ID_PRODUCT, NAME, bp.QTY FROM BOOKING_HISTORY bh JOIN BOOKING_PRODUCTS bp ON bh.ID_BOOKING=bp.ID_BOOKING JOIN PRODUCT_WEEK pw ON bp.ID_PRODUCT=pw.ID  WHERE bh.STATE='UNRETRIEVED'";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows === undefined) {
        console.log("rows non è definito---------");
        resolve(false);
      } else {
        const prenotazioni = rows.map((e) => ({
          idBooking: e.ID_BOOKING,
          idClient: e.CLIENT_ID,
          productID: e.ID_PRODUCT,
          name: e.NAME,
          qty: e.QTY
        }));

        const bookings=[];
        prenotazioni.forEach((p) => {
          if (bookings[p.idBooking]) {
            bookings[p.idBooking].products = [
              ...bookings[p.idBooking].products,
              { productID: p.productID, product: p.name, qty: p.qty },
            ];
          } else {
            bookings[p.idBooking] = {
              idBooking: p.idBooking,
              idClient: p.idClient,
              products: [
                {
                  productID: p.productID,
                  product: p.name,
                  qty: p.qty,
                },
              ],
            };
          }
        });
        const list = bookings.filter((b) => b !== null);
        resolve(list);
      }
    });
  });
};

exports.deleteBooking = (bookingId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "DELETE from BOOKING WHERE ID_BOOKING = ?";
    db.run(sql, [bookingId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
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

    await db.run("DELETE FROM BOOKING WHERE ID_BOOKING > ?", [2], (err) => {
      errTest(err);
    });
    await db.run("DELETE FROM BOOKING_MODE WHERE ID_BOOKING>? ", [2], (err) => {
      errTest(err);
    });
    await db.run(
      'UPDATE  BOOKING_MODE SET STATE="NEW" WHERE ID_BOOKING=? ',
      [2],
      (err) => {
        errTest(err);
      }
    );
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
      "UPDATE  PRODUCT_WEEK SET QTY=? WHERE ID = ?",
      [10, 1],
      (err) => {
        errTest(err);
      }
    );

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

//VIRTUAL CLOCK DAO FUNCTIONS

//Get total of bookings in state BOOKED
exports.getTotal = () => {
  return new Promise((resolve, reject) => {
   /* const sql =
      "SELECT b.ID_BOOKING, b.CLIENT_ID, SUM(p.PRICE * bp.QTY) AS TOTAL\
      FROM BOOKING b, BOOKING_PRODUCTS bp, PRODUCT_WEEK p \
      WHERE b.ID_BOOKING = bp.ID_BOOKING AND b.STATE=? AND bp.ID_PRODUCT = p.ID AND p.STATE=?\
      GROUP BY b.ID_BOOKING, b.CLIENT_ID";
    */
      const sql =
      "SELECT b.ID_BOOKING, b.CLIENT_ID, SUM(p.PRICE * bp.QTY) AS TOTAL " +
      "FROM BOOKING b, BOOKING_PRODUCTS bp, PRODUCT_WEEK p " +
      "WHERE b.ID_BOOKING = bp.ID_BOOKING AND b.STATE=? AND bp.ID_PRODUCT = p.ID AND p.STATE=? " +
      "GROUP BY b.ID_BOOKING, b.CLIENT_ID";
    db.all(sql,["BOOKED","CONFIRMED"], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      /*
      const bookings = rows.map((e) => ({
        id: e.ID_BOOKING,
        client: e.CLIENT_ID,
        total: e.TOTAL,
      }));

      resolve(bookings);
      */
     resolve(createBookingsFromQuery(rows));
    });
  });
};


// delete all products expected from bookings, to be called on tuesday
exports.deleteBookingProductsExpected = () => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM BOOKING_PRODUCTS WHERE ID_PRODUCT = (SELECT ID FROM PRODUCT_WEEK WHERE STATE=?) AND ID_BOOKING NOT IN (SELECT ID_BOOKING FROM BOOKING_HISTORY)";
    db.run(sql, ["EXPECTED"], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

//Get total of bookings in state PENDING CANCELATION
exports.getTotalPendingCancelation = () => {
  return new Promise((resolve, reject) => {
    /*
    const sql =
      "SELECT b.ID_BOOKING, b.CLIENT_ID, SUM(p.PRICE * bp.QTY) AS TOTAL\
      FROM BOOKING b, BOOKING_PRODUCTS bp, PRODUCT_WEEK p \
      WHERE b.ID_BOOKING = bp.ID_BOOKING AND b.STATE='PENDINGCANCELATION' AND bp.ID_PRODUCT = p.ID AND p.STATE='CONFIRMED'\
      GROUP BY b.ID_BOOKING, b.CLIENT_ID";
      */
     
    const sql =
    "SELECT b.ID_BOOKING, b.CLIENT_ID, SUM(p.PRICE * bp.QTY) AS TOTAL " +
    "FROM BOOKING b, BOOKING_PRODUCTS bp, PRODUCT_WEEK p " +
    "WHERE b.ID_BOOKING = bp.ID_BOOKING AND b.STATE='PENDINGCANCELATION' AND bp.ID_PRODUCT = p.ID AND p.STATE='CONFIRMED' "+
    "GROUP BY b.ID_BOOKING, b.CLIENT_ID";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      /*
      const bookings = rows.map((e) => ({
        id: e.ID_BOOKING,
        client: e.CLIENT_ID,
        total: e.TOTAL,
      }));
    */
      resolve(createBookingsFromQuery(rows));
    });
  });
};

const createBookingsFromQuery = (rows) => {
  return  rows.map((tuples) => ({
    id: tuples.ID_BOOKING,
    client: tuples.CLIENT_ID,
    total: tuples.TOTAL,
  }));
}

//Get bookings that we have to put in state EMPTY
exports.getEmptyBookings = () => {
  return new Promise((resolve, reject) => {
   /* const sql =
    "SELECT b.ID_BOOKING, b.CLIENT_ID \
    FROM BOOKING b \
    WHERE b.STATE = ? AND b.ID_BOOKING NOT IN \
        (SELECT b1.ID_BOOKING FROM BOOKING b1, BOOKING_PRODUCTS b2 \
          WHERE b1.ID_BOOKING = b2.ID_BOOKING \
          GROUP BY b1.ID_BOOKING)";
    */
          const sql =
          "SELECT b.ID_BOOKING, b.CLIENT_ID " +
          "FROM BOOKING b " +
          "WHERE b.STATE = ? AND b.ID_BOOKING NOT IN " +
             " (SELECT b1.ID_BOOKING FROM BOOKING b1, BOOKING_PRODUCTS b2 " +
              "  WHERE b1.ID_BOOKING = b2.ID_BOOKING " +
              "  GROUP BY b1.ID_BOOKING)";
    db.all(sql,["BOOKED"], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const bookings = rows.map((e) => ({
        id: e.ID_BOOKING,
        client: e.CLIENT_ID
      }));

      resolve(bookings);
    });
  });
};

//get all bookings without details about clients or products
exports.getAllBookingsVC = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT b.ID_BOOKING, b.STATE, b.CLIENT_ID FROM BOOKING b";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const bookings = rows.map((e) => ({
        id: e.ID_BOOKING,
        state: e.STATE,
        idClient: e.CLIENT_ID
      }));
      resolve(bookings);
    });
  });
};

// Add 10 to available quantity and put all products in state expected again
exports.resetProductWeekVC = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE PRODUCT_WEEK SET QTY=QTY+?, STATE=?";
    db.run(
      sql,
      [
        10,
        "EXPECTED"
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

// Counting missed pickups for a customer
exports.countMissedPickupsForACustomer = (customerId,preSuspensionDate) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(*) as total FROM BOOKING_HISTORY bh WHERE  bh.CLIENT_ID = ? and bh.STATE='UNRETRIEVED' and date(bh.START_DATE) > date(?, '+30 day')";
    db.all(sql, [customerId,preSuspensionDate], (err, rows) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(rows[0])
      }
    });
  });
};

// find clientId with bookingId
exports.findClientbyBooking = (bookingId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT CLIENT_ID as id FROM BOOKING WHERE ID_BOOKING=?";
    db.all(sql, [bookingId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(rows[0])
      }
    });
  });
};

// update the client missed pickups count
exports.updateClientMissedCount = (clientId, count) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE CLIENT set missedCount=? where ID=?";
    db.all(sql, [count, clientId], (err) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(true)
      }
    });
  });
};

// update the client susspensionDate
exports.updateClientSusspensionDate = (clientId, date) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE CLIENT set susspensionDate=? where ID=?";
    db.all(sql, [date, clientId], (err) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(true)
      }
    });
  });
};

// get a client suspension date
exports.getLatestSuspensionDate = (clientId) => {
  return new Promise((resolve, reject) => {
    const sql = "select suspenssionDate as date from CLIENT where ID=?";
    db.all(sql, [clientId], (err,rows) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(rows[0])
      }
    });
  });
};

//END OF VIRTUAL CLOCK DAO FUNCTIONS
