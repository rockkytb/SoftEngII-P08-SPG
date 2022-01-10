//File for managing user data
"use strict";

const express = require("express");
const users = express.Router();
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

//GET /api/clients/
users.get("/api/clients", isLoggedIn, (req, res) => {
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
users.post("/api/client", (req, res) => {
  if (!validator.isEmail(`${req.body.email}`)) {
    return res.status(422).json({ error: `Invalid email` });
  }

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
});

//POST /api/newclient
users.post("/api/newclient", async (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(422).json({ error: `Invalid client's email` });
  }

  if (!validator.isLength(req.body.phone, { min: 1, max: 15 })) {
    return res.status(422).json({ error: `Invalid client's phone` });
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
    phone: req.body.phone,
  };

  dao
    .getClientByEmail(client.email)
    .then((c) => {
      if (c !== -1) {
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
});

//POST /api/wallet
users.post("/api/wallet", isLoggedIn, async (req, res) => {
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
});

//PUT /api/walletbalance to update wallet balance
users.put("/api/walletbalance", isLoggedIn, async (req, res) => {
  if (!validator.isFloat(`${req.body.amount}`, { min: 0 })) {
    return res
      .status(422)
      .json({ error: `Invalid Balance Amount, it must be positive` });
  }
  const wallet = {
    id: req.body.id,
    amount: req.body.amount,
  };

  try {
    await dao.updateWallet(wallet);
    await telegramBot.SendMessage(
      wallet.id,
      `Your wallet was modified. New balance : ${wallet.amount} €`
    );
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET /api/acksNew to get all acks with NEW state
users.get("/api/acksNew", isLoggedIn, async (req, res) => {
  dao
    .getAcksStateNew()
    .then((acks) => {
      res.status(200).json(acks);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//POST /api/acknowledge
users.post("/api/acknowledge", isLoggedIn, async (req, res) => {
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
});

//PUT /api/ackstate
users.put("/api/ackstate", isLoggedIn, async (req, res) => {
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
});

exports.users = users;
exports.switchTestMode = switchTestMode;