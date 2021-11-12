import React from 'react';
import ReactDOM from 'react-dom';

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
  shallow(<Customer/>);
});

test('renders Sidebar', () => {
  shallow(<SidebarCustom/>);
});

test('renders Navbar', () => {
  shallow(<NavbarCustom/>);
});

test('renders BookingReview', () => {
  const clients = [{ id: 1, name: "name", surname: "sur" },
    {  id: 1, name: "name", surname: "sur" }]
  const cart = [{ id: 1, name: "prod1", quantity: 3, price: 3.50 },
    {  id: 2, name: "prod2", quantity: 3, price: 3.50 }]
  shallow(<BookingReview clients = {clients} cart={cart}/>);
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
