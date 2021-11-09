import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "./NavbarCustom.js";
import CarouselCustom from "./CarouselCustom.js";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Employee from "./Employee";
import SidebarCustom from "./Sidebar";

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
  }, []);

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
      <Container fluid className="p-0">
        <NavbarCustom />
        <SidebarCustom/>

        <Row className="page">
          <Switch>

            { /*<Route path="/" render={() =>
              <Redirect to={"/home"} />
            } /> */ }

            <Route path="/home" render={() =>
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
              <Container>
                <NewClientForm addUser={addUser} />
              </Container>
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
    </Router>
  );
}

export default App;
