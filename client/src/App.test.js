import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App.js';
import NewClientForm from './NewClientForm.js';
import Employee from './Employee.js';
import Customer from './Customer.js';
import SidebarCustom from './Sidebar.js';
Enzyme.configure({ adapter: new Adapter() })

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
