import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "react-dom/test-utils";
import API from "./API";
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

Enzyme.configure({ adapter: new Adapter() })

test('Fails to call API new user', () => {
    API.addUser();
  });
  