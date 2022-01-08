import API from "./API";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const mockFetch = Promise.resolve({ json: () => Promise.resolve(true) });
global.fetch = jest.fn().mockImplementation(() => mockFetch);

Enzyme.configure({ adapter: new Adapter() })

test('Fails to call API new user', () => {
    API.addUser();
  });
  
test('Call API login', async() => {
    await API.logIn();
  });

test('Call API logout', async() => {
    await API.logOut();
  });

test('Call API getUserInfo', async() => {
    expect(API.getUserInfo()).rejects.toEqual(true);
  });

  test('Call API getClientByEmail', async () => {
   expect(API.getClientByEmail()).rejects.toEqual(true);
  });

  test('Call API getWalletById', async () => {
    expect(API.getWalletById()).rejects.toEqual(true);
   });

   test('Call API setNewWallet', async () => {
    expect(API.setNewWallet()).rejects.toEqual(true);
   });

   test('Call API newBooking', async () => {
    expect(API.newBooking()).rejects.toEqual(true);
   });

   test('Call API confirmBooking', async () => {
    expect(API.confirmBooking()).rejects.toEqual(true);
   });

   test('Call API newBookingMode', async () => {
    expect(API.newBookingMode()).rejects.toEqual(true);
   });

   test('Call API editProductQty', async () => {
    expect(API.editProductQty()).rejects.toEqual(true);
   });

   test('Call API confirmAck', async () => {
    expect(API.confirmAck()).rejects.toEqual(true);
   });

   test('Call API confirmDeliveryProducts', async () => {
    expect(API.confirmDeliveryProducts()).rejects.toEqual(true);
   });

   test('Call API confirmProductsFarmer', async () => {
    expect(API.confirmProductsFarmer()).rejects.toEqual(true);
   });

   test('Call API newAck', async () => {
    expect(API.newAck()).rejects.toEqual(true);
   });

   test('Call API newFutureProduct', async () => {
    expect(API.newFutureProduct()).rejects.toEqual(true);
   });

   test('Call API setDate', async () => {
    expect(API.setDate()).rejects.toEqual(true);
   });

   test('Call API attaccoDoS Client', async () => {
    expect(API.attaccoDoS({id:"C1"})).rejects.toEqual(true);
   });

   test('Call API attaccoDoS Manager', async () => {
    expect(API.attaccoDoS({id:"M1"})).rejects.toEqual(true);
   });

   test('Call API attaccoDoS Shop', async () => {
    expect(API.attaccoDoS({id:"S1"})).rejects.toEqual(true);
   });

   test('Call API attaccoDoS Farmer', async () => {
    expect(API.attaccoDoS({id:"F1"})).rejects.toEqual(true);
   });

   test('Call API confirmPreparation', async () => {
    expect(API.confirmPreparation()).rejects.toEqual(true);
   });