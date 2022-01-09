//File for managing sessions
"use strict";

const express = require("express");
const passport = require("passport");
const sessions = express.Router();
const dao = require("./dao");
const validator = require("validator");

let testmode = false;

sessions.use(passport.initialize());
sessions.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if (testmode) {
      return next();
    } else {
      if (req.isAuthenticated()) return next();
      return res.status(401).json({ error: "not authenticated" });
    }
  };

//POST /api/clientSessions FOR LOGIN OF CLIENT
sessions.post("/api/clientSessions", function (req, res, next) {
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
sessions.post("/api/warehouseWorkerSessions", function (req, res, next) {
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

//POST /api/warehouseManagerSessions FOR LOGIN OF WAREHOUSE MANGER
sessions.post("/api/warehouseManagerSessions", function (req, res, next) {
  passport.authenticate("warehouse-manager-local", (err, user, info) => {
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

//POST /api/warehouseManagerSessions FOR LOGIN OF MANGER
sessions.post("/api/managerSessions", function (req, res, next) {
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
sessions.post("/api/farmerSessions", function (req, res, next) {
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
sessions.post("/api/shopEmployeeSessions", function (req, res, next) {
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
sessions.delete("/api/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

//GET /api/userinfo
sessions.get("/api/userinfo", isLoggedIn, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = sessions;