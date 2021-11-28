const dao = require("./dao");
const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");
const { Result } = require("express-validator");

jest.useRealTimers();

describe("Test suite DAO", () => {
  beforeEach(async () => {
    // code to run before each test

    await dao.cleanDb();
  });

  //TEST DAO FUNCTION CREATE BOOKING
  test("the creation of a new booking fails because id client is missing", () => {
    const booking = {
      state: "BOOKED",
    };
    return expect(dao.createBooking(booking)).rejects.toHaveProperty(
      "errno",
      19
    );
  });

  test("the creation of a new booking fails because state is missing", () => {
    const booking = {
      idClient: 2,
    };
    return expect(dao.createBooking(booking)).rejects.toHaveProperty(
      "errno",
      19
    );
  });

  test("the creation of a new booking is done", () => {
    const booking = {
      idClient: 2,
      state: "BOOKED",
    };
    return expect(dao.createBooking(booking)).resolves.toBeGreaterThanOrEqual(
      1
    );
  });

  //TEST DAO FUNCTION CREATE CLIENT
  test("the creation of a new client fails because email is missing", () => {
    const hash = bcrypt.hashSync("testpassword", 10);
    const client = {
      name: "Antonio",
      surname: "Bianchi",
      password: hash,
    };
    return expect(dao.createClient(client)).rejects.toHaveProperty("errno", 19);
  });

  test("the creation of a new client fails because name is missing", () => {
    const hash = bcrypt.hashSync("testpassword", 10);
    const client = {
      email: "antonio.bianchi@mail.it",
      surname: "Bianchi",
      password: hash,
    };
    return expect(dao.createClient(client)).rejects.toHaveProperty("errno", 19);
  });

  test("the creation of a new client fails because surname is missing", () => {
    const hash = bcrypt.hashSync("testpassword", 10);
    const client = {
      email: "antonio.bianchi@mail.it",
      name: "Antonio",
      password: hash,
    };
    return expect(dao.createClient(client)).rejects.toHaveProperty("errno", 19);
  });

  test("the creation of a new client fails because password is missing", () => {
    const client = {
      email: "antonio.bianchi@mail.it",
      name: "Antonio",
      surname: "bianchi",
    };
    return expect(dao.createClient(client)).rejects.toHaveProperty("errno", 19);
  });

  test("the creation of a new client is done", () => {
    const hash = bcrypt.hashSync("testpassword", 10);
    const client = {
      email: "antonio.bianchi@mail.it",
      name: "Antonio",
      surname: "Bianchi",
      password: hash,
    };
    return expect(dao.createClient(client)).resolves.toBeGreaterThanOrEqual(1);
  });

  //TEST DAO FUNCTION GET CLIENT
  test("get client return false because no email provided", () => {
    return expect(dao.getClient()).resolves.toBe(false);
  });

  test("get client return false because no user with that email exists", () => {
    const email = "luca.bianchi@mail.it";
    return expect(dao.getClient(email, "testpassword")).resolves.toBe(false);
  });

  test("get client return false because wrong password", () => {
    //Create the user
    const hash = bcrypt.hashSync("testpassword", 10);
    const client = {
      email: "antonio.bianchi@mail.it",
      name: "Antonio",
      surname: "Bianchi",
      password: hash,
    };

    expect(dao.createClient(client)).resolves.toBeGreaterThanOrEqual(1);

    const email = "antonio.bianchi@mail.it";
    return expect(dao.getClient(email, "ciaociao")).resolves.toBe(false);
  }, 10000);

  test("get client return success", async () => {
    const email = "marco.bianchi@mail.it";
    return expect(dao.getClient(email, "testpassword")).resolves.toHaveProperty(
      "username",
      "marco.bianchi@mail.it"
    );
  }, 10000);

  //TEST DAO FUNCTION GET CLIENT BY EMAIL
  test("get client return -1 because no email provided", () => {
    return expect(dao.getClientByEmail()).resolves.toHaveProperty("id", -1);
  });

  test("get client return -1 because no user with that email exists", () => {
    const email = "luca.bianchi@mail.it";
    return expect(dao.getClientByEmail(email)).resolves.toHaveProperty(
      "id",
      -1
    );
  });

  test("get client return success", async () => {
    const email = "marco.bianchi@mail.it";
    return expect(dao.getClientByEmail(email)).resolves.toHaveProperty(
      "id",
      "C1"
    );
  }, 10000);

  //TEST DAO FUNCTION GET CLIENTS

  test("get client return success", async () => {
    return expect(dao.getClients()).resolves.toEqual([
      {
        id: "C1",
        username: "marco.bianchi@mail.it",
        name: "Marco",
        surname: "Bianchi",
      },
    ]);
  }, 10000);

  //TEST DAO FUNCTION GET CATEGORIES

  test("get categories return success", async () => {
    return expect(dao.getCategories()).resolves.toEqual([
      {
        id: "1",
        name: "Fruit",
        measure: "Kg",
      },
      {
        id: "2",
        name: "Spices",
        measure: "Box",
      },
      {
        id: "3",
        name: "Vegetables",
        measure: "Kg",
      },
    ]);
  }, 10000);

  //TEST GET CLIENT BY ID
  test("get client by id return false because no user with that id exists", () => {
    const id = 12;
    return expect(dao.getClientById(id)).resolves.toBe(false);
  });

  test("get client by id return success", async () => {
    return expect(dao.getClientById(1)).resolves.toHaveProperty(
      "username",
      "marco.bianchi@mail.it"
    );
  }, 10000);

  //TEST GET products expected by farmer id
  test("get products expected by farmer id return empty array because no farmer with that id exists", () => {
    const id = 12;
    return expect(dao.getAllProductsExpectedForFarmer(id)).resolves.toEqual([]);
  });

  test("get products expected by farmer return success", async () => {
    return expect(dao.getAllProductsExpectedForFarmer(1)).resolves.toEqual([
      {
        id: 1,
        name: "Mele",
        category: "Fruit",
        price: 14,
        qty: 5,
        farmer_email: "antonio.bianchi@mail.it",
        state: "EXPECTED",
      },
    ]);
  }, 10000);

  //TEST GET FARMER
  test("get farmer return false because no email provided", () => {
    return expect(dao.getFarmer()).resolves.toBe(false);
  });

  test("get farmer return false because no user with that email exists", () => {
    const email = "marco.bianchi@mail.it";
    return expect(dao.getFarmer(email, "testpassword")).resolves.toBe(false);
  });

  test("get farmer return false because wrong psw", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(dao.getFarmer(email, "testp")).resolves.toBe(false);
  }, 10000);

  test("get farmer return success", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(dao.getFarmer(email, "testpassword")).resolves.toHaveProperty(
      "id",
      "F1"
    );
  }, 10000);

  //TEST GET FARMER BY ID
  test("get farmer by id return false because no farmer with that id exists", () => {
    const id = 12;
    return expect(dao.getFarmerById(id)).resolves.toBe(false);
  });

  test("get farmer by id return a farmer", async () => {
    const id = 1;

    return expect(dao.getFarmerById(id)).resolves.toHaveProperty("id", "F1");
  }, 10000);

  //TEST GET SHOP EMPLOYEE
  test("get shop employee return false because no email provided", () => {
    return expect(dao.getShopEmployee()).resolves.toBe(false);
  });

  test("get shop employee return false because no user with that email exists", () => {
    const email = "marco.bianchi@mail.it";
    return expect(dao.getShopEmployee(email, "testpassword")).resolves.toBe(
      false
    );
  });

  test("get shop employee return false because wrong psw", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(dao.getShopEmployee(email, "testp")).resolves.toBe(false);
  }, 10000);

  test("get shop employee return success", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(
      dao.getShopEmployee(email, "testpassword")
    ).resolves.toHaveProperty("id", "S1");
  }, 10000);

  //TEST GET SHOP EMPLOYEE BY ID
  test("get shop employee by id return false because no shop employee with that id exists", () => {
    const id = 12;
    return expect(dao.getShopEmployeeById(id)).resolves.toBe(false);
  });

  test("get shop employee by id return a shop employee", async () => {
    const id = 1;

    return expect(dao.getShopEmployeeById(id)).resolves.toHaveProperty(
      "id",
      "S1"
    );
  }, 10000);
});

