//File for managing products
"use strict";

const dao = require("./dao");
const validator = require("validator");

exports.postBookingProducts = async (req) => {
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
        return res.status(422).json({ error: `Invalid product data` });
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
};

exports.putBookingProduct = async (req) => {
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
};

exports.putProductsState = async (req) => {
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
};

exports.deleteBookingProducts = async (req) => {
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
};
