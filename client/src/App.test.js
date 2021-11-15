import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import {
  Modal,
  Form,
  Col,
  Alert,
  Card,
  Button,
  CardColumns,
} from "react-bootstrap";

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App.js';
import NewClientForm from './NewClientForm.js';
import Employee from './Employee.js';
import Customer from './Customer.js';
import SidebarCustom from './Sidebar.js';
import ProductsList from './ProductsList.js';
import NavbarCustom from './NavbarCustom.js';
import BookingReview from './BookingReview.js';
import CarouselCustom from './CarouselCustom.js';
import { Login, LogButton } from './Login.js';
import { JustifyLeft } from 'react-bootstrap-icons';
Enzyme.configure({ adapter: new Adapter() })

//IF SOMETHING IS WRONG, TEST WILL FAIL

test('renders app', () => {
  shallow(<App />);
});

test('renders new client form', () => {
  shallow(<NewClientForm />);
});

test('renders Employee', () => {
  shallow(<Employee />);

});

test('renders Customer', () => {
  shallow(<Customer />);
});

test('renders Sidebar', () => {
  shallow(<SidebarCustom />);
});

test('renders Navbar', () => {
  shallow(<NavbarCustom />);
});

test('renders BookingReview', () => {
  const clients = [{ id: "C1", name: "Ciccio", surname: "Sultano" },
  { id: "C2", name: "prodi", surname: "Ciccio" }]
  const cart = [{ id: 1, name: "prod1", quantity: 3, price: 3.50 },
  { id: 2, name: "prod2", quantity: 3, price: 3.50 }]

  const mockOk = jest.fn((id) => { return 20.30 });

  const br = shallow(<BookingReview clients={clients} cart={cart} getWallet={mockOk} />);
  //console.log(br.debug());

  br.find('#butConf').simulate('click');
  expect(br.find(Modal).prop('show')).toBe(true);

  br.find('#closeModal').simulate('click');
  expect(br.find(Modal).prop('show')).toBe(false);


  //const mockNot = jest.fn((id) => {return -1})

  /*br.find('#butConf').simulate('click');
  br.find('#submitModal').simulate('click');*/


  /*let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  /*act(() => {
    ReactDOM.render(<BookingReview />, container);
  });*/
});

test('renders Carousel', () => {
  shallow(<CarouselCustom />);
});

test('renders Login and log button', () => {
  shallow(<Login />);
  shallow(<LogButton />);
});

test('renders ProductList', () => {
  const products = [{ id: 1, name: "prod1", quantity: 3, price: 3.50 },
  { id: 2, name: "prod2", quantity: 3, price: 3.50 }]
  shallow(<ProductsList products={products} />);
});
