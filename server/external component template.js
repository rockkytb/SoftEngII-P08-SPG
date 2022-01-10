//File for template
"use strict";

const express = require("express");
const template = express.Router();
const dao = require("./dao");
const validator = require("validator");

let testmode = true;

const isLoggedIn = (req, res, next) => {
  if (testmode) {
    return next();
  } else {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: "not authenticated" });
  }
};


module.exports = template;