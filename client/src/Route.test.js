// app.test.js
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'

import App from './App'

test('full app rendering/navigating', () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <App />
    </Router>
  )
})

test('landing on a bad page', () => {
  const history = createMemoryHistory()
  history.push('/some/bad/route')
  render(
    <Router history={history}>
      <App />
    </Router>
  )
})

test('landing on login page', () => {
    const history = createMemoryHistory()
    history.push('/login')
    render(
      <Router history={history}>
        <App />
      </Router>
    )
  })

  test('landing on products page', () => {
    const history = createMemoryHistory()
    history.push('/products')
    render(
      <Router history={history}>
        <App />
      </Router>
    )
  })