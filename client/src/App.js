import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "./NavbarCustom.js";
import CarouselCustom from "./CarouselCustom.js";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import Employee from "./Employee";
import SidebarCustom from "./Sidebar";
import API from "./API";
import NewClientForm from "./NewClientForm";

function App() {
  const [products, setProducts] = useState();
  const [clients, setClients] = useState();

  const [dirty, setDirty] = useState(false);

  const addUser = (newUser) => {
    const add = async () => {
      const res = await API.addUser(newUser);
      if (res && res.lastID) {
        newUser.id = res.idClient;
        setDirty(true);
      }
    };
    add()
    .catch((err) => console.log(err));
    {/* .then(() => setMessage({ msg: 'Successfully added.', type: 'success' })) */ }
    {/*.catch(err => handleErrors(err)) */ };
  }

  useEffect(() => {
    const getProducts = async () => {
      // call: GET /api/products
      const response = await fetch("/api/products");
      const productList = await response.json();
      if (response.ok) {
        setProducts(productList);
      }
    };
    getProducts();
  }, [dirty]);

  useEffect(() => {
    const getClients = async () => {
      // call: GET /api/clients
      const response = await fetch("/api/clients");
      const clientList = await response.json();
      if (response.ok) {
        setClients(clientList);
      }
    };
    getClients();
  }, []);

  return (
    <Router>

        <NavbarCustom className="width100 navbar navbar-dark navbar-expand-sm bg-success fixed-top" />
        <SidebarCustom/>

        <Row className="page">
          <Switch>

            <Route path="/*" render={() =>
       
              <div className="width100" >
                <CarouselCustom className="customCarousel" />
              </div>

            } />


            <Route path="/login" exact render={() =>
              /** LOGIN  */
              <></>
            } />

            <Route path="/register" exact render={() =>
              /** REGISTER */
              <Container>
                <NewClientForm addUser={addUser} />
              </Container>
            } />

            <Route path="/products" render={() =>
              /**  */
              <></>
            } />



            <Route path="/cust/:id" exact render={({ match }) =>
              /** Customer page */
              <></>
            } />

            <Route path="/cust/:id/cart" exact render={({ match }) =>
              /** Customer cart  da poter includere nel componente customer con path='{$path}/cart'*/
              <></>
            } />

            <Route path="/cust/:id/newOrder" exact render={({ match }) =>
              /** Customer new order page da poter includere nel componente customer con path='{$path}/newOrder*/
              <></>
            } />

            <Route path="/cust/:id/newClient" exact render={({ match }) =>
              /** Customer newClient page ????????? da poter includere nel componente customer con path='{$path}/newClient*/
              <></>
            } />

            <Route path="/emp/:id" exact render={({ match }) =>
              /** Employee page */
              <></>
            } />

            <Route path="/emp/:id/cart" exact render={({ match }) =>
              /** Employee cart page da poter includere nel componente employee con path='{$path}/cart'*/
              <></>
            } />

            <Route path="/emp/:id/newOrder" exact render={({ match }) =>
              /** Employee new order page da poter includere nel componente employee con path='{$path}/newOrder'*/
              <></>
            } />

            <Route path="/emp/:id/pagah" exact render={({ match }) =>
              /** Employee payment page da poter includere nel componente employee con path='{$path}/pagah'*/
              <></>
            } />


          </Switch>
        </Row>

    </Router>
  );
}

export default App;