//TEST GET ALL PRODUCTS
test("get all products success", async () => {
  const result = [
    {
      id: 1,
      name: "Mele",
      category: "Fruit",
      price: 14,
      qty: 5,
      farmer_email: "antonio.bianchi@mail.it",
    },
  ];

  return expect(dao.getAllProducts()).resolves.toEqual(result);
}, 10000);

//TEST GET ALL BOOKINGS
test("get all bookings success", async () => {
  //the booking table was cleared before running this test so I had to add a record into it manually.

  const received = {
    id: 1,
    state: "PENDINGCANCELATION",
    email: "marco.bianchi@mail.it",
    name: "Marco",
    surname: "Bianchi",
    qty: 3,
    product: "Mele",
  };

  return expect(dao.getAllBookings()).resolves.toEqual([received]);
}, 10000);

// TEST GET BOOKINGS FOR A PARTICULAR CLIENT
test("get all bookings for a client success", async () => {
  const received = {
    id: 1,
    state: "PENDINGCANCELATION",
    email: "marco.bianchi@mail.it",
    name: "Marco",
    surname: "Bianchi",
    qty: 3,
    product: "Mele",
  };

  return expect(dao.getAllBookingsForClient(1)).resolves.toEqual([received]);
}, 10000);

test("get all bookings for a non-existing client success", () => {
  return expect(dao.getAllBookingsForClient(100)).resolves.toEqual([]);
});

