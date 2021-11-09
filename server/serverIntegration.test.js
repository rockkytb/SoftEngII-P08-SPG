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
   

});