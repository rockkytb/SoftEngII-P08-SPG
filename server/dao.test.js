const dao = require('./dao');
const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

jest.useRealTimers();

describe('Test suite DAO', () => {
    beforeEach( async () => {
       // code to run before each test
    
       await dao.cleanDb();
       
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
        const hash = bcrypt.hashSync('testpassword', 10);
        const client = {
            name : "Antonio",
            surname: "Bianchi", 
            password:hash
        }
        return expect(dao.createClient(client)).rejects.toHaveProperty('errno', 19);
    });

    test('the creation of a new client fails because name is missing', () => {
        const hash = bcrypt.hashSync('testpassword', 10);
        const client = {
            email:"antonio.bianchi@mail.it",
            surname: "Bianchi", 
            password: hash
        }
        return expect(dao.createClient(client)).rejects.toHaveProperty('errno', 19);
    });

    test('the creation of a new client fails because surname is missing', () => {
        const hash = bcrypt.hashSync('testpassword', 10);
        const client = {
            email:"antonio.bianchi@mail.it",
            name: "Antonio", 
            password:hash 
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
        const hash = bcrypt.hashSync('testpassword', 10);
        const client = {
            email:"antonio.bianchi@mail.it",
            name: "Antonio",
            surname: "Bianchi", 
            password: hash
        }
        return expect(dao.createClient(client)).resolves.toBeGreaterThanOrEqual(1);
    });

    //TEST DAO FUNCTION GET CLIENT
    test('get client return false because no email provided', () => {
        const email = "marco.bianchi@mail.it";
        return expect(dao.getClient()).resolves.toBe(false);
    });

    test('get client return false because no user with that email exists', () => {
        const email = "luca.bianchi@mail.it";
        return expect(dao.getClient(email,'testpassword')).resolves.toBe(false);
    });

    
    test('get client return false because wrong password', () => {
        //Create the user
        const hash = bcrypt.hashSync('testpassword', 10);
        const client = {
            email:"antonio.bianchi@mail.it",
            name: "Antonio",
            surname: "Bianchi", 
            password: hash
        }
        
        expect(dao.createClient(client)).resolves.toBeGreaterThanOrEqual(1);

        const email = "antonio.bianchi@mail.it";
        return expect(dao.getClient(email,'ciaociao')).resolves.toBe(false);
    },10000);

    test('get client return success', async () => {
        const email = "marco.bianchi@mail.it";
        return expect(dao.getClient(email,'testpassword')).resolves.toHaveProperty('username', 'marco.bianchi@mail.it');
    },10000);

    //TEST GET CLIENT BY ID
    test('get client by id return false because no user with that id exists', () => {
        const id = 12;
        return expect(dao.getClientById(id)).resolves.toBe(false);
    });

    test('get client by id return success', async () => {
        
        return expect(dao.getClientById(1)).resolves.toHaveProperty('username', 'marco.bianchi@mail.it');
    },10000);

    //TEST GET FARMER
    test('get farmer return false because no email provided', () => {
        const email = "marco.bianchi@mail.it";
        return expect(dao.getFarmer()).resolves.toBe(false);
    });

    test('get farmer return false because no user with that email exists', () => {
        const email = "marco.bianchi@mail.it";
        return expect(dao.getFarmer(email,'testpassword')).resolves.toBe(false);
    });

    test('get farmer return false because wrong psw', () => {
        const email = "antonio.bianchi@mail.it";
        return expect(dao.getFarmer(email,'testp')).resolves.toBe(false);
    },10000);

    test('get farmer return success', () => {
        
        const email = "antonio.bianchi@mail.it";
        return expect(dao.getFarmer(email,'testpassword')).resolves.toHaveProperty('id', 'F1');
    },10000);

    //TEST GET FARMER BY ID
    test('get farmer by id return false because no farmer with that id exists', () => {
        const id = 12;
        return expect(dao.getFarmerById(id)).resolves.toBe(false);
    });

    test('get farmer by id return a farmer', async () => {

        const id = 1;
        
        return expect(dao.getFarmerById(id)).resolves.toHaveProperty('id', 'F1');
    },10000);


    //TEST GET SHOP EMPLOYEE
    test('get shop employee return false because no email provided', () => {
        const email = "marco.bianchi@mail.it";
        return expect(dao.getShopEmployee()).resolves.toBe(false);
    });

    test('get shop employee return false because no user with that email exists', () => {
        const email = "marco.bianchi@mail.it";
        return expect(dao.getShopEmployee(email,'testpassword')).resolves.toBe(false);
    });

    test('get shop employee return false because wrong psw', () => {
        const email = "antonio.bianchi@mail.it";
        return expect(dao.getShopEmployee(email,'testp')).resolves.toBe(false);
    },10000);

    test('get shop employee return success', () => {
        
        const email = "antonio.bianchi@mail.it";
        return expect(dao.getShopEmployee(email,'testpassword')).resolves.toHaveProperty('id', 'S1');
    },10000);

    //TEST GET SHOP EMPLOYEE BY ID
    test('get shop employee by id return false because no shop employee with that id exists', () => {
        const id = 12;
        return expect(dao.getShopEmployeeById(id)).resolves.toBe(false);
    });

    test('get shop employee by id return a shop employee', async () => {

        const id = 1;
        
        return expect(dao.getShopEmployeeById(id)).resolves.toHaveProperty('id', 'S1');
    },10000);

});