//TEST UPDATE WALLET BALANCE
test("updating the wallet failed bacause client was not found", () => {
  const wallet = {
    id: 200,
    amount: 120.99,
  };
  return expect(dao.updateWallet(wallet)).rejects.toHaveProperty(
    "err",
    "CLIENT NOT FOUND"
  );
});

test("updating the wallet failed bacause client id was not provided", () => {
  const wallet = {
    amount: 120.99,
  };
  return expect(dao.updateWallet(wallet)).rejects.toHaveProperty(
    "err",
    "CLIENT ID NOT PROVIDED"
  );
});

test("update of wallet balance was successfull", () => {
  const wallet = {
    id: 1,
    amount: 120.99,
  };
  return expect(dao.updateWallet(wallet)).resolves.toEqual({
    id: 1,
    amount: 120.99,
  });
});

//TEST CREATE WALLET
test("Creation of wallet with balance= 0.0 was successfull", () => {
  return expect(dao.createWallet(2)).resolves.toEqual(true);
});

test("Creation of wallet fails,id 1 already exists", () => {
  return expect(dao.createWallet(1)).rejects.toEqual(false);
});

//TEST EDIT STATE OF BOOKING

test("Edit the state of a booking with a valid request", () => {
  const booking = {
    id: 1,
    state: "PENDINGCANCELATION",
  };
  return expect(dao.editStateBooking(booking)).resolves.toEqual(true);
});

//TEST CREATE BOOKING-PRODUCT
test("create a row in the booking product table", () => {
  const bookingProduct = {
    ID_Booking: 2,
    ID_Product: 2,
    Qty: 3,
  };
  return expect(dao.createBookingProduct(bookingProduct)).resolves.toEqual(
    true
  );
});

//TEST GET ALL BOOKINGS WITH PENDINGCANCELATION STATE
test("get all bookings with pendingcancelation state", async () => {
  const received = [
    {
      id: 1,
      state: "PENDINGCANCELATION",
      email: "marco.bianchi@mail.it",
      name: "Marco",
      surname: "Bianchi",
      qty: 3,
      product: "Mele",
    },
  ];

  return expect(dao.getBookingsStatePendingCancelation()).resolves.toEqual(
    received
  );
}, 10000);

test("Insert a new Product expected without a field category", () => {
  const parameter = {
    name: "Apple",
    price: 1.99,
    qty: 2,
    farmer_id: 3,
  };
  return expect(dao.insertTupleProductExpected(parameter)).rejects.toEqual(
    false
  );
});
/*
//sistemare clear DB per poter rendere il test ripetibile
test("Insert a new Product expected", () => {
  const parameter = {
    name: "Apple",
    category: 2,
    price: 1.99,
    qty: 2,
    farmer_id: 3,
  };
  return expect(dao.insertTupleProductExpected(parameter)).resolves.toEqual(11);
});*/

test("edit state of a product receiving an array with id-state", () => {
  const parameter = {
    id: 1,
    state: "EXPECTED",
  };
  return expect(dao.editStateProductWeek(parameter)).resolves.toEqual(true);
});

//Test create Acknowledge
test("the creation of ack success", () => {
  const ack = {
    idFarmer: 1,
    email: "antonio.bianchii@mail.it",
    state: "NEW",
  };
  return expect(dao.createAcknowledge(ack)).resolves.toEqual(2);
});
