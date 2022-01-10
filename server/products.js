//File for managing products
"use strict";

const express = require("express");
const products = express.Router();
const dao = require("./dao");
const validator = require("validator");
const sessions = require("./session.js")

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

//GET /api/categories/
products.get("/api/categories", isLoggedIn, (req, res) => {
  dao
    .getCategories()
    .then((categories) => {
      return res.status(200).json(categories);
    })
    .catch((err) => {
      return res.status(500).json({
        errors: `Database errors: ${err}.`,
      });
    });
});

products.get("/api/products", (req, res) => {
  dao
    .getAllProducts()
    .then((product) => {
      return res.status(200).json(product);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

products.put("/api/products", isLoggedIn, async (req, res) => {
  if (!validator.isLength(`${req.body.state}`, { min: 1})) {
    return res.status(422).json({ error: "state not allowed" });
  }
  if (!validator.isInt(`${req.body.id}`, { min: 1 })) {
    return res.status(422).json({ error: "invalid id" });
  }

  const product = {
    id: req.body.id,
    state: req.body.state,
  };

  try {
    await dao.editStateProductWeek(product);
    return res.status(201).json();
  } catch (err) {
    return res.status(503).json({ error: "db error" });
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
    return res.status(201).json();
  } catch (err) {
    return res.status(503).json({
      error: `Database error during the put of bookingProduct: ${product}.`,
    });
  }

  //All went fine
  
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
    return res.status(201).json();
  } catch (err) {
    return res.status(503).json({
      error: `Database error during incrementing product qty: ${product}.`,
    });
  }

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
    return res.status(201).json();
  } catch (err) {
    return res.status(503).json({
      error: `Database error during the deletation of productId: ${id}.`,
    });
  }

});

///GET /api/bookingProducts/:bookingId
products.get("/api/bookingProducts/:bookingId", isLoggedIn, (req, res) => {
  const id = req.params.bookingId;
  console.log(req.params.bookingId);
  if (!validator.isInt(`${req.params.bookingId}`, { min: 1 })) {
    return res.status(422).json({
      error: `Invalid product id of a element on the array, it must be positive`,
    });
  }

  dao
    .productsOfBooking(id)
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((error) => {
      return res.status(503).json(error);
    });
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
        return res.status(422).json({ error: "bad request" });
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
      } catch (err) {
        problems++;
      }
    }
  } else {
    return res.status(422).json({ error: "bad request" });
  }

  if (problems == 0) {
    //All went fine
    return res.status(201).json();
  } else {
    return res.status(503).json({error: "db errors"});
  }
});

products.put("/api/bookingproducts", isLoggedIn, async (req, res) => {

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
      return res.status(201).json({ error: "state not allowed" });
    } catch (err) {
      return res.status(503).json({ error: "db error" });
    }
  }
});

products.delete("/api/bookingProduct", isLoggedIn, async (req, res) => {
  if (!validator.isInt(`${req.body.ID_Product}`, { min: 1 })) {
    return res.status(422).json({ error: "bad request" });
  }
  if (!validator.isInt(`${req.body.ID_Booking}`, { min: 1 })) {
    return res.status(422).json({ error: "bad request" });
  }

  try {
    await dao.deleteBookingProduct(req.body.ID_Product, req.body.ID_Booking);
    await dao.IncrementQtyProductWeek(req.body.Inc_Qty, req.body.ID_Product);
    return res.status(201).json();
  } catch (err) {
    return res.status(503).json({ error: "db error" });
  }
});

//GET /api/products/farmers/:id to get a list of all CONFIRMED products for a particular farmer
products.get("/api/products/farmers/:id", isLoggedIn, (req, res) => {
  if (!validator.isInt(`${req.params.id}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid farmer id, it must be positive` });
  }
  const id = req.params.id;
  dao
    .getAllProductsConfirmedForFarmer(id)
    .then((product) => {
      return res.status(201).json(product);
    })
    .catch((error) => {
      return res.status(503).json(error);
    });
});

