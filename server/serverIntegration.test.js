// Integration tests for server.js

const dao = require('./dao');
const app = require('./server');
const request = require("supertest");


jest.useRealTimers();

describe('Test suite DAO', () => {
    beforeEach( async () => {
       // code to run before each test
    
       await dao.cleanDb();
       
    });

    //TEST API POST BOOKING
    describe('Post booking', () => {
        it('should create a new booking', async () => {
          const res = await request(app)
            .post('/api/bookings')
            .send({
              idClient: 3
            })
          expect(res.statusCode).toEqual(201)
          expect(res.body).toHaveProperty('idBooking')
        })
      })

   

});