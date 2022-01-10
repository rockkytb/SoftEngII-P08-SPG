// app.test.js
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {act} from 'react-dom/test-utils';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'
import { StaticRouter } from "react-router";

import '@testing-library/jest-dom'

import App from './App'

const mockFetch = Promise.resolve({ json: () => Promise.resolve(true) });
global.fetch = jest.fn().mockImplementation(() => mockFetch);

Enzyme.configure({ adapter: new Adapter() })

test('Renders home and goes to login', async () => {
  const history = createMemoryHistory()
  await act( async () => 
        render(
        <Router history={history}>
          <App />
        </Router>
      )
    );
    const aboutItem = screen.getByText('Login');
     expect(aboutItem).toBeInTheDocument();
    userEvent.click(aboutItem);
})

  test('Renders home and goes to register', async () => {
    const history = createMemoryHistory()
    history.location='/home';
    await act( async () => 
          render(
          <Router history={history}>
            <App />
          </Router>
        )
      );
      const aboutItem = screen.getByText('Create a new account');
       expect(aboutItem).toBeInTheDocument();
      userEvent.click(aboutItem);
  })

  