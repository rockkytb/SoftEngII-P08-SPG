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

//DO NOT DELETE, NEEDED ONLY FOR INTEGRATION TESTS
const switchTestMode = () => {
  testmode = true;
}


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
});

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if(testmode)
  {
    return next();
  }
  else{
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
app.get("/api/clients", isLoggedIn ,(req, res) => {
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

//POST /api/bookings
app.post(
  "/api/bookings", isLoggedIn,
  async (req, res) => {
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
  }
);

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

    dao.getClientByEmail(client.email).then(
        (c) => {
          if(c.id != -1){
            return res.status(503).json({
              error: `Error: ${client.email} already used.`,
            });
          }
        }
    ).catch((err) => {
      return res.status(500).json({
        errors: `Database errors: ${err}.`,
      });
    });

    let clientId;

    try {
      clientId = await dao.createClient(client);
      await dao.createWallet (clientId);
      res.status(201).json({ idClient: clientId });
    } catch (err) {
      res.status(503).json({
        error: `Database error during the creation of client: ${client.email}.`,
      });
    }
  }
);

//POST /api/bookingproduct

app.post(
  "/api/bookingproduct", //isLoggedIn,
  async (req, res) => {
    if (!validator.isInt(`${req.body.ID_Booking}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid booking id, it must be positive` });
    }
    if (!validator.isInt(`${req.body.ID_Product}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid product id, it must be positive` });
    }

    if (!validator.isInt(`${req.body.Qty}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid qty id, it must be positive` });
    }

    const bookingProduct = {
      ID_Booking: req.body.ID_Booking,
      ID_Product: req.body.ID_Product,
      Qty: req.body.Qty,
    };

    let result;

    try {
      result = await dao.createBookingProduct(bookingProduct);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the post of bookingProduct: ${bookingProduct}.`,
      });
    }

    //All went fine
    res.status(201).json(bookingProduct);
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

    let result;

    try {
      result = await dao.editQtyProductWeek(product);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the put of bookingProduct: ${product}.`,
      });
    }

    //All went fine
    res.status(201).json(product);
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

//PUT /api/walletbalance to update wallet balance 
app.put(
  "/api/walletbalance", /*isLoggedIn,*/
  async (req, res) => {
    if (!validator.isFloat(`${req.body.amount}`, { min: 0 })) {
      return res
        .status(422)
        .json({ error: `Invalid Balance Amount, it must be positive` });
    }
    const wallet = {
      id: req.body.id,
      amount: req.body.amount
    }

    dao
      .updateWallet(wallet)
      .then(() => {
        res.status(200).json(wallet);
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