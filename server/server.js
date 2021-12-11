"use strict";

const express = require("express");
const morgan = require("morgan"); // logging middleware
const { check, validationResult } = require("express-validator"); // validation middleware
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const dao = require("./dao"); // module for accessing the DB
//Per validazione aggiuntiva
const validator = require("validator");
let testmode = false;

//SWAGGER
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

//SHORT-TERM
let date = 0;

//DO NOT DELETE, NEEDED ONLY FOR INTEGRATION TESTS
const switchTestMode = () => {
  testmode = true;
};

// init express
const app = new express();
const port = 3001;

// enable sessions in Express
app.use(
  session({
    secret: "secret phrase chosen by me",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//init passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

/*** PASSPORT METHODS ***/

passport.use(
  "client-local",
  new LocalStrategy(function (username, password, done) {
    dao
      .getClient(username, password)
      .then((user) => {
        if (!user)
          return done(null, false, {
            message: "Incorrect username and/or password",
          });
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.use(
  "warehouse-worker-local",
  new LocalStrategy(function (username, password, done) {
    dao
      .getWarehouseWorker(username, password)
      .then((user) => {
        if (!user)
          return done(null, false, {
            message: "Incorrect username and/or password",
          });
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.use(
  "manager-local",
  new LocalStrategy(function (username, password, done) {
    dao
      .getManager(username, password)
      .then((user) => {
        if (!user)
          return done(null, false, {
            message: "Incorrect username and/or password",
          });
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.use(
  "farmer-local",
  new LocalStrategy(function (username, password, done) {
    dao
      .getFarmer(username, password)
      .then((user) => {
        if (!user)
          return done(null, false, {
            message: "Incorrect username and/or password",
          });
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.use(
  "shop-employee-local",
  new LocalStrategy(function (username, password, done) {
    dao
      .getShopEmployee(username, password)
      .then((user) => {
        if (!user)
          return done(null, false, {
            message: "Incorrect username and/or password",
          });
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  //Catch first letter from ID and decide what kind of user we have
  const type = id.charAt(0);
  const identifier = id.substring(1);

  if (type === "C") {
    dao
      .getClientById(identifier)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  }
  if (type === "F") {
    dao
      .getFarmerById(identifier)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  }
  if (type === "M") {
    dao
      .getManagerById(identifier)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  }
  if (type === "S") {
    dao
      .getShopEmployeeById(identifier)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  }
  if (type === "W") {
    dao
      .getWarehouseWorkerById(identifier)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  }
});

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (testmode) {
    return next();
  } else {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: "not authenticated" });
  }
};

//WRITE API HERE

//POST /api/clientSessions FOR LOGIN OF CLIENT
app.post("/api/clientSessions", function (req, res, next) {
  passport.authenticate("client-local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

//POST /api/warehouseWorkerSessions FOR LOGIN OF WAREHOUSE WORKER
app.post("/api/warehouseWorkerSessions", function (req, res, next) {
  passport.authenticate("warehouse-worker-local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

//POST /api/managerSessions FOR LOGIN OF CLIENT
app.post("/api/managerSessions", function (req, res, next) {
  passport.authenticate("manager-local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

//POST /api/famerSessions FOR LOGIN OF FARMERS
app.post("/api/farmerSessions", function (req, res, next) {
  passport.authenticate("farmer-local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

//POST /api/shopEmployeeSessions FOR LOGIN OF SHOP EMPLOYEE
app.post("/api/shopEmployeeSessions", function (req, res, next) {
  passport.authenticate("shop-employee-local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

//DELETE /api/logout
app.delete("/api/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

//GET /api/userinfo
app.get("/api/userinfo", isLoggedIn, (req, res) => {
  res.status(200).json(req.user);
});

//GET /api/clients/
app.get("/api/clients", (req, res) => {
  dao
    .getClients()
    .then((clients) => {
      res.status(200).json(clients);
    })
    .catch((err) => {
      res.status(500).json({
        errors: `Database errors: ${err}.`,
      });
    });
});

//POST /api/client/
app.post(
  "/api/client",
  /*isLoggedIn,*/ (req, res) => {
    dao
      .getClientByEmail(req.body.email)
      .then((client) => {
        if (client.id === -1) {
          res.status(401).json(client);
        } else {
          res.status(200).json(client);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: `Database errors: ${err}.`,
        });
      });
  }
);

//GET /api/categories/

app.get("/api/categories", isLoggedIn, (req, res) => {
  dao
    .getCategories()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json({
        errors: `Database errors: ${err}.`,
      });
    });
});

//POST /api/acknowledge
app.post(
  "/api/acknowledge",
  /*isLoggedIn*/ async (req, res) => {
    if (!validator.isInt(`${req.body.idFarmer}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid farmer id, it must be positive` });
    }

    if (!validator.isEmail(`${req.body.email}`)) {
      return res.status(422).json({ error: `Invalid farmer email` });
    }

    const ack = {
      idFarmer: req.body.idFarmer,
      email: req.body.email,
      state: "NEW",
    };

    let ackId;

    try {
      ackId = await dao.createAcknowledge(ack);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the creation of acknowledge for famer: ${ack.email}.`,
      });
    }

    //All went fine
    res.status(201).json({ idAck: ackId });
  }
);

//POST /api/bookings
app.post("/api/bookings", isLoggedIn, async (req, res) => {
  if (!validator.isInt(`${req.body.idClient}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid client id, it must be positive` });
  }

  const booking = {
    idClient: req.body.idClient,
    state: "BOOKED",
  };

  let bookingId;

  try {
    bookingId = await dao.createBooking(booking);
  } catch (err) {
    res.status(503).json({
      error: `Database error during the creation of booking for client: ${booking.idClient}.`,
    });
  }

  //All went fine
  res.status(201).json({ idBooking: bookingId });
});

//POST /api/newclient
app.post(
  "/api/newclient", //isLoggedIn,
  async (req, res) => {
    if (!validator.isEmail(req.body.email)) {
      return res.status(422).json({ error: `Invalid client's email` });
    }

    if (!validator.isLength(req.body.name, { min: 1, max: 100 })) {
      return res.status(422).json({ error: `Invalid client's name` });
    }

    if (!validator.isLength(req.body.surname, { min: 1, max: 100 })) {
      return res.status(422).json({ error: `Invalid client's surname` });
    }

    if (!validator.isLength(req.body.password, { min: 60, max: 60 })) {
      return res.status(422).json({ error: `Invalid client's password hash` });
    }

    const client = {
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
    };

    dao
      .getClientByEmail(client.email)
      .then((c) => {
        if (c.id != -1) {
          return res.status(503).json({
            error: `Error: ${client.email} already used.`,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          errors: `Database errors: ${err}.`,
        });
      });

    let clientId;

    try {
      clientId = await dao.createClient(client);
      await dao.createWallet(clientId);
      res.status(201).json({ idClient: clientId });
    } catch (err) {
      res.status(503).json({
        error: `Database error during the creation of client: ${client.email}.`,
      });
    }
  }
);

//POST /api/bookingproducts

app.post(
  "/api/bookingproducts", //isLoggedIn,
  async (req, res) => {
    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        if (!validator.isInt(`${req.body.ID_Booking}`, { min: 1 })) {
          return res
            .status(422)
            .json({ error: `Invalid booking id, it must be positive` });
        }
        /*if (!validator.isInt(`${req.body[key].ID_Product}`, { min: 1 })) {
          return res
            .status(422)
            .json({ error: `Invalid product id, it must be positive` });
        }

        if (!validator.isInt(`${req.body[key].Qty}`, { min: 1 })) {
          return res
            .status(422)
            .json({ error: `Invalid qty id, it must be positive` });
        }*/
      }
    }

    /*var problem = 0;
    var arrayResult = [];
    var bookingProduct;

    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        bookingProduct = {
          ID_Booking: req.body.ID_Booking,
          ID_Product: req.body[key].ID_Product,
          Qty: req.body[key].Qty,
        };

        try {
          await dao.createBookingProduct(bookingProduct);
          arrayResult.push(bookingProduct);
        } catch (err) {
          problem = 1;
          break;
        }
      }
    }*/ 
    let problems = 0;
    if(req.body && req.body.products && req.body.products.length > 0){
      for(const i of req.body.products){
        if (!i.id || !i.quantity || !validator.isInt(`${i.id}`, { min: 1 }) || !validator.isInt(`${i.quantity}`, { min: 1 })) {
          return res
            .status(422)
            .json({ error: `Invalid product datas` });
        }
        let bookingProduct = {
          ID_Booking : req.body.ID_Booking,
          ID_Product : i.id,
          Qty : i.quantity
        }
        try{
          await dao.createBookingProduct(bookingProduct);
        }
        catch (err){
          problems++;
        }
      }
    }
    else{
      return res
            .status(422)
            .json({ error: `No products existent` });
    }
      
    if (problems == 0) {
      //All went fine
      res.status(201).json("Ok");
    } else {
      res.status(201).json({
        error: `Database error during the post of bookingProduct: ${problems} wrong data.`,
      });
    }
  }
);

//PUT /api/productqty
app.put(
  "/api/productqty", //isLoggedIn,
  async (req, res) => {
    if (!validator.isInt(`${req.body.Dec_Qty}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid qty id, it must be positive` });
    }
    if (!validator.isInt(`${req.body.ID_Product}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid product id, it must be positive` });
    }

    const product = {
      ID_Product: req.body.ID_Product,
      Dec_Qty: req.body.Dec_Qty,
    };

    try {
      await dao.editQtyProductWeek(product);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the put of bookingProduct: ${product}.`,
      });
    }

    //All went fine
    res.status(201).json(product);
  }
);

//PUT /api/incrementProductQty
app.put(
  "/api/incrementProductQty", //isLoggedIn,
  async (req, res) => {
    if (!validator.isInt(`${req.body.Inc_Qty}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid qty, it must be positive` });
    }
    if (!validator.isInt(`${req.body.ID_Product}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid product id, it must be positive` });
    }

    const product = {
      ID_Product: req.body.ID_Product,
      Inc_Qty: req.body.Inc_Qty,
    };
    let updatedProduct;
    try {
      updatedProduct = await dao.IncrementQtyProductWeek(product);
      console.log("updatedProduct="+updatedProduct)
    } catch (err) {
      res.status(503).json({
        error: `Database error during incrementing product qty: ${product}.`,
      });
    }

    //All went fine
    res.status(200).json(updatedProduct);
  }
);

//PUT /api/productstate
app.put(
  "/api/productstate", //isLoggedIn,
  async (req, res) => {
    if (!validator.isLength(`${req.body.state}`, { min: 1 })) {
      return res.status(422).json({ error: `Invalid state lenght` });
    }
    if (!validator.isInt(`${req.body.id}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid product id, it must be positive` });
    }

    const product = {
      id: req.body.id,
      state: req.body.state,
    };

    try {
      await dao.editStateProductWeek(product);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the put of bookingProduct: ${product}.`,
      });
    }

    //All went fine
    res.status(201).json(product);
  }
);

//DELETE /api/products/{id}
app.delete(
  "/api/products/:id", //isLoggedIn,
  async (req, res) => {
    const id = req.params.id;
    if (!validator.isInt(id, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid product id, it must be positive` });
    }

    try {
      await dao.deleteProduct(id);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the deletation of productId: ${id}.`,
      });
    }

    //All went fine
    res.status(204).json();
  }
);

// POST /api/farmers/:farmerid/products
app.post(
  "/api/farmers/:farmerid/products" /*, isLoggedIn*/,
  async (req, res) => {
    const product = {
      name: req.body.name,
      category_id: req.body.category,
      price: req.body.price,
      qty: req.body.qty,
      farmer_id: req.params.farmerid,
      state: "CONFIRMED",
      size: req.body.size,
      unit_of_measure: req.body.unit_of_measure,
    };

    let productId;

    try {
      productId = await dao.insertTupleProductWEEK(product);
    } catch (err) {
      res.status(503).json({
        error: `Database error during insertion into product_week table.`,
      });
    }

    //All went fine
    res.status(201).json({ productId: productId });
  }
);

// POST /api/farmers/:farmerid/productsExpected receive a vector of tuples of products expected
app.post(
  "/api/farmers/:farmerid/productsExpected" /*, isLoggedIn*/,
  async (req, res) => {
    const product = {
      name: req.body.name,
      category_id: req.body.category,
      price: req.body.price,
      qty: req.body.qty,
      farmer_id: req.params.farmerid,
      state: "EXPECTED",
      size: req.body.size,
      unit_of_measure: req.body.unit_of_measure,
    };

    let productId;

    try {
      productId = await dao.insertTupleProductWEEK(product);
    } catch (err) {
      res.status(503).json({
        error: `Database error during insertion into product_week table.`,
      });
      return;
    }

    //All went fine
    res.status(201).json({ productId: productId });
  }
);

//PUT /api/bookingstate
app.put(
  "/api/bookingstate", //isLoggedIn,
  async (req, res) => {
    if (!validator.isInt(`${req.body.id}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid product id, it must be positive` });
    }

    const booking = {
      id: req.body.id,
      state: req.body.state,
    };

    let result;

    try {
      result = await dao.editStateBooking(booking);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the put of booking state: ${result}.`,
      });
    }

    //All went fine
    res.status(201).json(result);
  }
);

//PUT /api/ackstate
app.put(
  "/api/ackstate", //isLoggedIn,
  async (req, res) => {
    if (!validator.isInt(`${req.body.id}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid ack id, it must be positive` });
    }

    const ack = {
      id: req.body.id,
      state: req.body.state,
    };

    let result;

    try {
      result = await dao.editStateAck(ack);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the put of ack state: ${result}.`,
      });
    }

    //All went fine
    res.status(201).json(result);
  }
);

// GET /api/acksNew to get all acks with NEW state
app.get("/api/acksNew" /*isLoggedIn,*/, async (req, res) => {
  dao
    .getAcksStateNew()
    .then((acks) => {
      res.status(200).json(acks);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//POST /api/wallet
app.post(
  "/api/wallet", //isLoggedIn,
  async (req, res) => {
    if (!validator.isInt(`${req.body.id}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid booking id, it must be positive` });
    }

    let result;

    try {
      result = await dao.getWallet(req.body.id);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the post of bookingProduct: ${bookingProduct}.`,
      });
    }

    //All went fine
    res.status(201).json(result);
  }
);

//GET /api/farmers/:farmerid/products_expected to get a list of all products
app.get("/api/farmers/:farmerid/products_expected", (req, res) => {
  dao
    .getAllProductsExpectedForFarmer(req.params.farmerid)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//GET /api/products to get a list of all products
app.get("/api/products", (req, res) => {
  dao
    .getAllProducts()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//GET /api/bookingModesPreparation
app.get(
  "/api/bookingModesPreparation",
  /* isLoggedIn,*/ (req, res) => {
    dao
      .getbookingModesPreparation()
      .then((bookings) => {
        res.status(200).json(bookings);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
);

// GET /api/bookingModesNew/pickup
app.get(
  "/api/bookingModesNew/pickup",
  /* isLoggedIn,*/ (req, res) => {
    dao
      .getbookingModesNewPickup()
      .then((bookings) => {
        res.status(200).json(bookings);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
);

//GET /api/products/farmers/:id to get a list of all CONFIRMED products for a particular farmer
app.get("/api/products/farmers/:id", (req, res) => {
  const id = req.params.id;
  dao
    .getAllProductsConfirmedForFarmer(id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//GET /api/bookings to get a list of all bookings
app.get("/api/bookings", (req, res) => {
  dao
    .getAllBookings()
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//GET /api/bookings/clients/{id} to get a list of all bookings for a particular cllient
app.get("/api/bookings/clients/:id", (req, res) => {
  const id = req.params.id;
  dao
    .getAllBookingsForClient(id)
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//PUT /api/walletbalance to update wallet balance
app.put("/api/walletbalance" /*isLoggedIn,*/, async (req, res) => {
  if (!validator.isFloat(`${req.body.amount}`, { min: 0 })) {
    return res
      .status(422)
      .json({ error: `Invalid Balance Amount, it must be positive` });
  }
  const wallet = {
    id: req.body.id,
    amount: req.body.amount,
  };

  dao
    .updateWallet(wallet)
    .then(() => {
      res.status(200).json(wallet);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET /api/bookingsPendingCancelation to get all bookings with PENDINGCANCELATION state
app.get("/api/bookingsPendingCancelation" /*isLoggedIn,*/, async (req, res) => {
  dao
    .getBookingsStatePendingCancelation()
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// POST /api/products_expected receive a vector of tuples of products expected

app.post("/api/products_expected" /*isLoggedIn,*/, async (req, res) => {
  var idProduct;
  var results = [];
  var problem = 0;
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      //do something with e.g. req.body[key]
      try {
        idProduct = await dao.insertTupleProductExpected(req.body[key]);
      } catch (err) {
        problem = 1;
        break;
      }
      const product = {
        id: idProduct,
        nameProduct: req.body[key].name,
      };
      results.push(product);
    }
  }
  if (problem == 0) {
    //All went fine
    res.status(201).json(results);
  } else {
    res.status(503).json({
      error: `Database error during the post of ProductExpected`,
    });
  }
});

// put /api/clientsPreparation
app.put("/api/clientsPreparation" /*, isLoggedIn*/, async (req, res) => {
  let result = [];

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      //do something with e.g. req.body[key]

      if (!validator.isInt(`${req.body[key].id}`, { min: 1 })) {
        return res.status(422).json({
          error: `Invalid product id of a element on the array, it must be positive`,
        });
      }
    }
  }
  //All the product have valid body

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      const product = {
        id: req.body[key].id,
      };

      try {
        const clients = await dao.getClientsPreparation(product.id);

        result = result.concat(clients);
        console.log(result);
      } catch (e) {
        res.status(503).json({
          error: `Database error or undefined product during the put of the state of array product`,
        });
      }
    }
  }

  //All went fine

  // eliminare duplicati
  result = result.filter(function (item, pos) {
    return result.indexOf(item) == pos;
  });
  console.log(result);
  res.status(201).json(result);
});

//POST /api/bookings_mode
app.post("/api/bookings_mode" /*, isLoggedIn*/, async (req, res) => {
  const booking_mode = {
    idBooking: req.body.idBooking,
    delivery: req.body.delivery,
    street: req.body.street,
    city: req.body.city,
    province: req.body.province,
    postal_code: req.body.postal_code,
    country: req.body.country,
    date: req.body.date,
    time: req.body.time,
    extra_fee: req.body.extra_fee,
  };

  let bookingModeId;

  try {
    bookingModeId = await dao.createBookingMode(booking_mode);
  } catch (err) {
    res.status(503).json({
      error: `Database error during the creation of booking mode.`,
    });
  }

  //All went fine
  res.status(201).json({ idBookingMode: bookingModeId });
});

//PUT /api/bookings_mode/{id}
app.put(
  "/api/bookings_mode/:id", //isLoggedIn,
  async (req, res) => {
    const id = req.params.id;
    if (!validator.isInt(id, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid booking mode id, it must be positive` });
    }
    dao
      .updateStateBookingMode(id)
      .then(() => {
        res.status(200).json({ bookingModeId: id });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
);

//PUT  /api/products
app.put("/api/products" /*, isLoggedIn*/, async (req, res) => {
  var result;
  var problem = 0;

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      //do something with e.g. req.body[key]

      if (!validator.isLength(`${req.body[key].state}`, { min: 4 })) {
        return res
          .status(422)
          .json({ error: `Invalid state lenght of a element on the array` });
      }
      if (!validator.isInt(`${req.body[key].id}`, { min: 1 })) {
        return res.status(422).json({
          error: `Invalid product id of a element on the array, it must be positive`,
        });
      }
    }
  }
  //All the product have valid body

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      const product = {
        id: req.body[key].id,
        state: req.body[key].state,
      };

      try {
        result = await dao.editStateProductWeek(product);
      } catch (err) {
        problem = 1;
        break;
      }
    }
  }
  if (problem == 0) {
    //All went fine
    res.status(201).json(true);
  } else {
    res.status(503).json({
      error: `Database error or undefined product during the put of the state of array product`,
    });
  }
});

//////TODO: move clock to backend
//////SHORT-TERM: receive the day of the week we put
app.post("/api/clock" /*, isLoggedIn*/, async (req, res) => {
  date = req.body.date;

  if (!date || date < 1 || date > 7)
    res.status(503).json({
      error: `Database error during the creation of booking mode.`,
    });
  if (date == 2) {
    dao
      .getTotal()
      .then((booking) => {
        booking.map((c) => {
          let wallet = dao.getWallet(c.client).then((res) => res.balance);
          if (wallet >= c.total) {
            dao
              .updateWallet({ amount: wallet - c.total, id: c.client })
              .then((res) => res);
          } else {
            dao
              .editStateBooking({ id: c.id, state: "PENDINGCANCELATION" })
              .then((res) => res);
          }
        });
        //res.status(200).json(clients);
      })
      .catch((err) => {
        res.status(500).json({
          errors: `Database errors: ${err}.`,
        });
      });
  }

  //All went fine
  res.status(201).json({ date: date });
});

//GET /api/bookings/booked/clients/:id

app.get("/api/bookings/booked/clients/:id", (req, res) => {
  const id = req.params.id;
  if (!validator.isInt(`${req.params.id}`, { min: 1 })) {
    return res.status(422).json({
      error: `Invalid product id of a element on the array, it must be positive`,
    });
  }

  dao
    .getAllBookingsForClientBooked(id)
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});


///GET /api/bookingProducts/:bookingId
app.get("/api/bookingProducts/:bookingId", (req, res) => {
  const id = req.params.bookingId;
  console.log(req.params.bookingId)
  if (!validator.isInt(`${req.params.bookingId}`, { min: 1 })) {
    return res.status(422).json({
      error: `Invalid product id of a element on the array, it must be positive`,
    });
  }

  dao
    .productsOfBooking(id)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});


// activate the server
const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

exports.server = server;
exports.switchTestMode = switchTestMode;
