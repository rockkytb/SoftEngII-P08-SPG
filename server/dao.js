'use strict';
/* Data Access Object (DAO) module for accessing tasks */

const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

// open the database
const db = new sqlite.Database('database.db', (err) => {
    if(err) throw err;
  });