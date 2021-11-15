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
        New_Qty: -1,
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
        New_Qty: 2,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid product id, it must be positive`
      );
    });
  });

  describe("Put a row in the table BOOKING_PRODUCTS", () => {
    it("send a invalid Booking id", async () => {
      const res = await request(app).post("/api/bookingproduct").send({
        ID_Booking: 0,
        ID_Product: 2,
        Qty: 3,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        "Invalid booking id, it must be positive"
      );
    });
  });

  describe("Put a row in the table BOOKING_PRODUCTS", () => {
    it("send a invalid product id", async () => {
      const res = await request(app).post("/api/bookingproduct").send({
        ID_Booking: 1,
        ID_Product: -1,
        Qty: 3,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid product id, it must be positive`
      );
    });
  });

  describe("Put a row in the table BOOKING_PRODUCTS", () => {
    it("send a invalid qty", async () => {
      const res = await request(app).post("/api/bookingproduct").send({
        ID_Booking: 1,
        ID_Product: 1,
        Qty: -1,
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty(
        "error",
        `Invalid qty id, it must be positive`
      );
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
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty("id", -1);
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

  //TEST GET /api/client
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

  describe("get all products success", () => {
    it("test get api/products endpoint", async () => {
      const response = await request(app).get("/api/products");
      expect(response.body).toEqual([
        {
          id: 1,
          name: "Mele",
          category: "Froit",
          price: 14,
          qty: 5,
          farmer_email: "antonio.bianchi@mail.it",
        },
      ]);
      expect(response.body).toHaveLength(1);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("get all bookings success", () => {
    it("test get api/bookings endpoint", async () => {
      const response = await request(app).get("/api/bookings");
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
<<<<<<< HEAD

  describe("edit the state of a booking", () => {
    it("send a invalid id booking", async () => {
      const res = await request(app).put("/api/bookingstate").send({
        ID_Booking: 0,
   	    New_State: "COMPLETED",
      });
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty("error" , "Invalid product id, it must be positive");
    });
  });  

  describe("edit the state of a booking", () => {
    it("send a valid body", async () => {
      const res = await request(app).put("/api/bookingstate").send({
        ID_Booking: 1,
   	    New_State: "COMPLETED",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty(true);
    });
  });  

=======
>>>>>>> 0df3fc8ceb17b5ec849a4cc51609178b4417d8e1
});
