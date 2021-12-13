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
import Farmer from './Farmer';
import Manager from './Manager.js';
import WarehouseWorker from './WarehouseWorker.js';
import SidebarCustom from './Sidebar.js';
import ProductsList from './ProductsList.js';
import NavbarCustom from './NavbarCustom.js';
import BookingReview from './BookingReview.js';
import BookingAcceptance from './BookingAcceptance.js';
import BookingConfirmFarmer from './BookingConfirmFarmer.js';
import BookingDeliveryFarmer from './BookingDeliveryFarmer.js';
import CarouselCustom from './CarouselCustom.js';
import AcknowledgeDeliveryFarmer from './AcknowledgeDeliveryManager.js';
import { Login, LogButton } from './Login.js';
import Clock from './Clock.js';
import { CloudHaze1, JustifyLeft } from 'react-bootstrap-icons';
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

test('renders Warehouse Manager', () => {
  shallow(<Manager />);
});

test('renders Warehouse Worker', () => {
  shallow(<WarehouseWorker />);
});

test('renders Farmer', () => {
  shallow(<Farmer />);
});

test('renders Sidebar', () => {
  shallow(<SidebarCustom />);
});

test('renders Navbar', () => {
  shallow(<NavbarCustom />);
});

test('renders Acknowledge delivery farmer', () => {
  shallow(<AcknowledgeDeliveryFarmer />);
});

test('renders BookingAcceptance', () => {
  const bookings = [{state:"BOOKED",id:1,name:"Antonio",surname:"Bianchi",email:"antonio.bianchi@mail.it",
                    products:[{product:"apple",qty:3}]}];
  const ba =shallow(<BookingAcceptance bookings={bookings} confirmBooking={function confirmBooking(){}}/>);
  ba.find('#setAsCompleted1').simulate('click');

});

test('renders BookingAcceptance empty', () => {
  const bookings = [];
  const ba =shallow(<BookingAcceptance bookings={bookings} confirmBooking={function confirmBooking(){}}/>);

});

test('renders BookingConfirmFarmer', () => {
  const expectedProducts = [{name:"apple",qty:3},{name:"peach",qty:3}];
  const bcf =shallow(<BookingConfirmFarmer calendarday={new Date()} expectedProducts={expectedProducts} confirmProducts={function confirmProducts(){}}/>);
  bcf.find('#confirmButton').simulate('click');
  bcf.find('#closeButton').simulate('click');
});

test('renders BookingConfirmFarmer empty', () => {
  const expectedProducts = [];
  const bcf =shallow(<BookingConfirmFarmer calendarday={new Date()} expectedProducts={expectedProducts} confirmProducts={function confirmProducts(){}}/>);
});

test('renders BookingDeliveryFarmer', () => {
  const confirmedProducts = [{name:"apple",qty:3},{name:"peach",qty:3}];
  const bdf =shallow(<BookingDeliveryFarmer calendarday={new Date()} confirmedProducts={confirmedProducts} confirmDelivery={function confirmDelivery(){}}/>);
  bdf.find('#deliveryButton').simulate('click');
  bdf.find('#closeButton').simulate('click');
});

test('renders BookingDeliveryFarmer empty', () => {
  const confirmedProducts = [];
  const bdf =shallow(<BookingDeliveryFarmer calendarday={new Date()} confirmedProducts={confirmedProducts} confirmDelivery={function confirmDelivery(){}}/>);
});

test('renders BookingReview', () => {
  const clients = [{ id: "C1", name: "Ciccio", surname: "Sultano" },
  { id: "C2", name: "prodi", surname: "Ciccio" }]
  const cart = [{ id: 1, name: "prod1", quantity: 3, price: 3.50 },
  { id: 2, name: "prod2", quantity: 3, price: 3.50 }]

  const mockOk = jest.fn((id) => { return 20.30 });

  const userdata = {id:"C1",name:"Antonio"}

  const br = shallow(<BookingReview clients={clients} setCart={function setCart(){}} setProducts={function setProducts(){}} cart={cart} getWallet={mockOk} userdata={userdata}
                      calendarday={new Date()} />);
  

  br.find('#butConf').simulate('click');
  expect(br.find(Modal).prop('show')).toBe(false);

  br.find('#closeModal').simulate('click');
  expect(br.find(Modal).prop('show')).toBe(false);

  br.find('#removeButton').simulate('click');

  br.find('#submitModal').simulate('click', {
    preventDefault: () => {
    },
    currentTarget: {
      checkValidity: () => {
        return true;
      }
    }
   });

});

test('renders Carousel', () => {
  const carousel= shallow(<CarouselCustom />);
  carousel.find('#Carousel').simulate('select');
});

test('renders Carousel logged', () => {
  const carousel= shallow(<CarouselCustom logged={true} />);
});

test('renders Login and log button', () => {
  shallow(<Login />);
  shallow(<LogButton />);
});

test('renders clock', () => {
  shallow(<Clock date={new Date()}/>);
});

test('renders App', () => {
  shallow(<App/>);
});

test('renders ProductList', () => {
  const products = [{ id: 1, name: "prod1", quantity: 3, price: 3.50 },
  { id: 2, name: "prod2", quantity: 3, price: 3.50 }]
  const categories = [{id:1,name:"fruit"},{id:2,name:"vegetables"}]
  shallow(<ProductsList products={products} categories={categories}/>);
});
