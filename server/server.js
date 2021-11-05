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

/* TO BE IMPLEMENTED
passport.use(new LocalStrategy(
  function(username, password, done){
    dao.getUser(username,password)
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
  dao.getUserById(id).then((user) => {
    done(null,user);
  })
  .catch((err) => {
    done(err,null)
  });
}); */


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 