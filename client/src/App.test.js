import React from 'react';
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Enzyme, { shallow, mount } from 'enzyme';
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
Enzyme.configure({ adapter: new Adapter() })

//IF SOMETHING IS WRONG, TEST WILL FAIL

test('renders app', () => {
  shallow(<App/>);
});

test('renders new client form', () => {
  shallow(<NewClientForm/>);
});

test('renders Employee', () => {
  shallow(<Employee/>);

});

test('renders Customer', () => {
  
  let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<Customer />, container);
  });
  expect(container.textContent).toBe("Hey, stranger");

  act(() => {
    render(<Hello name="Jenny" />, container);
  });
  expect(container.textContent).toBe("Hello, Jenny!");

  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(container.textContent).toBe("Hello, Margaret!");
});
});

test('renders Sidebar', () => {
  shallow(<SidebarCustom/>);
});

test('renders Navbar', () => {
  shallow(<NavbarCustom/>);
});

test('renders BookingReview', () => {
  const clients = [{ id: "C1", name: "Ciccio", surname: "Sultano" },
    {  id: "C2", name: "prodi", surname: "Ciccio" }]
  const cart = [{ id: 1, name: "prod1", quantity: 3, price: 3.50 },
    {  id: 2, name: "prod2", quantity: 3, price: 3.50 }]
  shallow(<BookingReview clients = {clients} cart={cart}/>);

  let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

  act(() => {
    ReactDOM.render(<BookingReview/>, container);
  });
  BookingReview.setShow(true)
  BookingReview.handleClose()
  expect(BookingReview.show).toBe(false)
});

test('renders Carousel', () => {
  shallow(<CarouselCustom/>);
});

test('renders Login and log button', () => {
  shallow(<Login/>);
  shallow(<LogButton/>);
});

test('renders ProductList', () => {
  const products = [{ id: 1, name: "prod1", quantity: 3, price: 3.50 },
    {  id: 2, name: "prod2", quantity: 3, price: 3.50 }]
  shallow(<ProductsList products={products}/>);
});
