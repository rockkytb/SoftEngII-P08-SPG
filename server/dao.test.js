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

  //TEST DAO FUNCTION GET BOOKING
  test("the get of a booking fails because id booking is missing", ()=>{
    return expect(dao.getBooking()).resolves.toBe(false);
  });

  test("the get of a booking is done", ()=>{
    return expect(dao.getBooking(1)).resolves.toHaveProperty(
      "id", 
      1 
    );
  });

  //TEST DAO FUNCTION GET WALLET
  test("the get of the wallet of a client fails because id client is missing", ()=>{
    return expect(dao.getWallet()).resolves.toBe(false);
  });

  test("the get of the wallet of a client is done", ()=>{
    return expect(dao.getWallet(1)).resolves.toHaveProperty(
      "balance", 
      20.99 
    );
  });

  //TEST DAO FUNCTION GET BOOKING UNRETRIEVED
  test("the get of the booking unretrieved is done", ()=>{
    return expect(dao.getBookingsUnretrieved()).resolves.toEqual(
      [{
      end_date: "2022-01-09",
      idBooking: 1,
      idClient: 1,
      products:[
          {
            product: "Mele",
            productID: 1, 
            qty: 3
          }, 
          {
            product: "Lamponi",
            productID: 2, 
            qty: 1
          }
        ]
      }]
    );
  });

  //

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
      phone: "3331231212"
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
      phone: "3331231212"
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
    return expect(dao.getClientByEmail()).resolves.toEqual(-1);
  });

  test("get client return -1 because no user with that email exists", () => {
    const email = "luca.bianchi@mail.it";
    return expect(dao.getClientByEmail(email)).resolves.toEqual(-1);
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
        phone: "3331231212"
      },
    ]);
  }, 10000);

  // TEST GET CLIENTSPREPARATION

  test("get clients preparation return success", async () => {
    return expect(dao.getClientsPreparation(2)).resolves.toEqual([
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
      },
      {
        id: "2",
        name: "Spices",
      },
      {
        id: "3",
        name: "Vegetables",
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
        qty: 10,
        farmer_email: "antonio.bianchi@mail.it",
        state: "EXPECTED",
        size: 1,
        unit_of_measure: "kg",
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

  //TEST GET Manager
  test("get manager return false because no email provided", () => {
    return expect(dao.getManager()).resolves.toBe(false);
  });

  test("get manager return false because no user with that email exists", () => {
    const email = "marco.bianchi@mail.it";
    return expect(dao.getManager(email, "testpassword")).resolves.toBe(
      false
    );
  });

  test("get manager return false because wrong psw", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(dao.getManager(email, "testp")).resolves.toBe(false);
  }, 10000);

  test("getManager return success", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(
      dao.getManager(email, "testpassword")
    ).resolves.toHaveProperty("id", "A1");
  }, 10000);

  //TEST GET WH Manager
  test("get wh manager return false because no email provided", () => {
    return expect(dao.getWarehouseManager()).resolves.toBe(false);
  });

  test("get wh manager return false because no user with that email exists", () => {
    const email = "marco.bianchi@mail.it";
    return expect(dao.getWarehouseManager(email, "testpassword")).resolves.toBe(
      false
    );
  });

  test("get wh manager return false because wrong psw", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(dao.getWarehouseManager(email, "testp")).resolves.toBe(false);
  }, 10000);

  test("get wh Manager return success", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(
      dao.getWarehouseManager(email, "testpassword")
    ).resolves.toHaveProperty("id", "M1");
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

  //TEST GET WAREHOUSE MANAGER BY ID
  test("get warehouse manager by id return false because no wh manager with that id exists", () => {
    const id = 12;
    return expect(dao.getWarehouseManagerById(id)).resolves.toBe(false);
  });

  test("get warehouse manager by id return a warehouse manager", async () => {
    const id = 1;

    return expect(dao.getWarehouseManagerById(id)).resolves.toHaveProperty(
      "id",
      "M1"
    );
  }, 10000);

  //TEST GET MANAGER BY ID
  test("get manager by id return false because no manager with that id exists", () => {
    const id = 12;
    return expect(dao.getManagerById(id)).resolves.toBe(false);
  });

  test("get manager by id return a manager", async () => {
    const id = 1;

    return expect(dao.getManagerById(id)).resolves.toHaveProperty(
      "id",
      "A1"
    );
  }, 10000);

  

  //TEST GET WAREHOUSE WORKER BY ID
  test("get warehouse worker by id return false because no shop worker with that id exists", () => {
    const id = 12;
    return expect(dao.getWarehouseWorkerById(id)).resolves.toBe(false);
  });

  test("get shop employee by id return a warehouse worker", async () => {
    const id = 1;

    return expect(dao.getWarehouseWorkerById(id)).resolves.toHaveProperty(
      "id",
      "W1"
    );
  }, 10000);

  //TEST GET WAREHOUSE WORKER
  test("get warehouse worker return false because no email provided", () => {
    return expect(dao.getWarehouseWorker()).resolves.toBe(false);
  });

  test("get warehouse worker return false because no user with that email exists", () => {
    const email = "marco.bianchi@mail.it";
    return expect(dao.getWarehouseWorker(email, "testpassword")).resolves.toBe(
      false
    );
  });

  test("get warehouse worker return false because wrong psw", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(dao.getWarehouseWorker(email, "testp")).resolves.toBe(false);
  }, 10000);

  test("get warehouse worker return success", () => {
    const email = "antonio.bianchi@mail.it";
    return expect(
      dao.getWarehouseWorker(email, "testpassword")
    ).resolves.toHaveProperty("id", "W1");
  }, 10000);


//TEST GET ALL PRODUCTS
test("get all products success", async () => {
  const result = [
    {
      id: 1,
      name: "Mele",
      category: "Fruit",
      price: 14,
      qty: 10,
      farmer_email: "antonio.bianchi@mail.it",
      size: 1,
      unit_of_measure: "kg",
    },
  ];

  return expect(dao.getAllProducts()).resolves.toEqual(result);
}, 10000);

//TEST GET ALL all CONFIRMED products for a particular farmer
test("get all all CONFIRMED products for a particular farmer success", async () => {
  const result = [
    {
      id: 2,
      name: "Lamponi",
      category: "Fruit",
      farmer_email: "antonio.bianchi@mail.it",
      price: 1.78,
      qty: 20,
      size: 1,
      unit_of_measure: "g",
    },
  ];

  return expect(dao.getAllProductsConfirmedForFarmer(1)).resolves.toEqual(
    result
  );
}, 10000);

//TEST GET ALL BOOKINGS
test("get all bookings success", async () => {
  //the booking table was cleared before running this test so I had to add a record into it manually.

  const received = [
    {
      id: 1,
      state: "PENDINGCANCELATION",
      email: "marco.bianchi@mail.it",
      name: "Marco",
      surname: "Bianchi",
      products: [
        { qty: 3, productID: 1, product: "Mele" },
        { product: "Lamponi", productID: 2, qty: 1 },
      ],
    },
  ];

  return expect(dao.getAllBookings()).resolves.toEqual(received);
}, 10000);

//TEST GET /api/bookingModesPreparation
test("get all bookings modes in preparation success", async () => {
  const received = [
    {
      date: "2022-01-12",
      email: "marco.bianchi@mail.it",
      id: 1,
      name: "Marco",
      products: [
        {
          product: "Mele",
          productID: 1,
          qty: 3,
        },
        {
          product: "Lamponi",
          productID: 2,
          qty: 1,
        }
      ],
      state: "PENDINGCANCELATION",
      surname: "Bianchi",
      time: "11:11",
    },
  ];
  return expect(dao.getbookingModesPreparation()).resolves.toEqual(received);
}, 10000);

//TEST GET /api/bookingModesNew/pickup
test("get all the records from BOOKING_MODE table WHERE delivery = 0 and state = NEW", async () => {
  const received = [
    {
      idBooking: 2,
      idClient: 1,
      date: "2022-01-12",
      state: "BOOKED",
      time: "12:12",
    },
  ];
  return expect(dao.getbookingModesNewPickup()).resolves.toEqual(received);
}, 10000);

// TEST GET BOOKINGS FOR A PARTICULAR CLIENT
test("get all bookings for a client success", async () => {
  const received = [
    {
      id: 1,
      state: "PENDINGCANCELATION",
      email: "marco.bianchi@mail.it",
      name: "Marco",
      surname: "Bianchi",
      products: [
        {
          category: "Fruit",
          email: "antonio.bianchi@mail.it",
          id_product: 1,
          price: 14,
          product: "Mele",
          qty: 3,
          state: "EXPECTED",
        },
        {
          category: "Fruit",
          email: "antonio.bianchi@mail.it",
          id_product: 2,
          price: 1.78,
          product: "Lamponi",
          qty: 1,
          state: "CONFIRMED",
        },
      ],
    },
    {
      email: "marco.bianchi@mail.it",
      id: 2,
      name: "Marco",
      products: [],
      state: "BOOKED",
      surname: "Bianchi",
    },
  ];

  return expect(dao.getAllBookingsForClient(1)).resolves.toEqual(received);
}, 10000);

test("get all bookings for a non-existing client success", () => {
  return expect(dao.getAllBookingsForClient(100)).resolves.toEqual([]);
});

//TEST CREATING NEW BOOKING MODE
test("the creation of a new booking mode success", () => {
  const booking = {
    idBooking: 9,
    delivery: 1,
    street: "via giovanni ribet",
    city: "turin",
    province: "TO",
    postal_code: "12345",
    country: "italy",
    date: "22/11/2021",
    time: "13:20",
    extra_fee: 24.5,
  };
  return expect(dao.createBookingMode(booking)).resolves.toBeGreaterThanOrEqual(
    1
  );
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
  return expect(dao.createBookingProduct(bookingProduct)).resolves.toEqual(3);
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
    {
      email: "marco.bianchi@mail.it",
      id: 1,
      name: "Marco",
      product: "Lamponi",
      qty: 1,
      state: "PENDINGCANCELATION",
      surname: "Bianchi",
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

// INSERT into Product_WEEK by receiving a product confirmed by farmer with state = CONFIRMED
test("INSERT into Product_WEEK by receiving a product confirmed by farmer with state = CONFIRMED success", () => {
  const parameter = {
    name: "Apple",
    category_id: 2,
    price: 1.99,
    qty: 2,
    farmer_id: "1",
    state: "CONFIRMED",
    size: 1,
    unit_of_measure: "kg",
  };
  return expect(
    dao.insertTupleProductWEEK(parameter)
  ).resolves.toBeGreaterThanOrEqual(1);
});

test("edit state of a product receiving an array with id-state", () => {
  const parameter = {
    id: 1,
    state: "EXPECTED",
  };
  return expect(dao.editStateProductWeek(parameter)).resolves.toEqual(true);
});

test("increment qty of a product success", async () => {
 const product = {
    ID_Product: 1,
    Inc_Qty: 2,
  };
  expect(dao.IncrementQtyProductWeek(product)).resolves.toEqual(true);
}, 10000);

test("delete a product with a given id success", () => {
  const product = {
    name: "test",
    category_id: 1,
    price: 10,
    qty: 1,
    farmer_id: 1,
    state: "CONFIRMED",
    size: 1,
    unit_of_measure: "kg",
  };
  // insert a test product
  let productId = dao.insertTupleProductWEEK(product);

  expect(dao.deleteProduct(productId)).resolves.toBe(true);
});

test("delete a booking product success", () => {
  let bookingProduct = {
    ID_Booking: 100,
    ID_Product: 120,
    Qty: 15,
  };
  // insert a test booking product
  dao.createBookingProduct(bookingProduct);

  expect(
    dao.deleteBookingProduct({
      ID_Booking: 100,
      ID_Product: 120,
    })
  ).resolves.toBe(true);
});

//Test get all acks with NEW state
test("get all acks with NEW state success", () => {
  return expect(dao.getAcksStateNew()).resolves.toEqual([
    { id: 1, state: "NEW", farmer: "antonio.bianchi@mail.it", farmerId: 1 },
  ]);
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

//test getAllBookingsForClientBooked
test("get all bookings for a particular client with the booked state ", () => {
  const id = 1;
  const result = [
    {
      id_booking: 2,
      id_client: 1,
      state: "BOOKED",
    },
  ];
  return expect(dao.getAllBookingsForClientBooked(id)).resolves.toEqual(result);
});

//test productsOfBooking
test("GET all the product associated to a particular booking", () => {
  const id = 1;
  const result = [
    {
      id_product: 1,
      product: "Mele",
      category: "Fruit",
      price: 14.0,
      qty: 3,
      email: "antonio.bianchi@mail.it",
      state: "EXPECTED",
    },
    {
      id_product: 2,
      product: "Lamponi",
      category: "Fruit",
      price: 1.78,
      qty: 1,
      email: "antonio.bianchi@mail.it",
      state: "CONFIRMED",
    },
  ];
  return expect(dao.productsOfBooking(id)).resolves.toEqual(result);
});

  // test counting missed pickups for a customer
  test("get missed pickups total count for a customer ", async () => {

    const received =
    {
      "total": 0
    }

    return expect(dao.countMissedPickupsForACustomer(1)).resolves.toEqual(received);
  }, 10000);

    // test find clientId with bookingId
    test("find a client id given the his booking id", async () => {

      const received =
      {
        "id": 1
      }
  
      return expect(dao.findClientbyBooking(1)).resolves.toEqual(received);
    }, 10000);

  // update a client missedcount number
  test("updating the client missedcount number", () => {
    const response = { "id": 1, "missedCount": 1 }
    return expect(dao.updateClientMissedCount(1, 1)).resolves.toEqual(response);
  });

  // update a client suspension Date
  test("updating the client  suspension Date", () => {
    const response = { "id": 1, "suspensionDate": "2022-01-01" }
    return expect(dao.updateClientSusspensionDate(1, "2022-01-01")).resolves.toEqual(response);
  });

});
