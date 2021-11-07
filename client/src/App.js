import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarCustom from './NavbarCustom.js';
import CarouselCustom from './CarouselCustom.js';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Container fluid className="p-0">
        <NavbarCustom />

        <Row className="page" >
          <Switch>

            <Route path="/" render={() =>
              /** Main */
              <div className="width100" >
                <CarouselCustom className="customCarousel" />
              </div>

            } />


            <Route path="/login" render={() =>
              /** LOGIN  */
              <></>
            } />

            <Route path="/register" render={() =>
              /** REGISTER */
              <></>
            } />

            <Route path="/products" render={() =>
              /**  */
              <></>
            } />



            <Route path="/cust/:id" render={({ match }) =>
              /** Customer page */
              <></>
            } />

            <Route path="/cust/:id/cart" render={({ match }) =>
              /** Customer cart  da poter includere nel componente customer con path='{$path}/cart'*/
              <></>
            } />

            <Route path="/cust/:id/newOrder" render={({ match }) =>
              /** Customer new order page da poter includere nel componente customer con path='{$path}/newOrder*/
              <></>
            } />

            <Route path="/cust/:id/newClient" render={({ match }) =>
              /** Customer newClient page ????????? da poter includere nel componente customer con path='{$path}/newClient*/
              <></>
            } />

            <Route path="/emp/:id" render={({ match }) =>
              /** Employee page */
              <></>
            } />

            <Route path="/emp/:id/cart" render={({ match }) =>
              /** Employee cart page da poter includere nel componente employee con path='{$path}/cart'*/
              <></>
            } />

            <Route path="/emp/:id/newOrder" render={({ match }) =>
              /** Employee new order page da poter includere nel componente employee con path='{$path}/newOrder'*/
              <></>
            } />

            <Route path="/emp/:id/pagah" render={({ match }) =>
              /** Employee payment page da poter includere nel componente employee con path='{$path}/pagah'*/
              <></>
            } />


          </Switch>
        </Row>

      </Container>
    </Router >
  );
}

export default App;
