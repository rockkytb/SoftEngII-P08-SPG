// Integration tests for server.js

const dao = require("./dao");
const server = require("./server");
const app = server.server;
const switchTestMode = server.switchTestMode;
const bcrypt = require("bcrypt");
const request = require("supertest");

jest.useRealTimers();

describe("Test suite Integration Server", () => {
  beforeEach(async () => {
    // code to run before each test
    switchTestMode();
    await dao.cleanDb();
  });

  afterAll((done) => {
    //close the server
    app.close();
    done();
  });

  //TEST API POST BOOKING

  describe("Post booking fail", () => {
    it("create a new booking fails due to idClient = 0", async () => {
      const res = await request(app).post("/api/bookings").send({
        idClient: 0,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid client id, it must be positive"
      );
    });
  });

  describe("Post booking fail", () => {
    it("create a new booking fails due to idClient = -1", async () => {
      const res = await request(app).post("/api/bookings").send({
        idClient: -1,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid client id, it must be positive"
      );
    });
  });

  describe("Post booking success", () => {
    it("should create a new booking", async () => {
      const res = await request(app).post("/api/bookings").send({
        idClient: 1,
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("idBooking");
    });
  });

  //TEST CREATE BOOKING MODE API
  describe("Post booking mode success", () => {
    it("should create a new booking mode", async () => {
      const res = await request(app).post("/api/bookings_mode").send({
        idBooking: 100,
        delivery: 1,
        street: "via giovanni ribet",
        city: "turin",
        province: "TO",
        postal_code: "12345",
        country: "italy",
        date: "22/11/2021",
        time: "13:20",
        extra_fee: 24.5,
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("idBookingMode");
    });
  });

  //TEST update status of BOOKING MODE API
  describe("updating booking mode status success", () => {
    it("should update a booking mode status to PREPERATION", async () => {
      const res = await request(app).put(`/api/bookings_mode/2`).send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ bookingModeId: "2" });
    });
  });

  //TEST API POST NEW CLIENT
  describe("Post new client fail", () => {
    it("create a new client fails due to invalid email", async () => {
      const res = await request(app).post("/api/newclient").send({
        email: "antonio.bianchi@mail",
        name: "Antonio",
        surname: "Bianchi",
        //password:"$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty"
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("error", "Invalid client's email");
    });
  });

  describe("Post new client fail", () => {
    it("create a new client fails due to invalid name", async () => {
      const res = await request(app).post("/api/newclient").send({
        email: "antonio.bianchi@mail.it",
        name: "",
        surname: "Bianchi",
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("error", "Invalid client's name");
    });
  });

  describe("Post new client fail", () => {
    it("create a new client fails due to invalid surname", async () => {
      const res = await request(app).post("/api/newclient").send({
        email: "antonio.bianchi@mail.it",
        name: "Antonio",
        surname:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("error", "Invalid client's surname");
    });
  });

  describe("Post new client fail", () => {
    it("create a new client fails due to invalid password", async () => {
      let hash = "failure";
      const res = await request(app).post("/api/newclient").send({
        email: "antonio.bianchi@mail.it",
        name: "Antonio",
        surname: "Bianchi",
        password: hash,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid client's password hash"
      );
    });
  });

  describe("Post new client success", () => {
    it("create a new client success", async () => {
      const hash = bcrypt.hashSync("testpassword", 10);
      const res = await request(app).post("/api/newclient").send({
        email: "antonio.bianchi@mail.it",
        name: "Antonio",
        surname: "Bianchi",
        password: hash,
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("idClient", 2);
    });
  });

  describe("Get a wallet fail", () => {
    it("send a invalid id of client", async () => {
      const res = await request(app).post("/api/wallet").send({
        id: -1,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid booking id, it must be positive`
      );
    });
  });

  describe("Put a qty of a product", () => {
    it("send a invalid qty", async () => {
      const res = await request(app).put("/api/productqty").send({
        ID_Product: 3,
        Dec_Qty: -1,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid qty id, it must be positive`
      );
    });
  });

  describe("Put a qty of a product", () => {
    it("send a invalid id product", async () => {
      const res = await request(app).put("/api/productqty").send({
        ID_Product: -1,
        Dec_Qty: 2,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid product id, it must be positive`
      );
    });
  });

  describe("increment product qty", () => {
    it("send an invalid qty", async () => {
      const res = await request(app).put("/api/incrementProductQty").send({
        ID_Product: 3,
        Dec_Qty: -1,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid qty, it must be positive`
      );
    });
  });

  describe("increment product qty", () => {
    it("send an invalid id product", async () => {
      const res = await request(app).put("/api/incrementProductQty").send({
        ID_Product: -1,
        Inc_Qty: 2,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid product id, it must be positive`
      );
    });
  });

  describe("increment product qty", () => {
    it("send a valid request body", async () => {
      const res = await request(app).put("/api/incrementProductQty").send({
        ID_Product: 1,
        Inc_Qty: 2,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        ID: 1,
        NAME: "Mele",
        CATEGORY_ID: 1,
        PRICE: 14,
        QTY: 12,
        FARMER_ID: 1,
        STATE: "EXPECTED",
        SIZE: 1,
        UNIT_OF_MEASURE: "kg",
      });
    });
  });

  describe("delete a product", () => {
    it("send an invalid product id", async () => {
      const res = await request(app).delete("/api/products/-1").send();
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid product id, it must be positive`
      );
    });
  });

  //// test POST /api/farmers/:farmerid/products

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products success", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/products")
        .send(product);
      expect(res.statusCode).toEqual(201);
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong category id", async () => {
      const product = {
        name: "test",
        category: -1,
        price: 10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/products")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid category id, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong price", async () => {
      const product = {
        name: "test",
        category: 1,
        price: -10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/products")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid product price, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong farmer id", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: 1,
        farmerid: -1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/products")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid farmer id, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong quantity", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: -1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/products")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid quantity, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong quantity", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: -1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/products")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid size, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong unit of measure", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure:
          "kgkajdlajlfafaljfafljfdafladjfldfldjafladjfaljfaljflj",
      };

      const res = await request(app)
        .post("/api/farmers/1/products")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid unit of measure, it must be a string of max 15 length`
      );
    });
  }, 10000);

  //// test POST /api/farmers/:farmerid/products

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products success", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/productsExpected")
        .send(product);
      expect(res.statusCode).toEqual(201);
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong category id", async () => {
      const product = {
        name: "test",
        category: -1,
        price: 10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/productsExpected")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid category id, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong price", async () => {
      const product = {
        name: "test",
        category: 1,
        price: -10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/productsExpected")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid product price, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong farmer id", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: 1,
        farmerid: -1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/productsExpected")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid farmer id, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong quantity", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: -1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/productsExpected")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid quantity, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong quantity", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: -1,
        unit_of_measure: "kg",
      };

      const res = await request(app)
        .post("/api/farmers/1/productsExpected")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid size, it must be positive`
      );
    });
  }, 10000);

  describe("insert a product", () => {
    it("POST /api/farmers/:farmerid/products fail for wrong unit of measure", async () => {
      const product = {
        name: "test",
        category: 1,
        price: 10,
        qty: 1,
        farmerid: 1,
        state: "CONFIRMED",
        size: 1,
        unit_of_measure:
          "kgkajdlajlfafaljfafljfdafladjfldfldjafladjfaljfaljflj",
      };

      const res = await request(app)
        .post("/api/farmers/1/productsExpected")
        .send(product);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid unit of measure, it must be a string of max 15 length`
      );
    });
  }, 10000);

  ////
  describe("delete a product", () => {
    it("send a valid product id", async () => {
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

      let productId = await dao.insertTupleProductWEEK(product);
      const res = await request(app)
        .delete(`/api/products/${productId}`)
        .send();
      expect(res.statusCode).toEqual(204);
    });
  });

  describe("Put a row in the table BOOKING_PRODUCTS", () => {
    it("send a invalid Booking id", async () => {
      const res = await request(app)
        .post("/api/bookingproducts")
        .send({
          ID_Booking: -2,
          products: [
            { id: 1, quantity: 42 },
            { id: 2, quantity: 69 },
          ],
        });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("error", `Bad request`);
    });
  });

  describe("delete a booking product", () => {
    it("send a valid product id and booking id", async () => {
      let bookingProduct = {
        ID_Booking: 101,
        ID_Product: 121,
        Qty: 15,
      };
      // insert a test booking product
      dao.createBookingProduct(bookingProduct);
      const res = await request(app).delete(`/api/bookingProduct`).send({
        ID_Booking: 101,
        ID_Product: 121,
      });
      expect(res.statusCode).toEqual(204);
    });
  });

  describe("Put a row in the table BOOKING_PRODUCTS", () => {
    it("send a invalid product id", async () => {
      const res = await request(app)
        .post("/api/bookingproducts")
        .send({
          ID_Booking: 2,
          products: [
            { id: -1, quantity: 42 },
            { id: 2, quantity: 69 },
          ],
        });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("error", `Invalid product data`);
    });
  });

  describe("Put a row in the table BOOKING_PRODUCTS", () => {
    it("send a invalid qty", async () => {
      const res = await request(app)
        .post("/api/bookingproducts")
        .send({
          ID_Booking: 2,
          products: [
            { id: 1, quantity: -42 },
            { id: 2, quantity: 69 },
          ],
        });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("error", `Invalid product data`);
    });
  });

  //TEST POST /api/clientSession
  describe("Client Session success", () => {
    it("send a valid user", async () => {
      const res = await request(app).post("/api/clientSessions").send({
        username: "marco.bianchi@mail.it",
        password: "testpassword",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", `C1`);
      expect(res.body).toHaveProperty("name", `Marco`);
    });
  });

  describe("Client Session fails", () => {
    it("send a wrong psw", async () => {
      const res = await request(app).post("/api/clientSessions").send({
        username: "marco.bianchi@mail.it",
        password: "test",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty(
        "message",
        `Incorrect username and/or password`
      );
    });
  });

  //TEST GET /api/client
  describe("Get client by email success", () => {
    it("send a valid email", async () => {
      const res = await request(app).post("/api/client").send({
        email: "marco.bianchi@mail.it",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", `C1`);
    });
  });
  describe("Get client by email fails", () => {
    it("don't send an email", async () => {
      const res = await request(app).post("/api/client");
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("error", "Invalid email");
    });
  });

  describe("Get client by email fails", () => {
    it("send a wrong email", async () => {
      const res = await request(app).post("/api/client").send({
        email: "bianchi@mail.it",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty("id", -1);
    });
  });

  //TEST GET /api/clients
  describe("Get clients success", () => {
    it("ask the list of clients", async () => {
      const res = await request(app).get("/api/clients");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([
        {
          id: "C1",
          username: "marco.bianchi@mail.it",
          name: "Marco",
          surname: "Bianchi",
        },
      ]);
    });
  });

  //TEST PUT /api/clientsPreparation
  describe("Get clients preparation success", () => {
    it("ask the list of clients with products in preparation", async () => {
      const res = await request(app)
        .put("/api/clientsPreparation")
        .send([{ id: 2 }]);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual([
        {
          id: "C1",
          username: "marco.bianchi@mail.it",
          name: "Marco",
          surname: "Bianchi",
        },
      ]);
    });
  });

  //TEST GET /api/categories
  describe("Get categories success", () => {
    it("ask the list of categories", async () => {
      const res = await request(app).get("/api/categories");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([
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
    });
  });

  //TEST POST /api/farmerSession
  describe("Farmer Session success", () => {
    it("send a valid user", async () => {
      const res = await request(app).post("/api/farmerSessions").send({
        username: "antonio.bianchi@mail.it",
        password: "testpassword",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", `F1`);
    });
  });

  describe("Farmer Session fails", () => {
    it("send a wrong psw", async () => {
      const res = await request(app).post("/api/farmerSessions").send({
        username: "antonio.bianchi@mail.it",
        password: "test",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty(
        "message",
        `Incorrect username and/or password`
      );
    });
  });

  //TEST POST /api/shopEmployeeSessions
  describe("Shop Employee Session success", () => {
    it("send a valid user", async () => {
      const res = await request(app).post("/api/shopEmployeeSessions").send({
        username: "antonio.bianchi@mail.it",
        password: "testpassword",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", `S1`);
    });
  });

  describe("Shop Employee Session fails", () => {
    it("send a wrong psw", async () => {
      const res = await request(app).post("/api/shopEmployeeSessions").send({
        username: "antonio.bianchi@mail.it",
        password: "test",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty(
        "message",
        `Incorrect username and/or password`
      );
    });
  });

  //TEST POST /api/warehouseWorkerSession
  describe("Warehouse worker Session success", () => {
    it("send a valid user", async () => {
      const res = await request(app).post("/api/warehouseWorkerSessions").send({
        username: "antonio.bianchi@mail.it",
        password: "testpassword",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", `W1`);
    });
  });

  describe("Warehouse worker Session fails", () => {
    it("send a wrong psw", async () => {
      const res = await request(app).post("/api/warehouseWorkerSessions").send({
        username: "antonio.bianchi@mail.it",
        password: "test",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty(
        "message",
        `Incorrect username and/or password`
      );
    });
  });

  describe("get all products success", () => {
    it("test get api/products endpoint", async () => {
      const response = await request(app).get("/api/products");
      expect(response.body).toEqual([
        {
          id: 1,
          name: "Mele",
          category: "Fruit",
          price: 14.0,
          qty: 10,
          farmer_email: "antonio.bianchi@mail.it",
          size: 1,
          unit_of_measure: "kg",
        },
      ]);
      expect(response.body).toHaveLength(1);
      expect(response.statusCode).toBe(200);
    });
  });

  //TEST GET ALL all CONFIRMED products for a particular farmer
  describe("get all CONFIRMED products for a particular farmer success", () => {
    it("test //GET /api/products/farmers/:id success", async () => {
      const response = await request(app).get("/api/products/farmers/1");
      expect(response.body).toEqual([
        {
          id: 2,
          name: "Lamponi",
          category: "Fruit",
          price: 1.78,
          qty: 10,
          farmer_email: "antonio.bianchi@mail.it",
          size: 1,
          unit_of_measure: "g",
        },
      ]);
      expect(response.body).toHaveLength(1);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("get all CONFIRMED products for a particular farmer success", () => {
    it("test //GET /api/products/farmers/:id fail", async () => {
      const response = await request(app).get("/api/products/farmers/-1");

      expect(response.statusCode).toBe(422);
      expect(response.body).toHaveProperty(
        "error",
        `Invalid farmer id, it must be positive`
      );
    });
  });

  //test get /api/farmers/:farmerid/products_expected
  describe("get all products expected by farmer id success", () => {
    it("test get /api/farmers/:farmerid/products_expected endpoint fail", async () => {
      const response = await request(app).get(
        "/api/farmers/-1/products_expected"
      );
      expect(response.statusCode).toBe(422);
      expect(response.body).toHaveProperty(
        "error",
        `Invalid farmer id, it must be positive`
      );
    });
  });

  describe("get all products expected by farmer id success", () => {
    it("test get /api/farmers/:farmerid/products_expected endpoint", async () => {
      const response = await request(app).get(
        "/api/farmers/1/products_expected"
      );
      expect(response.body).toEqual([
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

      expect(response.body).toHaveLength(1);
      expect(response.statusCode).toBe(200);
    });
  });

  //POST /api/products/farmers/:id
  describe("get all confirmed products expected by farmer id success", () => {
    it("test get /api/products/farmers/1 endpoint", async () => {
      const response = await request(app).get("/api/products/farmers/1");
      expect(response.body).toEqual([
        {
          id: 2,
          name: "Lamponi",
          category: "Fruit",
          price: 1.78,
          qty: 10,
          farmer_email: "antonio.bianchi@mail.it",
          size: 1,
          unit_of_measure: "g",
        },
      ]);

      expect(response.body).toHaveLength(1);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("get all bookings success", () => {
    it("test get api/bookings endpoint", async () => {
      const response = await request(app).get("/api/bookings");
      expect(response.body).toEqual([
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
      ]);
      expect(response.body).toHaveLength(1);
      expect(response.statusCode).toBe(200);
    });
  });

  //test get  booking Modes Preparation
  describe("Get all the bookings from BOOKING_MODE with delivery = 0 and state = PREPARATION", () => {
    it("test GET /api/bookingModesPreparation", async () => {
      const response = await request(app).get("/api/bookingModesPreparation");
      expect(response.body).toEqual([
        {
          date: "2021-12-15",
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
          time: "18:07",
        },
      ]);
      expect(response.body).toHaveLength(1);
      expect(response.statusCode).toBe(200);
    });
  });

  //test GET /api/bookingModesNew/pickup
  describe("Get all the records from BOOKING_MODE table WHERE delivery = 0 and state = NEW", () => {
    it("test /api/bookingModesNew/pickup", async () => {
      const response = await request(app).get("/api/bookingModesNew/pickup");
      expect(response.body).toEqual([
        {
          idBooking: 2,
          idClient: 1,
          state: "BOOKED",
          date: "2021-12-15",
          time: "14:20",
        },
      ]);
      expect(response.body).toHaveLength(1);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("get all bookings for a client success", () => {
    it("test get api/bookings/clients/1 endpoint", async () => {
      const response = await request(app).get("/api/bookings/clients/1");
      expect(response.body).toEqual([
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
      ]);
      expect(response.body).toHaveLength(2);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("get all bookings for a non-existing client success", () => {
    it("test get api/bookings/clients/100 endpoint", async () => {
      const response = await request(app).get("/api/bookings/clients/100");
      expect(response.body).toEqual([]);
      expect(response.body).toHaveLength(0);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("update wallet balance fails", () => {
    it("send a negative balance amount", async () => {
      const res = await request(app).put("/api/walletbalance").send({
        Client_id: 1,
        New_Balance: -20.99,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid Balance Amount, it must be positive"
      );
    });
  });

  describe("update wallet balance fails", () => {
    it("send a client id which does not exist", async () => {
      const res = await request(app).put("/api/walletbalance").send({
        id: 110,
        amount: 20.99,
      });
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("err", "CLIENT NOT FOUND");
    });
  });

  describe("update wallet balance fails", () => {
    it(" do not send a client id ", async () => {
      const res = await request(app).put("/api/walletbalance").send({
        amount: 20.99,
      });
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("err", "CLIENT ID NOT PROVIDED");
    });
  });

  describe("update wallet balance success", () => {
    it("send a valid body", async () => {
      const res = await request(app).put("/api/walletbalance").send({
        id: 1,
        amount: 20.99,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("amount", 20.99);
    });
  });

  describe("edit the state of a booking", () => {
    it("send a invalid id booking", async () => {
      const res = await request(app).put("/api/bookingstate").send({
        id: 0,
        state: "PENDINGCANCELATION",
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid product id, it must be positive"
      );
    });
  });

  describe("edit the state of a booking", () => {
    it("send a valid body", async () => {
      const res = await request(app).put("/api/bookingstate").send({
        id: 1,
        state: "PENDINGCANCELATION",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(true);
    });
  });

  describe("get all bookings with PENDINGCANCELATION state", () => {
    it("test /api/bookingsPendingCancelation endpoint", async () => {
      const res = await request(app).get("/api/bookingsPendingCancelation");
      expect(res.body).toEqual([
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
      ]);
      expect(res.body).toHaveLength(2);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("post a vector of product expected", () => {
    it("test with a no valid body, without a name field", async () => {
      const res = await request(app)
        .post("/api/products_expected")
        .send([
          {
            category: 2,
            price: 1.99,
            qty: 2,
            farmer_id: 3,
          },
        ]);
      expect(res.statusCode).toEqual(503);
      expect(res.body).toHaveProperty(
        "error",
        "Database error during the post of ProductExpected"
      );
    });
  });

  /*
  //DA SISTEMARE LA CLEAN DB PER POTER RENDERE RIPETIBILE IL TEST
  describe("post a vector of product expected", () => {
    it("test with a valid body", async () => {
      const res = await request(app)
        .post("/api/products_expected")
        .send([
          {
            name: "Apple",
            category: 2,
            price: 1.99,
            qty: 2,
            farmer_id: 3,
          },
          {
            name: "Banana",
            category: 3,
            price: 3.99,
            qty: 6,
            farmer_id: 3,
          },
        ]);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveLength(2);
      /* expect(res.body).toEqual(
      [
        {
          id: 3,
          nameProduct: "Apple"
        },
        {
          id: 4,
          nameProduct: "Banana"
        }
      ]
    )
    });
  });
});
*/

  describe("Post ack success", () => {
    it("should create a new ack", async () => {
      const res = await request(app).post("/api/acknowledge").send({
        idFarmer: 1,
        email: "antonio.bianchiio@mail.it",
        state: "NEW",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("idAck");
    });
  });

  describe("get acks with state NEW success", () => {
    it("should retrieve a list of acks with state NEW", async () => {
      const res = await request(app).get("/api/acksNew");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([
        { id: 1, state: "NEW", farmer: "antonio.bianchi@mail.it", farmerId: 1 },
      ]);
    });
  });

  describe("Put products with new state", () => {
    it("right put with all right fields", async () => {
      const parameter = [
        {
          id: 1,
          state: "EXPECTED",
        },
        {
          id: 2,
          state: "CONFIRMED",
        },
      ];

      const res = await request(app).put("/api/products").send(parameter);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(true);
    });
  });

  describe("Put products with new state", () => {
    it("wrong put with a element without id field", async () => {
      const parameter = [
        {
          state: "EXPECTED",
        },
        {
          id: 2,
          state: "CONFIRMED",
        },
      ];

      const res = await request(app).put("/api/products").send(parameter);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid product id of a element on the array, it must be positive"
      );
    });
  });
  /* TEST NON FUNZIONANTE, NON RIESCE A VEDERE CHE MANCA IL CAMPO STATE E LA PRENDE PER BUONA
describe("Put products with new state", ()=>{
  it("wrong put with a element without state field", async () =>{
    const parameter = [
      {
        id: 1
      },
      {
        id: 2,
      }
    ];

    const res = await request(app).put("/api/products").send(parameter);
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("error", "Invalid state lenght of a element on the array");
  })*/

  describe("Put products with new state", () => {
    it("wrong put with a invalid id", async () => {
      const parameter = [
        {
          id: -1,
          state: "EXPECTED",
        },
        {
          id: 2,
        },
      ];

      const res = await request(app).put("/api/products").send(parameter);
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid product id of a element on the array, it must be positive"
      );
    });
  });

  /* describe("Put products with expected state", () => {
    it("valid put", async () => {
      const parameter = {
        name: "Apple",
        category: 2,
        price: 1.99,
        qty: 2,
      };

      const res = await request(app)
        .post("/api/farmers/1/productsExpected")
        .send(parameter);
      expect(res.statusCode).toEqual(201);
    });
  });*/

  describe("get all bookings of a client with the booked state", () => {
    it("get with a valid id", async () => {
      const result = {
        id_booking: 2,
        id_client: 1,
        state: "BOOKED",
      };

      const res = await request(app).get("/api/bookings/booked/clients/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([result]);
    });
  });
  describe("get all bookings of a client with the booked state", () => {
    it("get with a invalid id", async () => {
      const result = {
        id_booking: 2,
        id_client: 1,
        state: "BOOKED",
      };

      const res = await request(app).get("/api/bookings/booked/clients/0");
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid product id of a element on the array, it must be positive"
      );
    });
  });

  describe("get all products of a particular booking", () => {
    it("get with a valid id", async () => {
      const result = [
        {
          id_product: 1,
          name_product: "Mele",
          category: "Fruit",
          price: 14.0,
          qty_booking: 3,
          email: "antonio.bianchi@mail.it",
          state: "EXPECTED",
        },
        {
          category: "Fruit",
          email: "antonio.bianchi@mail.it",
          id_product: 2,
          name_product: "Lamponi",
          price: 1.78,
          qty_booking: 1,
          state: "CONFIRMED",
        },
      ];

      const res = await request(app).get("/api/bookingProducts/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(result);
    });
  });

  describe("get all products of a particular booking", () => {
    it("get with a invalid id", async () => {
      const res = await request(app).get("/api/bookingProducts/0");
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid product id of a element on the array, it must be positive"
      );
    });
  });
});
