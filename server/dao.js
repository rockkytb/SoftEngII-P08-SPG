'use strict';
/* Data Access Object (DAO) module for accessing tasks */

const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

//Set to true to enable testdatabase
const testmode = true;

// open the database
const db = new sqlite.Database(testmode ? ('testdatabase.db'):('database.db'), (err) => {
    if(err) throw err;
  });


  //get Client
exports.getClient = (email,password) => {
  return new Promise((resolve, reject) => {
    const sql= 'SELECT * FROM CLIENT WHERE EMAIL = ?';
    db.get(sql, [email], (err,row) => {
      if(err) {reject(err);}
      else if (row===undefined) {resolve (false);}
      else {
        const user = {id: 'C'+'${row.id}', username: row.email, name: row.name, surname: row.surname};
        
        bcrypt.compare(password, row.password).then(result => {
          if(result) resolve(user);
          
          else resolve(false);
        });
      }
    });
  });
};

//get Client by Id
exports.getClientById = (id) => {
  return new Promise((resolve, reject) => {
    const sql= 'SELECT * FROM CLIENT WHERE ID = ?';
    db.get(sql, [id], (err,row) => {
      if(err) {reject(err);}
      else if (row===undefined) {resolve (false);}
      else {
        const user = {id: 'C'+'${row.id}', username: row.email};
        resolve(user);
      }
    });
  });
};

//get Farmer
exports.getFarmer = (email,password) => {
  return new Promise((resolve, reject) => {
    const sql= 'SELECT * FROM FARMER WHERE EMAIL = ?';
    db.get(sql, [email], (err,row) => {
      if(err) {reject(err);}
      else if (row===undefined) {resolve (false);}
      else {
        const user = {id: 'F'+'${row.id}', username: row.email};
        
        bcrypt.compare(password, row.password).then(result => {
          if(result) resolve(user);
          
          else resolve(false);
        });
      }
    });
  });
};


//get Shop Employee
exports.getShopEmployee = (email,password) => {
  return new Promise((resolve, reject) => {
    const sql= 'SELECT * FROM SHOP_EMPLOYEE WHERE EMAIL = ?';
    db.get(sql, [email], (err,row) => {
      if(err) {reject(err);}
      else if (row===undefined) {resolve (false);}
      else {
        const user = {id: 'S'+'${row.id}', username: row.email};
        
        bcrypt.compare(password, row.password).then(result => {
          if(result) resolve(user);
          
          else resolve(false);
        });
      }
    });
  });
};

//get Farmer by Id
exports.getFarmerById = (id) => {
  return new Promise((resolve, reject) => {
    const sql= 'SELECT * FROM FARMER WHERE ID = ?';
    db.get(sql, [id], (err,row) => {
      if(err) {reject(err);}
      else if (row===undefined) {resolve (false);}
      else {
        const user = {id: 'F'+'${row.id}', username: row.email};
        resolve(user);
      }
    });
  });
};

//get ShopEmployee by Id
exports.getShopEmployeeById = (id) => {
  return new Promise((resolve, reject) => {
    const sql= 'SELECT * FROM SHOP_EMPLOYEE WHERE ID = ?';
    db.get(sql, [id], (err,row) => {
      if(err) {reject(err);}
      else if (row===undefined) {resolve (false);}
      else {
        const user = {id: 'S'+'${row.id}', username: row.email};
        resolve(user);
      }
    });
  });
};
