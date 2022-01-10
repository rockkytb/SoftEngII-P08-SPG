"use strict";

const express = require("express");
const morgan = require("morgan"); // logging middleware
const { check, validationResult } = require("express-validator"); // validation middleware
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const dao = require("./dao"); // module for accessing the DB
const telegramBot = require("./telegrambot/SendMessage.js");

//custom modules
const products = require("./products.js");
const sessions = require("./session.js");
const users = require("./users.js");
const bookings = require("./bookings.js");

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
  products.switchTestMode();
  sessions.switchTestMode();
  users.switchTestMode();
  bookings.switchTestMode();
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

//#region PASSPORT METHODS
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

        // check if the user is suspended or not
        if (user.suspensionDate != null) {
          //mighe be suspended
          // check the date
          let suspensionDate = new Date(user.suspensionDate);
          let now = new Date(clockDate);
          let freeDate = new Date(suspensionDate);
          freeDate.setDate(suspensionDate.getDate() + 30);
          if (now >= freeDate && user.missedCount < 5) {
            // user is not suspended
            // count the number of missed pickups and send message if it is 3 or 4
            if (user.missedCount == 3 || user.missedCount == 4) {
              return done(null, user, {
                message: `You have ${user.missedCount} missed pickups!\n
                 You will be suspeneded for 30 days on the 5th time.`,
              });
            }
            return done(null, user);
          } else {
            return done(null, false, {
              message: `You are Suspended for ${
                freeDate.getDate() - now.getDate()
              } more days`,
            });
          }
        } else {
          // count the number of missed pickups and send message if it is 3 or 4
          if (user.missedCount == 3 || user.missedCount == 4) {
            return done(null, user, {
              message: `You have ${user.missedCount} missed pickups!\n
               You will be suspeneded for 30 days on the 5th time.`,
            });
          }
          return done(null, user);
        }
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
  "warehouse-manager-local",
  new LocalStrategy(function (username, password, done) {
    dao
      .getWarehouseManager(username, password)
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
      .getWarehouseManagerById(identifier)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  }
  if (type === "A") {
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

//#endregion PASSPORT METHODS

// set-up the middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(products.products);
app.use(sessions.sessions);
app.use(users.users);
app.use(bookings.bookings);

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

// POST /api/farmers/:farmerid/products
app.post("/api/farmers/:farmerid/products", isLoggedIn, async (req, res) => {
  if (!validator.isInt(`${req.body.category}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid category id, it must be positive` });
  }
  if (!validator.isFloat(`${req.body.price}`, { min: 0 })) {
    return res
      .status(422)
      .json({ error: `Invalid product price, it must be positive` });
  }
  if (!validator.isInt(`${req.body.farmerid}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid farmer id, it must be positive` });
  }
  if (!validator.isInt(`${req.body.qty}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid quantity, it must be positive` });
  }
  if (!validator.isInt(`${req.body.size}`, { min: 1 })) {
    return res.status(422).json({ error: `Invalid size, it must be positive` });
  }
  if (!validator.isLength(`${req.body.unit_of_measure}`, { max: 15 })) {
    return res.status(422).json({
      error: `Invalid unit of measure, it must be a string of max 15 length`,
    });
  }
  const product = {
    name: `${req.body.name}`,
    category_id: req.body.category,
    price: req.body.price,
    qty: req.body.qty,
    farmer_id: req.params.farmerid,
    state: "CONFIRMED",
    size: req.body.size,
    unit_of_measure: `${req.body.unit_of_measure}`,
  };

  let productId;

  try {
    productId = await dao.insertTupleProductWEEK(product);
    res.status(201).json({ productId: productId });
  } catch (err) {
    res.status(503).json({
      error: `Database error during insertion into product_week table.`,
    });
  }
});

// put /api/clientsPreparation
app.put("/api/clientsPreparation", isLoggedIn, async (req, res) => {
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
  res.status(201).json(result);
});

//#region VIRTUAL CLOCK FUNCTIONS

