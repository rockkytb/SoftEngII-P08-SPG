// Integration tests for server.js

const dao = require('./dao');
const app = require('./server');
const bcrypt = require('bcrypt');
const request = require("supertest");


jest.useRealTimers();

describe('Test suite DAO', () => {
    beforeEach( async () => {
       // code to run before each test
    
       await dao.cleanDb();
       
    });

    afterAll(done => {
      //close the server
      app.close();
      done();
    });

    //TEST API POST BOOKING

    describe('Post booking fail', () => {
      it('create a new booking fails due to idClient = 0', async () => {
        const res = await request(app)
          .post('/api/bookings')
          .send({
            idClient: 0
          })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('error','Invalid client id, it must be positive');
      })
    })

    describe('Post booking fail', () => {
      it('create a new booking fails due to idClient = -1', async () => {
        const res = await request(app)
          .post('/api/bookings')
          .send({
            idClient: -1
          })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('error','Invalid client id, it must be positive');
      })
    })

    describe('Post booking success', () => {
        it('should create a new booking', async () => {
          const res = await request(app)
            .post('/api/bookings')
            .send({
              idClient: 1
            })
          expect(res.statusCode).toEqual(201);
          expect(res.body).toHaveProperty('idBooking');
        })
      })

    //TEST API POST NEW CLIENT
    describe('Post new client fail', () => {
      it('create a new client fails due to invalid email', async () => {
        const res = await request(app)
          .post('/api/newclient')
          .send({
              email:"antonio.bianchi@mail",
	            name:"Antonio",
	            surname:"Bianchi",
	            //password:"$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty"
          })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('error',"Invalid client's email");
      })
    })

    describe('Post new client fail', () => {
      it('create a new client fails due to invalid name', async () => {
        const res = await request(app)
          .post('/api/newclient')
          .send({
              email:"antonio.bianchi@mail.it",
	            name:"",
	            surname:"Bianchi",
          })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('error',"Invalid client's name");
      })
    })

    describe('Post new client fail', () => {
      it('create a new client fails due to invalid surname', async () => {
        const res = await request(app)
          .post('/api/newclient')
          .send({
              email:"antonio.bianchi@mail.it",
	            name:"Antonio",
	            surname:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('error',"Invalid client's surname");
      })
    })

    describe('Post new client fail', () => {
      it('create a new client fails due to invalid password', async () => {
        let hash = 'failure';
        const res = await request(app)
          .post('/api/newclient')
          .send({
              email:"antonio.bianchi@mail.it",
	            name:"Antonio",
	            surname:"Bianchi",
              password : hash
          })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('error',"Invalid client's password hash");
      })
    })

    describe('Post new client success', () => {
      it('create a new client success', async () => {
        const hash = bcrypt.hashSync('testpassword', 10);
        const res = await request(app)
          .post('/api/newclient')
          .send({
              email:"antonio.bianchi@mail.it",
	            name:"Antonio",
	            surname:"Bianchi",
              password : hash
          })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('idClient',2);
      })
    })

    describe('Get a wallet fail', () => {
      it('send a invalid id of client', async () => {
        const res= await request(app)
          .get('/api/wallet')
          .send({
            Client_id: -1
          })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('error', `Invalid booking id, it must be positive`)
      })
    })

    describe('Put a qty of a product', () => {
      it('send a invalid qty', async () => {
        const res= await request(app)
          .put('/api/productqty')
          .send({
            ID_Product: 3,
	          New_Qty: -1
          })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('error', `Invalid qty id, it must be positive`)
      })
    })

    describe('Put a qty of a product', () => {
      it('send a invalid id product', async () => {
        const res= await request(app)
          .put('/api/productqty')
          .send({
            ID_Product: -1,
	          New_Qty: 2
          })
        expect(res.statusCode).toEqual(422);
        expect(res.body).toHaveProperty('error', `Invalid product id, it must be positive`)
      })
    })

  describe('Put a row in the table BOOKING_PRODUCTS', () => {
    it('send a invalid Booking id', async () => {
      const res= await request(app)
        .post('/api/bookingproduct')
        .send({
          ID_Booking: 0,
          ID_Product: 2,
          Qty: 3
        })
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty('error', 'Invalid booking id, it must be positive')
    })
  })

  describe('Put a row in the table BOOKING_PRODUCTS', () => {
    it('send a invalid product id', async () => {
      const res= await request(app)
        .post('/api/bookingproduct')
        .send({
          ID_Booking: 1,
          ID_Product: -1,
          Qty: 3
        })
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty('error', `Invalid product id, it must be positive`)
    })
  })

  describe('Put a row in the table BOOKING_PRODUCTS', () => {
    it('send a invalid qty', async () => {
      const res= await request(app)
        .post('/api/bookingproduct')
        .send({
          ID_Booking: 1,
          ID_Product: 1,
          Qty: -1
        })
      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty('error', `Invalid qty id, it must be positive`)
    })
  })

  //TEST POST /api/clientSession
  describe('Client Session success', () => {
    it('send a valid user', async () => {
      const res= await request(app)
        .post('/api/clientSessions')
        .send({
          username: "marco.bianchi@mail.it",
          password: "testpassword"
        })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', `C1`);
      expect(res.body).toHaveProperty('name', `Marco`);
    })
  })

  describe('Client Session fails', () => {
    it('send a wrong psw', async () => {
      const res= await request(app)
        .post('/api/clientSessions')
        .send({
          username: "marco.bianchi@mail.it",
          password: "test"
        })
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', `Incorrect username and/or password`);
    })
  })

  //TEST POST /api/farmerSession
  describe('Farmer Session success', () => {
    it('send a valid user', async () => {
      const res= await request(app)
        .post('/api/farmerSessions')
        .send({
          username: "antonio.bianchi@mail.it",
          password: "testpassword"
        })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', `F1`);
    })
  })

  describe('Farmer Session fails', () => {
    it('send a wrong psw', async () => {
      const res= await request(app)
        .post('/api/farmerSessions')
        .send({
          username: "antonio.bianchi@mail.it",
          password: "test"
        })
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', `Incorrect username and/or password`);
    })
  })


  //TEST POST /api/shopEmployeeSessions
  describe('Shop Employee Session success', () => {
    it('send a valid user', async () => {
      const res= await request(app)
        .post('/api/shopEmployeeSessions')
        .send({
          username: "antonio.bianchi@mail.it",
          password: "testpassword"
        })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', `S1`);
    })
  })

  describe('Shop Employee Session fails', () => {
    it('send a wrong psw', async () => {
      const res= await request(app)
        .post('/api/shopEmployeeSessions')
        .send({
          username: "antonio.bianchi@mail.it",
          password: "test"
        })
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', `Incorrect username and/or password`);
    })
  })


})
