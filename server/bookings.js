//File for managing bookings
"use strict";

const express = require("express");
const bookings = express.Router();
const dao = require("./dao");
const validator = require("validator");

let testmode = false;

const switchTestMode = () => {
  testmode = true;
};

const isLoggedIn = (req, res, next) => {
  if (testmode) {
    return next();
  } else {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: "not authenticated" });
  }
};

//GET /api/bookings to get a list of all bookings
bookings.get("/api/bookings", isLoggedIn, (req, res) => {
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
bookings.get("/api/bookings/clients/:id", isLoggedIn, (req, res) => {
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

bookings.get("/api/bookings/booked/clients/:id", isLoggedIn, (req, res) => {
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

// GET /api/bookingsPendingCancelation to get all bookings with PENDINGCANCELATION state
bookings.get("/api/bookingsPendingCancelation", isLoggedIn, async (req, res) => {
  dao
    .getBookingsStatePendingCancelation()
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

bookings.get("/api/bookingsUnretrieved", isLoggedIn, async (req, res) => {
  dao
    .getBookingsUnretrieved()
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//POST /api/bookings
bookings.post("/api/bookings", isLoggedIn, async (req, res) => {
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
    return res.status(503).json({
      error: `Database error during the creation of booking for client: ${booking.idClient}.`,
    });
  }

  //All went fine
  res.status(201).json({ idBooking: bookingId });
});

//PUT /api/bookingstate
bookings.put("/api/bookingstate", isLoggedIn, async (req, res) => {
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
});

//GET /api/bookingModesPreparation
bookings.get("/api/bookingModesPreparation", isLoggedIn, (req, res) => {
  dao
    .getbookingModesPreparation()
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET /api/bookingModesNew/pickup
bookings.get("/api/bookingModesNew/pickup", isLoggedIn, (req, res) => {
  dao
    .getbookingModesNewPickup()
    .then((bookings) => {
      res.status(200).json(bookings);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//POST /api/bookings_mode
bookings.post("/api/bookings_mode", isLoggedIn, async (req, res) => {
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
    return res.status(503).json({
      error: `Database error during the creation of booking mode.`,
    });
  }

  //All went fine
  res.status(201).json({ idBookingMode: bookingModeId });
});

//PUT /api/bookings_mode/{id}
bookings.put("/api/bookings_mode/:id", isLoggedIn, async (req, res) => {
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
});

exports.bookings = bookings;
exports.switchTestMode = switchTestMode;