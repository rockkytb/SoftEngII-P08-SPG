"use strict";

const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");

//Set to true to enable testdatabase
const testmode = true;

// open the database
const db = new sqlite.Database("testdatabase.db", (err) => {
  if (err) throw err;
});
