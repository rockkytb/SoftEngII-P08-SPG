// app.test.js
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {act} from 'react-dom/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'

import App from './App'

const mockFetch = Promise.resolve({ json: () => Promise.resolve(true) });
global.fetch = jest.fn().mockImplementation(() => mockFetch);

Enzyme.configure({ adapter: new Adapter() })

test('full app rendering/navigating', async () => {
  const history = createMemoryHistory()
  await act( async () => 
        render(
        <Router history={history}>
          <App />
        </Router>
      )
    );
})

test('landing on a bad page', async () => {
  const history = createMemoryHistory()
  history.push('/some/bad/route')
  await act( async () => 
        render(
        <Router history={history}>
          <App />
        </Router>
      )
    );
})

test('landing on login page', async () => {
    const history = createMemoryHistory()
    history.push('/login')
    await act( async () => 
        render(
        <Router history={history}>
          <App />
        </Router>
      )
    );
  })

  test('landing on products page', async () => {
    const history = createMemoryHistory()
    history.push('/products')
    await act( async () => 
        render(
        <Router history={history}>
          <App />
        </Router>
      )
    );
  })

  test('landing on addFutureproducts page', async () => {
    const history = createMemoryHistory()
    history.push('/addFutureproducts')
    await act( async () => 
        v=render(
        <Router history={history}>
          <App />
        </Router>
      )
    );
  })

  