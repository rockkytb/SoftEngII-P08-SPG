//File for managing products
"use strict";

const express = require("express");
const products = express.Router();
const dao = require("./dao");
const validator = require("validator");

let testmode = false;

const isLoggedIn = (req, res, next) => {
  if (testmode) {
    return next();
  } else {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: "not authenticated" });
  }
};

//GET /api/categories/
products.get("/api/categories", isLoggedIn, (req, res) => {
  dao
    .getCategories()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json({
        errors: `Database errors: ${err}.`,
      });
    });
});

products.get("/api/products", (req, res) => {
  dao
    .getAllProducts()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

products.put("/api/products", isLoggedIn, async (req, res) => {
  if (!validator.isLength(`${req.body.state}`, { min: 1 })) {
    return 1;
  }
  if (!validator.isInt(`${req.body.id}`, { min: 1 })) {
    return 1;
  }

  const product = {
    id: req.body.id,
    state: req.body.state,
  };

  try {
    await dao.editStateProductWeek(product);
    return 0;
  } catch (err) {
    return 2;
  }
});

//PUT /api/productqty
products.put("/api/productqty", isLoggedIn, async (req, res) => {
  if (!validator.isInt(`${req.body.Dec_Qty}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid qty id, it must be positive` });
  }
  if (!validator.isInt(`${req.body.ID_Product}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid product id, it must be positive` });
  }

  const product = {
    ID_Product: req.body.ID_Product,
    Dec_Qty: req.body.Dec_Qty,
  };

  try {
    await dao.editQtyProductWeek(product);
  } catch (err) {
    res.status(503).json({
      error: `Database error during the put of bookingProduct: ${product}.`,
    });
  }

  //All went fine
  res.status(201).json(product);
});

products.put("/api/incrementProductQty", isLoggedIn, async (req, res) => {
  if (!validator.isInt(`${req.body.Inc_Qty}`, { min: 1 })) {
    return res.status(422).json({ error: `Invalid qty, it must be positive` });
  }
  if (!validator.isInt(`${req.body.ID_Product}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid product id, it must be positive` });
  }

  const product = {
    ID_Product: req.body.ID_Product,
    Inc_Qty: req.body.Inc_Qty,
  };
  let updatedProduct;
  try {
    updatedProduct = await dao.IncrementQtyProductWeek(product);
  } catch (err) {
    res.status(503).json({
      error: `Database error during incrementing product qty: ${product}.`,
    });
  }

  //All went fine
  res.status(200).json(updatedProduct);
});

//DELETE /api/products/{id}
products.delete("/api/products/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;
  if (!validator.isInt(id, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid product id, it must be positive` });
  }

  try {
    await dao.deleteProduct(id);
  } catch (err) {
    res.status(503).json({
      error: `Database error during the deletation of productId: ${id}.`,
    });
  }

  //All went fine
  res.status(204).json();
});

products.post("/api/bookingproducts", isLoggedIn, async (req, res) => {
  let problems = 0;
  if (
    req.body &&
    req.body.products &&
    req.body.products.length > 0 &&
    req.body.ID_Booking > 0
  ) {
    for (const i of req.body.products) {
      if (
        !i.id ||
        !i.quantity ||
        !validator.isInt(`${i.id}`, { min: 1 }) ||
        !validator.isInt(
          `${i.quantity}`,
          { min: 1 } || i.id <= 0 || id.qty <= 0
        )
      ) {
        return 1;
      }
      let bookingProduct = {
        ID_Booking: req.body.ID_Booking,
        ID_Product: i.id,
        Qty: i.quantity,
      };

      const product = {
        ID_Product: i.id,
        Dec_Qty: i.quantity,
      };

      try {
        await dao.createBookingProduct(bookingProduct);
        await dao.editQtyProductWeek(product);
        return true;
      } catch (err) {
        problems++;
      }
    }
  } else {
    return 1;
  }

  if (problems == 0) {
    //All went fine
    return true;
  } else {
    return problems;
  }
});

products.put("/api/bookingproducts", isLoggedIn, async (req, res) => {
  let problems = 0;
  if (
    req.body &&
    req.body.ID_Product &&
    req.body.ID_Booking > 0 &&
    req.body.quantity > 0
  ) {
    let bookingProduct = {
      ID_Booking: req.body.ID_Booking,
      ID_Product: req.body.ID_Product,
      Qty: req.body.quantity,
    };
    try {
      await dao.updateBookingProduct(bookingProduct);
    } catch (err) {
      return 1;
    }

    if (problems == 0) {
      //All went fine
      return 0;
    } else {
      return problems;
    }
  }
});

products.delete("/api/bookingProduct", isLoggedIn, async (req, res) => {
  if (!validator.isInt(`${req.body.ID_Product}`, { min: 1 })) {
    return 1;
  }
  if (!validator.isInt(`${req.body.ID_Booking}`, { min: 1 })) {
    return 1;
  }

  try {
    await dao.deleteBookingProduct(req.body.ID_Product, req.body.ID_Booking);
    await dao.IncrementQtyProductWeek(req.body.Inc_Qty, req.body.ID_Product);
    return 0;
  } catch (err) {
    return 2;
  }
});

module.exports = products;
