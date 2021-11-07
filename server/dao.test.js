const dao = require('./dao');
const sqlite = require('sqlite3');

jest.useRealTimers();

describe('Test suite DAO', () => {
    beforeEach(() => {
       // code to run before each test
    
       const db = new sqlite.Database('testdatabase.db', (err) => {
        if(err) throw err;
      });

       //Clean the db

       db.run('DELETE FROM BOOKING', (err) => {
        if (err) {
          throw(err);
        } 
      });
    
      
      db.run('DELETE FROM CLIENT', (err) => {
        if (err) {
          throw(err);
        } 
      });
       
    });

    //TEST DAO FUNCTION CREATE BOOKING
    test('the creation of a new booking fails because id client is missing', () => {
        const booking = {
            state:"BOOKED"
        }
        return expect(dao.createBooking(booking)).rejects.toHaveProperty('errno', 19);
    });

    test('the creation of a new booking fails because state is missing', () => {
        const booking = {
            idClient : 2
        }
        return expect(dao.createBooking(booking)).rejects.toHaveProperty('errno', 19);
    });

    test('the creation of a new booking is done', () => {
        const booking = {
            idClient : 2,
            state : "BOOKED"
        }
        return expect(dao.createBooking(booking)).resolves.toBeGreaterThanOrEqual(1);
    });

    //TEST DAO FUNCTION CREATE CLIENT
    test('the creation of a new client fails because email is missing', () => {
        const client = {
            name : "Antonio",
            surname: "Bianchi", 
            password:"$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty"
        }
        return expect(dao.createClient(client)).rejects.toHaveProperty('errno', 19);
    });

    test('the creation of a new client fails because name is missing', () => {
        const client = {
            email:"antonio.bianchi@mail.it",
            surname: "Bianchi", 
            password:"$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty"
        }
        return expect(dao.createClient(client)).rejects.toHaveProperty('errno', 19);
    });

    test('the creation of a new client fails because surname is missing', () => {
        const client = {
            email:"antonio.bianchi@mail.it",
            name: "Antonio", 
            password:"$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty"
        }
        return expect(dao.createClient(client)).rejects.toHaveProperty('errno', 19);
    });

    test('the creation of a new client fails because password is missing', () => {
        const client = {
            email:"antonio.bianchi@mail.it",
            name: "Antonio", 
            surname:"bianchi"
        }
        return expect(dao.createClient(client)).rejects.toHaveProperty('errno', 19);
    });

    test('the creation of a new client is done', () => {
        const client = {
            email:"antonio.bianchi@mail.it",
            name: "Antonio",
            surname: "Bianchi", 
            password:"$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty"
        }
        return expect(dao.createClient(client)).resolves.toBeGreaterThanOrEqual(1);
    });

    //TEST DAO FUNCTION GET CLIENT
    test('get client return false because no email provided', () => {
        const email = "marco.bianchi@mail.it";
        const password="$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty";
        return expect(dao.getClient()).resolves.toBe(false);
    });
    test('get client return false because no user with that email exists', () => {
        const email = "marco.bianchi@mail.it";
        const password="$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty";
        return expect(dao.getClient(email,password)).resolves.toBe(false);
    });

    
    test('get client return false because wrong password', () => {
        //Create the user
        const client = {
            email:"antonio.bianchi@mail.it",
            name: "Antonio",
            surname: "Bianchi", 
            password:"$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty"
        }
        try {
            dao.createClient(client);
        }
        catch (err){
            fail('It should not happen');
        }

        const email = "antonio.bianchi@mail.it";
        const password="ciaociao";
        return expect(dao.getClient(email,password)).resolves.toBe(false);
    },10000);

    test('get client return success', () => {

        const client = {
            email:"antonio.bianchi@mail.it",
            name: "Antonio",
            surname: "Bianchi", 
            password:"$2a$10$k5YXDZMVIkeTqchdp..kquVqsqsYNk9Wvxfw7J7WnqKhqCIg723ty"
        }

        expect(dao.createClient(client)).resolves.toBeGreaterThanOrEqual(1);

        const email = "antonio.bianchi@mail.it";
        const password="testpassword";
        return expect(dao.getClient(email,password)).resolves.toHaveProperty('username', 'antonio.bianchi@mail.it');
    },10000);
});