//GET /api/farmers/:farmerid/products_expected to get a list of all products
products.get("/api/farmers/:farmerid/products_expected", isLoggedIn, (req, res) => {
  if (!validator.isInt(`${req.params.farmerid}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid farmer id, it must be positive` });
  }

  dao
    .getAllProductsExpectedForFarmer(req.params.farmerid)
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

products.post("/api/products_expected", isLoggedIn, async (req, res) => {
  var idProduct;
  var results = [];
  var problem = 0;
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      //do something with e.g. req.body[key]
      try {
        idProduct = await dao.insertTupleProductExpected(req.body[key]);
      } catch (err) {
        problem = 1;
        break;
      }
      const product = {
        id: idProduct,
        nameProduct: req.body[key].name,
      };
      results.push(product);
    }
  }
  if (problem == 0) {
    //All went fine
    return res.status(201).json();
  } else {
    return res.status(503).json({
      error: `Database error during the post of ProductExpected`,
    });
  }
});

// POST /api/farmers/:farmerid/products
products.post("/api/farmers/:farmerid/products", isLoggedIn, async (req, res) => {
  if (!validator.isInt(`${req.body.category}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid category id, it must be positive` });
  }
  if (!validator.isFloat(`${req.body.price}`, { min: 0 })) {
    return res
      .status(422)
      .json({ error: `Invalid product price, it must be positive` });
  }
  if (!validator.isInt(`${req.body.farmerid}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid farmer id, it must be positive` });
  }
  if (!validator.isInt(`${req.body.qty}`, { min: 1 })) {
    return res
      .status(422)
      .json({ error: `Invalid quantity, it must be positive` });
  }
  if (!validator.isInt(`${req.body.size}`, { min: 1 })) {
    return res.status(422).json({ error: `Invalid size, it must be positive` });
  }
  if (!validator.isLength(`${req.body.unit_of_measure}`, { max: 15 })) {
    return res.status(422).json({
      error: `Invalid unit of measure, it must be a string of max 15 length`,
    });
  }
  const product = {
    name: `${req.body.name}`,
    category_id: req.body.category,
    price: req.body.price,
    qty: req.body.qty,
    farmer_id: req.params.farmerid,
    state: "CONFIRMED",
    size: req.body.size,
    unit_of_measure: `${req.body.unit_of_measure}`,
  };

  let productId;

  try {
    productId = await dao.insertTupleProductWEEK(product);
    res.status(201).json({ productId: productId });
  } catch (err) {
    res.status(503).json({
      error: `Database error during insertion into product_week table.`,
    });
  }
});

// POST /api/farmers/:farmerid/productsExpected receive a vector of tuples of products expected
products.post(
  "/api/farmers/:farmerid/productsExpected",
  isLoggedIn,
  async (req, res) => {
    if (!validator.isInt(`${req.body.category}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid category id, it must be positive` });
    }
    if (!validator.isFloat(`${req.body.price}`, { min: 0 })) {
      return res
        .status(422)
        .json({ error: `Invalid product price, it must be positive` });
    }
    if (!validator.isInt(`${req.body.farmerid}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid farmer id, it must be positive` });
    }
    if (!validator.isInt(`${req.body.qty}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid quantity, it must be positive` });
    }
    if (!validator.isInt(`${req.body.size}`, { min: 1 })) {
      return res
        .status(422)
        .json({ error: `Invalid size, it must be positive` });
    }
    if (!validator.isLength(`${req.body.unit_of_measure}`, { max: 15 })) {
      return res.status(422).json({
        error: `Invalid unit of measure, it must be a string of max 15 length`,
      });
    }
    const product = {
      name: req.body.name,
      category_id: req.body.category,
      price: req.body.price,
      qty: req.body.qty,
      farmer_id: req.params.farmerid,
      state: "EXPECTED",
      size: req.body.size,
      unit_of_measure: req.body.unit_of_measure,
    };

    let productId;

    try {
      productId = await dao.insertTupleProductWEEK(product);
      return res.status(201).json();
    } catch (err) {
      return res.status(503).json({
        error: `Database error during insertion into product_week table.`,
      });
    }

    //All went fine
    
  }
);


exports.products = products;
exports.switchTestMode = switchTestMode;