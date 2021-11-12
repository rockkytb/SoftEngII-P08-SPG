import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "./NavbarCustom.js";
import CarouselCustom from "./CarouselCustom.js";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Employee from "./Employee";
import SidebarCustom from "./Sidebar";
import API from "./API";
import NewClientForm from "./NewClientForm";
import { Login } from "./Login";
import ProductsList from "./ProductsList";
import BookingReview from "./BookingReview";
import Customer from "./Customer";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Culo",
      category: 42,
      price: 69.42,
      quantity: 5,
      farmerId: 1,
    },
    {
      id: 2,
      name: "Culone",
      category: 43,
      price: 69.42,
      quantity: 10,
      farmerId: 1,
    },
    {
      id: 3,
      name: "Culetto",
      category: 42,
      price: 79.42,
      quantity: 1,
      farmerId: 2,
    },
    {
      id: 4,
      name: "Culissimo",
      category: 44,
      price: 69.42,
      quantity: 3,
      farmerId: 3,
    },
  ]);
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [dirty, setDirty] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [userdata, setUserData] = useState({});

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.getUserInfo().then((user) => {
          console.log(user);
          setLoggedIn(true);
          setUserData(user);
          
        });
      } catch (err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);

  const doLogIn = async (credentials, type) => {
    try {
      console.log("inside doLogin");
      console.log(credentials);
      const user = await API.logIn(credentials, type);
      setUserData(user);
      console.log(user);
      setLoggedIn(true);
    } catch (err) {
      //toast.error("Wrong email or/and password, try again");
      console.log(err);
    }
  };

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUserData();
  };

  const addUser = (newUser) => {
    const add = async () => {
      const res = await API.addUser(newUser);
      if (res && res.lastID) {
        newUser.id = res.idClient;
        setDirty(true);
      }
    };
    add().catch((err) => console.log(err));
    {
      /* .then(() => setMessage({ msg: 'Successfully added.', type: 'success' })) */
    }
    {
      /*.catch(err => handleErrors(err)) */
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      // call: GET /api/products
      const response = await fetch("/api/products");
      const productList = await response.json();
      if (response.ok) {
        setProducts(productList);
      }
    };

    const getBookings = async () => {
      // call: GET /api/bookings
      const response = await fetch("/api/bookings");
      const bookingList = await response.json();
      if (response.ok) {
        setBookings(bookingList);
      }
    };

    getProducts();
    getBookings();
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
    <div className="page">
      <Router >

        <NavbarCustom
          className="width100 navbar navbar-dark navbar-expand-sm bg-success fixed-top"
          logged={loggedIn}
          logout={doLogOut}
          user={userdata}
        />

        <Switch>
          <Route
            exact
            path="/login"
            render={() => (
              /** LOGIN  */
              <>
                {loggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Login handleSubmit={doLogIn} />
                )}{" "}
              </>
            )}
          />

          <Route
            path="/products"
            exact
            render={() => (
              /**  */
              <ProductsList
                products={products}
                cart={cart}
              //farmers = {farmers} //???
              />
            )}
          />

          <Route
            path="/register"
            exact
            render={() => (
              /** REGISTER */
              <Container>
                <NewClientForm addUser={addUser}  />
              </Container>
            )}
          />

          <Route
            path="/cust"
            exact
            render={() => (
              <>
                {
                  loggedIn && userdata.id && userdata.id.charAt(0) == 'C'
                    ? <>
                          <SidebarCustom />
                          <Customer 

                          />
                       </>

                    : <Redirect to="/home" />
                }
              </>
            )}
          />

          <Route
            path="/cust/cart"
            exact
            render={() => (
              /** Customer cart  da poter includere nel componente customer con path='{$path}/cart'*/
              <></>
            )}
          />

          <Route
            path="/cust/newOrder"
            exact
            render={() => (
              /** Customer new order page da poter includere nel componente customer con path='{$path}/newOrder*/
              <></>
            )}
          />

          <Route
            path="/emp"
            exact
            render={() => (
              /** Employee page */
              <>
                {loggedIn ?
                  <>
                    {userdata.id && userdata.id.charAt(0) == 'S' ?
                      <>
                        <SidebarCustom />
                        <Employee
                          className="below-nav main-content"
                          cart={cart}
                          clients={clients}
                        />
                      </>
                      : <p>No. You no employeet, you bad boi.</p>
                    }
                  </>

                  : <Redirect to="/home" />}
              </>
            )}
          />

          <Route
            path="/emp/newOrder"
            exact
            render={() => (
              /** Employee new order page da poter includere nel componente employee con path='{$path}/newOrder'*/
              <>
                {loggedIn ? <SidebarCustom className="below-nav" /> : <Redirect to="/" />}
                <BookingReview
                  products={products}
                  cart={cart}
                  setCart={setCart}
                  clients={clients}
                  className="below-nav main-content"
                />
              </>
            )}
          />

          <Route
            path="/emp/pagah"
            exact
            render={() => (
              /** Employee payment page da poter includere nel componente employee con path='{$path}/pagah'*/
              <>{loggedIn ? <SidebarCustom className="below-nav" /> : <Redirect to="/home" />}</>
            )}
          />

          <Route
            exact
            path="/home"
            render={() => (
              <div className="width100" >
                <CarouselCustom className="customCarousel" />
              </div>
            )}
          />

          <Route path="/*" render={() => <Redirect to="/home" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
