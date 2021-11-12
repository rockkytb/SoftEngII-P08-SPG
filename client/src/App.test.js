import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewClientForm from './NewClientForm.js';
Enzyme.configure({ adapter: new Adapter() })


test('renders learn react link', () => {
  shallow(<NewClientForm/>);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
})
