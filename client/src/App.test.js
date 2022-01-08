import React from 'react';
import {
  Modal
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
import CheckPending from './CheckPending.js';
import ClientData from './ClientData.js';
import AcknowledgeDeliveryFarmer from './AcknowledgeDeliveryManager.js';
import { Login, LogButton } from './Login.js';
import Clock from './Clock.js';
import ReportAvailability from './ReportAvailability.js';
import PickupSchedule from './PickupSchedule.js';
import PreparationConfirmFarmer from './PreparationConfirmFarmer.js';
Enzyme.configure({ adapter: new Adapter() })

//IF SOMETHING IS WRONG, TEST WILL FAIL

test('renders app', () => {
  shallow(<App />);
});

test('renders new client form', () => {
  const ncf = shallow(<NewClientForm getClientbyEmail={function getClientbyEmail(){return "ant.bnc@mail.it"}} addUser={function addUser(){}}/>);
  ncf.find('#nameField').simulate('change',{target : { value : "antonio"}});
  ncf.find('#surnameField').simulate('change',{target : { value : "bianchi"}});
  ncf.find('#emailField').simulate('change',{target : { value : "antonio.bianchi@mail.it"}});
  ncf.find('#pswField').simulate('change',{target : { value : "testpsw"}});
  ncf.find('#submitButton').simulate('click', {
    preventDefault: () => {
    },
    currentTarget: {
      checkValidity: () => {
        return true;
      }
    }
   });
   ncf.find('#clearButton').simulate('click');
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
  const bookings = [{state:"PENDINGCANCELATION",id:1,name:"Antonio",surname:"Bianchi",email:"antonio.bianchi@mail.it",
                    products:[{product:"apple",qty:3}]}];
  const nc= shallow(<NavbarCustom logged={true} bookings={bookings} user={{id:"C1"}} />);
  nc.find('#notificationBell').simulate('click');
  shallow(<NavbarCustom logged={true} bookings={bookings} user={{id:"M1"}} />);
  shallow(<NavbarCustom logged={true} bookings={bookings} user={{id:"F1"}} />);
  shallow(<NavbarCustom logged={true} bookings={bookings} user={{id:"S1"}} />);
});

test('renders Navbar empty', () => {
  const bookings = [{state:"BOOKED",id:1,name:"Antonio",surname:"Bianchi",email:"antonio.bianchi@mail.it",
                    products:[{product:"apple",qty:3}]}];
  shallow(<NavbarCustom bookings={bookings}/>);
});

test('renders Acknowledge delivery farmer', () => {
  const acknowledges=[{farmer:"farmer1"}]
  const adf = shallow(<AcknowledgeDeliveryFarmer acknowledges={acknowledges} confirmAck={function confirmAck(){}}/>);
  adf.find('#confirmfarmer1').simulate('click');
});

test('renders Acknowledge delivery farmer empty', () => {
  const acknowledges=[]
  const adf = shallow(<AcknowledgeDeliveryFarmer acknowledges={acknowledges} confirmAck={function confirmAck(){}}/>);
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
  bcf.find('#confirmButtonapple').simulate('click');
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

test('renders CheckPending', () => {
  const bookings = [{state:"PENDINGCANCELATION",id:1,name:"Antonio",surname:"Bianchi",email:"antonio.bianchi@mail.it",
                    products:[{product:"apple",qty:3}]}];
  const ba =shallow(<CheckPending bookings={bookings}/>);
});

test('renders CheckPending Empty', () => {
  const bookings = [{state:"BOOKED",id:1,name:"Antonio",surname:"Bianchi",email:"antonio.bianchi@mail.it",
  products:[{product:"apple",qty:3}]}];
  const ba =shallow(<CheckPending bookings={bookings}/>);
});

test('renders ClientData', () => {
  const clients = [{id:1,name:"Antonio", surname:"Bianchi"},{id:2,name:"Marco", surname:"Bianchi"}]
  const cd= shallow(<ClientData clients={clients} getWallet={function getWallet(){}} changeWallet={function changeWallet(){}} />);
  cd.find('#selectClient').simulate('change',{target : { value : 1}});
  cd.find('#submitButton').simulate('click');
  cd.find('#changeWallet').simulate('change',{target : { value : 10.99}});
  cd.find('#clientButton1').simulate('click');
});


test('renders Carousel', () => {
  const carousel= shallow(<CarouselCustom />);
  carousel.find('#Carousel').simulate('select');
});

test('renders Carousel logged', () => {
  shallow(<CarouselCustom logged={true} />);
});

test('renders Login and log button', () => {
  const login = shallow(<Login handleSubmit={function handleSubmit(){}}/>);
  
  login.find('#emailField').simulate('change',{target : { value : "antonio.bianchi@mail.it"}});
  login.find('#pswField').simulate('change',{target : { value : "testpsw"}});
  login.find('#userType').simulate('change',{target : { value : "F"}});
  login.find('#submitLogin').simulate('click', {
    preventDefault: () => {
    }
   });
  shallow(<LogButton />);
});

test('renders clock', () => {
 const ck = shallow(<Clock date={new Date()} mobile={false} setVirtualTime={function setVirtualTime(){}}/>);
 ck.find('#virtualTime').simulate('click');
});

test('renders clock mobile', () => {
  const ck = shallow(<Clock date={new Date()} mobile={true} setVirtualTime={function setVirtualTime(){}}/>);
  ck.find('#mobileButton').simulate('click');
 });

test('renders App', () => {
  shallow(<App/>);
});

test('renders ProductList', () => {
  const products = [{ id: 1, name: "prod1", farmer_email:"ab@mail.it", category:"fruit", quantity: 3, price: 3.50 },
  { id: 2, name: "prod2",category:"fruit",farmer_email:"ab@mail.it", quantity: 3, price: 3.50 }]
  const categories = [{id:1,name:"fruit"},{id:2,name:"vegetables"}]
  const pl = shallow(<ProductsList products={products} categories={categories} setCart={function setCart(){}} setProducts={function setProducts(){}}/>);
  pl.find('#addCart1').simulate('click');
  pl.find('#catFilterfruit').simulate('click');
  pl.find('#farmerFilterab').simulate('click');
  pl.find('#qtyButton').simulate('change',{target:10});
  pl.find('#submitButton').simulate('click');

  pl.find('#closeButton').simulate('click');
});

test('renders PickupSchedule', () => {
  const bookings = [{state:"BOOKED",idBooking:1,idClient:1, date:"2021-12-08", time:"20:57"},
  {state:"BOOKED",idBooking:2,idClient:2, date:"2021-12-09", time:"20:57"},
  {state:"BOOKED",idBooking:3,idClient:3, date:"2021-12-18", time:"20:57"}];
  const ps =shallow(<PickupSchedule bookings={bookings} confirmPreparation={function confirmPreparation(){}}/>);
  ps.find('#confirmButton1').simulate('click');
});

test('renders PickupSchedule empty', () => {
  const bookings = [];
  shallow(<PickupSchedule bookings={bookings}/>);
});

test('renders PreparationConfirmFarmer', () => {
  const confirmedProducts = [{name:"apple",qty:3},{name:"peach",qty:3}];
  const pcf = shallow(<PreparationConfirmFarmer calendarday={new Date()} confirmedProducts={confirmedProducts} confirmPreparationFarmer={function confirmPreparationFarmer(){}}/>);
  pcf.find('#confirmButtonapple').simulate('click');
  pcf.find('#closeButton').simulate('click');
});

test('renders PreparationConfirmFarmer empty', () => {
  const confirmedProducts = [];
  shallow(<PreparationConfirmFarmer calendarday={new Date()} confirmedProducts={confirmedProducts}/>);
  
});

test('renders ReportAvailability', () => {
  const categories=[{id:1,name:"fruit"},{id:2,name:"vegetables"}]
  const ra = shallow(<ReportAvailability id={"F1"}categories={categories} addFutureProducts={function addFutureProducts(){}} setDirty={function setDirty(){}}/>);
  ra.find('#nameField').simulate('change',{target : { value : "name"}});
  ra.find('#categoryField').simulate('change',{target : { value : 2}});
  ra.find('#priceField').simulate('change',{target : { value : 3.39}});
  ra.find('#quantityField').simulate('change',{target : { value : 20}});
  ra.find('#sizeField').simulate('change',{target : { value : 3.39}});
  ra.find('#uomField').simulate('change',{target : { value : "kg"}});
  ra.find('#submitButton').simulate('click', {
    preventDefault: () => {
    },
    currentTarget: {
      checkValidity: () => {
        return true;
      }
    }
   });
  
});

test('renders ReportAvailability empty', () => {
  const categories=[]
  const ra = shallow(<ReportAvailability categories={categories} setDirty={function setDirty(){}}/>);
});
