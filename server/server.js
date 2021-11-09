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

// init express
const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

// enable sessions in Express
app.use(
  session({
    secret: "secret phrase choosen by me",
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

//POST /api/logout
app.post("/api/logout", (req, res) => {
  req.logout();
  res.end();
});

//GET /api/userinfo
app.get("/api/userinfo", isLoggedIn, (req, res) => {
  res.status(200).json(req.user);
});

//GET /api/clients/
app.get("/api/clients", isLoggedIn, (req, res) => {
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

//GET /api/client/
app.get("/api/client", isLoggedIn, (req, res) => {
  dao
    .getClientByEmail(req.body.email)
    .then((client) => {
      res.status(200).json(client);
    })
    .catch((err) => {
      res.status(500).json({
        errors: `Database errors: ${err}.`,
      });
    });
});

//POST /api/bookings
app.post(
  "/api/bookings", //isLoggedIn,
  async (req, res) => {
    if (!validator.isInt(`${req.body.idClient}`, { min: 0 })) {
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

    let clientId;

    try {
      clientId = await dao.createClient(client);
    } catch (err) {
      res.status(503).json({
        error: `Database error during the creation of client: ${client.email}.`,
      });
    }

    //All went fine
    res.status(201).json({ idClient: clientId });
  }
);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
