'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require ('express-session');
const dao = require('./dao'); // module for accessing the DB
//Per validazione aggiuntiva
const validator = require('validator');

// init express
const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next();
  
  return res.status(401).json({ error: 'not authenticated'});
}

// enable sessions in Express
app.use(session ({
  secret:"secret phrase choosen by me",
  resave:false,
  saveUninitialized: false,
}));

//init passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

/*** PASSPORT METHODS ***/

passport.use('client-local',new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(username, password, done){
    dao.getClient(username,password)
    .then((user) => {
      if(!user)
        return done(null,false, {message: "Incorrect username and/or password"});
      return done(null,user);    
    })
    .catch((err)=>{
      return done(err);
    });
  }));

  passport.use('farmer-local',new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(username, password, done){
      dao.getFarmer(username,password)
      .then((user) => {
        if(!user)
          return done(null,false, {message: "Incorrect username and/or password"});
        return done(null,user);    
      })
      .catch((err)=>{
        return done(err);
      });
    }));

    passport.use('shop-employee-local',new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
      },
      function(username, password, done){
        dao.getShopEmployee(username,password)
        .then((user) => {
          if(!user)
            return done(null,false, {message: "Incorrect username and/or password"});
          return done(null,user);    
        })
        .catch((err)=>{
          return done(err);
        });
      }));

passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser((id,done) => {

  //Catch first letter from ID and decide what kind of user we have
  const type = id.charAt(0);
  const identifier = id.substring(1);

  if(type === 'C'){
    dao.getClientById(identifier).then((user) => {
      done(null,user);
    })
    .catch((err) => {
      done(err,null)
    });
  }
  if (type === 'F'){
    dao.getFarmerById(identifier).then((user) => {
      done(null,user);
    })
    .catch((err) => {
      done(err,null)
    });
  }
  if (type === 'S'){
    dao.getShopEmployeeById(identifier).then((user) => {
      done(null,user);
    })
    .catch((err) => {
      done(err,null)
    });
  }

  
});



// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 