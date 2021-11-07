const dao = require('./dao');

//TEST DAO FUNCTION CREATE BOOKING
test('the creation fails because id client is missing', () => {
    const booking = {
        state:"BOOKED"
    }
    return expect(dao.createBooking(booking)).rejects.toHaveProperty('errno', 19);
  });

test('the creation fails because state is missing', () => {
    const booking = {
        idClient : 2
    }
    return expect(dao.createBooking(booking)).rejects.toHaveProperty('errno', 19);
});

test('the creation is done', () => {
    const booking = {
        idClient : 2,
        state : "BOOKED"
    }
    return expect(dao.createBooking(booking)).resolves.toBeGreaterThanOrEqual(1);
});

//TEST DAO FUNCTION CREATE CLIENT