//////SHORT-TERM: receive the day of the week we put
app.post("/api/clock", isLoggedIn, async (req, res) => {
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
              .editStateBooking({ id: c.id, state: "CONFIRMED" })
              .then((res) => res);
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

//VIRTUAL CLOCK MANAGEMENT
let virtualTime = false;
let clockDate = new Date();
let timers = setInterval(async () => {
  clockDate = new Date();
  await clockActions();
}, 30000);
//FLAG to execute queries once a day, resetted every sunday
let once = [true, true, true, true, true, true, true];

//For periodic remainder, every 4 hours
let oldHours = 0;

//GET /api/time to get current time
app.get("/api/time", (req, res) => {
  res.status(200).json(clockDate);
});

//GET /api/virtualTime to enable/disable virtual time
app.get("/api/virtualTime", async (req, res) => {
  virtualTime = !virtualTime;
  clearInterval(timers);
  if (virtualTime) {
    //Adds 2 hours every 7 seconds
    timers = setInterval(async () => {
      let d = new Date(clockDate);
      d.setHours(d.getHours() + 2);
      clockDate = d;
      await clockActions();
    }, 7000);
  } else {
    //Update date every 30 seconds if real time enabled
    clockDate = new Date();
    timers = setInterval(async () => {
      clockDate = new Date();
      await clockActions();
    }, 30000);
  }

  //All went fine
  res.status(200).json(clockDate);
});

//Function to manage flow of SPG according to days
async function clockActions() {
  try {
    /* On TUESDAY farmers have delivered their products. Now it's time to check if all the bookings that are 
    BOOKED should become CONFIRMED or PENDINGCANCELATION. We should keep in the booking only the products
    CONFIRMED BY FARMERS. If all products of a booking are not confirmed the booking become EMPTY 
    and the client is notified. 
    Periodic telegram message is sent if customer needs to top up
    A message is sent if booking is confirmed*/

    if (clockDate.getDay() === 2) {
      if (once[2]) {
        //Delete from bookings all product still expected, so unconfirmed
        await dao.deleteBookingProductsExpected();

        const bookings = await dao.getTotal();

        bookings.forEach(async (booking) => {
          //Get the wallet  of the customer and put in variable wallet
          const wallet = await dao.getWallet(booking.client);
          if (wallet.balance >= booking.total) {
            //PUT in state CONFIRMED
            await dao.editStateBooking({ id: booking.id, state: "CONFIRMED" });
            //Update amount
            await dao.updateWallet({
              amount: wallet.balance - booking.total,
              id: booking.client,
            });
            //Send telegram message
            const bookingProducts = await dao.productsOfBooking(booking.id);
            telegramBot.SendMessage(
              booking.client,
              `Purchase confirmation, booking #${
                booking.id
              }:\n\n${bookingProducts.map(
                (p) => p.qty + " " + p.product
              )}\n\nTotal: ${booking.total} €`
            );
          } else {
            //Put in state PENDINGCANCELATION
            await dao.editStateBooking({
              id: booking.id,
              state: "PENDINGCANCELATION",
            });
          }
        });

        //If empty bookings put in state EMPTY
        const emptyBknings = await dao.getEmptyBookings();

        emptyBknings.forEach(async (booking) => {
          await dao.editStateBooking({ id: booking.id, state: "EMPTY" });
        });
        once[2] = false;
      }
      //Every 4 hour remember to top up to all clients that have bookings in pendingcancelation state
      if (clockDate.getHours() - oldHours >= 4) {
        oldHours = clockDate.getHours() - oldHours;
        const bookings = await dao.getTotalPendingCancelation();
        let alreadySent = [];
        bookings.forEach(async (booking) => {
          if (!alreadySent.includes(booking.client)) {
            const wallet = await dao.getWallet(booking.client);
            telegramBot.SendMessage(
              booking.client,
              `Your current balance (${
                wallet.balance
              } €) is insufficient to complete the order #${
                booking.id
              }. Please top-up at least ${
                booking.total - wallet.balance
              }€ to complete the order.`
            );
            alreadySent.push(booking.client);
          }
        });
      }
    }

    /* Until WEDNESDAY customer have the possibility to top up their wallets if they have orders
    in state PENDINGCANCELATION. If they do and the balance is enough, their orders will return in
    CONFIRMED state, otherwise they will be CANCELED. 
    A message is sent if booking is confirmed*/
    if (clockDate.getDay() === 3 && once[3]) {
      const bookings = await dao.getTotalPendingCancelation();
      bookings.forEach(async (booking) => {
        //Get the wallet  of the customer and put in variable wallet
        const wallet = await dao.getWallet(booking.client);
        if (wallet.balance >= booking.total) {
          //PUT in state CONFIRMED
          await dao.editStateBooking({ id: booking.id, state: "CONFIRMED" });
          //Send telegram message
          const bookingProducts = await dao.productsOfBooking(booking.id);
          telegramBot.SendMessage(
            booking.client,
            `Purchase confirmation, booking #${
              booking.id
            }:\n\n${bookingProducts.map(
              (p) => p.qty + " " + p.product
            )}\n\nTotal: ${booking.total} €`
          );
          //Update amount
          await dao.updateWallet({
            amount: wallet.balance - booking.total,
            id: booking.client,
          });
        } else {
          //Put in state CANCELED
          await dao.editStateBooking({ id: booking.id, state: "CANCELED" });
        }
      });

      once[3] = false;
    }

    /* On SATURDAY MORNING a new week starts. So we move bookings from booking table to booking history
    table. If a booking was in COMPLETED or EMPTY or CANCELED state, it will be saved in booking history as COMPLETED
    or EMPTY or CANCELED. If it was in CONFIRMED state and Delivery Mode was pickup, it will be saved as
    UNRETRIEVED. If it was CONFIRMED and Delivery mode was delivery, we just delete it from booking, we don't care
    about this state now (it's for future stories). 
    
    Moreover, we move all products to EXPECTED state and we add 10 to every quantity*/
    if (clockDate.getDay() === 6 && once[6]) {
      const startDate = new Date(clockDate);
      //If this happens only on saturday, starday will be monday
      startDate.setDate(startDate.getDate() - 5);
      //Same for sunday
      const endDate = new Date(clockDate);
      endDate.setDate(endDate.getDate() + 1);

      const bookings = await dao.getAllBookingsVC();
      bookings.forEach(async (booking) => {
        if (
          booking.state === "EMPTY" ||
          booking.state === "COMPLETED" ||
          booking.state === "CANCELED"
        ) {
          await dao.deleteBooking(booking.id);
          await dao.insertTupleBookingHistory({
            ID_BOOKING: booking.id,
            CLIENT_ID: booking.idClient,
            STATE: booking.state,
            START_DATE: startDate.toISOString().split("T")[0],
            END_DATE: endDate.toISOString().split("T")[0],
          });
        } else if (booking.state === "CONFIRMED" && booking.delivery === 0) {
          await dao.deleteBooking(booking.id);
          await dao.insertTupleBookingHistory({
            ID_BOOKING: booking.id,
            CLIENT_ID: booking.idClient,
            STATE: "UNRETRIEVED",
            START_DATE: startDate.toISOString().split("T")[0],
            END_DATE: endDate.toISOString().split("T")[0],
          });

          // get the clientId based on the bookingId
          const client = await dao.findClientbyBooking(booking.id);

         /* // get the client suspension date if exists
          var suspension = await dao.getLatestSuspensionDate(client.id);
          if (suspension.date) suspension = suspension.date;
          else suspension = null;*/

          // check the number of missed pickups
          const missedPikcups = await dao.countMissedPickupsForACustomer(
            client.id/*,
            suspension*/
          );

          // calculate new missed counts
          const missedCount = missedPikcups.total+1;

          //update the client table
          await dao.updateClientMissedCount(client.id, missedCount);

          // check the number of missed pickups
          if (missedCount > 2 && missedCount < 5) {// send alarm
           
            console.log( `This is a reminder to inform you that you have missed picking up your order for ${missedCount} times!
            \nYour account will be susspended on the 5th time.`)
            telegramBot.SendMessage(
              booking.client,
              `This is a reminder to inform you that you have missed picking up your order for ${missedCount} times!
          \nYour account will be susspended on the 5th time.`
            );
          } else if (missedCount == 5) {// susspend the client
            
            // Calculate NOW date
            var now = new Date(clockDate);
            now = now.toISOString().split("T")[0];

            //update the susspensionDate column of CLIENT table
            await dao.updateClientSusspensionDate(client.id, now);

            //set the number of missed pickups to zero
            await dao.updateClientMissedCount(client.id, 0);

            console.log(`You have reached your limit. We are sorry to say that your account has been suspended.`)
            telegramBot.SendMessage(
              booking.client,
              `You have reached your limit. We are sorry to say that your account has been suspended.`
            );
          }
        }
        //Other cases, we delete the booking and we move in state canceled
        else {
          await dao.deleteBooking(booking.id);
          await dao.insertTupleBookingHistory({
            ID_BOOKING: booking.id,
            CLIENT_ID: booking.idClient,
            STATE: "CANCELED",
            START_DATE: startDate.toISOString().split("T")[0],
            END_DATE: endDate.toISOString().split("T")[0],
          });
        }
      });

      //Move all products in product_week to expected and increase qty by 10
      await dao.resetProductWeekVC();

      once[6] = false;
      once[1] = true;
    }

    //On sunday set all once to true
    if (clockDate.getDay() === 0 && once[0]) {
      for (let i = 1; i < 7; i++) {
        once[i] = true;
      }
      const clients = await dao.getClients();
      //Send a message to every customer on sunday morning
      clients.forEach((c) => {
        telegramBot.SendMessage(
          c.id.substring(1),
          "Updated list of available products is now available on website."
        );
      });
      once[0] = false;
    }
  } catch (err) {
    return err;
  }
  //TODO, what happens if quantity confirmed is less than expected? Handle this
}

//#endregion VIRTUAL CLOCK

// activate the server
const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

exports.server = server;
exports.switchTestMode = switchTestMode;
