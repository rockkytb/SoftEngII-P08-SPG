import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "./NavbarCustom.js";
import CarouselCustom from "./CarouselCustom.js";
import { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import Employee from "./Employee";
import SidebarCustom from "./Sidebar";
import API from "./API";
import NewClientForm from "./NewClientForm";
import DeliveryForm from "./DeliveryForm";
import { Login } from "./Login";
import ProductsList from "./ProductsList";
import BookingReview from "./BookingReview";
import Customer from "./Customer";
import Farmer from "./Farmer";
import Manager from "./Manager";
import ClientData from "./ClientData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingAcceptance from "./BookingAcceptance";
import CheckPending from "./CheckPending";

function App() {
  const [products, setProducts] = useState([]);
  const [futureProducts, setFutureProducts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingsState, setBookingsState] = useState(true);
  const [attaccoDDOS, setAttaccoDDOS] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userdata, setUserData] = useState({});
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [virtualTime, setVirtualTime] = useState(false);
  const [timers, setTimers] = useState();
  const [deliveryMode, setDeliveryMode] = useState(false);
  const [categories, setCategories] = useState([]);
  //const [booking, setBooking] = useState();
  //const history = useHistory();
  //const [usedMail, setUsedMail] = useState();

  //fake clock manager
  useEffect(() => {
    clearInterval(timers);
    if (virtualTime) {
      //Adds 3 hours every 3 seconds
      setTimers(
        setInterval(
          () =>
            setDate((oldDate) => {
              let d = new Date(oldDate);
              d.setHours(oldDate.getHours() + 3);
              return d;
            }),
          3000
        )
      );
    } else {
      //Update date every minute if real time enabled
      setDate(new Date());
      setTimers(setInterval(() => setDate(new Date()), 60000));
    }
  }, [virtualTime]);

  //authenticator
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUserData(user);
        setUpdate(true);
      } catch (err) {
        setUpdate(true);
      }
    };
    checkAuth();
  }, []);

  //login
  const doLogIn = async (credentials, type) => {
    try {
      const user = await API.logIn(credentials, type);
      toast.success(`Welcome ${user.username}!`, { position: "top-center" });
      setUserData(user);
      setLoggedIn(true);
    } catch (err) {
      toast.error("Wrong email or/and password, try again", {
        position: "top-center",
      });
    }
  };

  //logout
  const doLogOut = async () => {
    await API.logOut()
      .then(() => toast.success("Logout Succeeded", { position: "top-center" }))
      .catch(() =>
        toast.error("Error during logout, try again", {
          position: "top-center",
        })
      );
    setLoggedIn(false);
    setUserData();
    setUpdate(true);
    setCart([]);
    setBookingsState(true);
  };

  //add user to system db
  const addUser = (newUser) => {
    const add = async () => {
      const res = await API.addUser(newUser);
      if (res && res.idClient) {
        newUser.id = res.idClient;
        setAttaccoDDOS(true);
      }
    };
    add()
      .then(() => {
        toast.success("Registration completed", { position: "top-center" });
      })
      .catch((err) => {
        if (err.errors && err.errors[0]) {
          toast.error(err.errors, { position: "top-center" });
        } else {
          toast.error(err.error, { position: "top-center" });
        }
      });
  };

  //deprecated, add booking to system db
  const newBooking = async (clientID) => {
    // DA VERIFICARE CON API È PER INSERIRE UN NUOVO BOOKING. MANDA ALL'API IL CLIENTID PRESO DAL BOOKING
    // sì però stai calmo
    // ora sono sordo
    const book = async () => {
      const res = await API.newBooking(clientID);
      if (res && res.idBooking) {
        //setBooking({ id: res.idBooking });
        return res.idBooking;
      }
    };
    book()
      .then(() =>
        toast.success("Booking completed", { position: "top-center" })
      )
      .catch((err) => toast.error(err.errors, { position: "top-center" }));
  };

  //add product of booking to system db
  const newProductBooking = (bid, pid, qty) => {
    //crea associazione tra prodotti e booking con quantità. parametri da passare da definire
    const bookingProduct = async () => {
      await API.newBookingProduct(bid, pid, qty);
      await API.editProductQty(pid, qty);
      setBookingsState(true);
    };
    bookingProduct();
  };

  //update products, bookings and next week products
  useEffect(() => {
    if (bookingsState) {
      const getProducts = async () => {
        // call: GET /api/products
        const response = await fetch("/api/products");
        const productList = await response.json();
        if (response.ok) {
          setProducts(productList);
        }
      };

      const getFutureProducts = async () => {
        // call: GET /api/products_expected
        const response = await fetch("/api/products_expected");
        const productList = await response.json();
        if (response.ok) {
          setFutureProducts(productList);
        }
      };

      const getDeliveries = async () => {
        // call: GET /api/deliveries
        if (loggedIn && userdata.id.charAt(0) === "S") {
          const response = await fetch("/api/deliveries");
          const productList = await response.json();
          if (response.ok) {
            setDeliveries(productList);
          }
        }
      };

      const getBookings = async () => {
        // call: GET /api/bookings
        if (loggedIn && userdata.id.charAt(0) === "S") {
          const response = await fetch("/api/bookings");
          const bookingList = await response.json();
          if (response.ok) {
            setBookings(bookingList);
          }
        } else if (loggedIn && userdata.id.charAt(0) === "C") {
          const response = await fetch(
            "/api/bookings/clients/" + userdata.id.substring(1)
          );
          const bookingList = await response.json();
          if (response.ok) {
            setBookings(bookingList);
          }
        }
      };

      getFutureProducts();
      getProducts();
      getBookings();
      getDeliveries();
      setBookingsState(false);
    }
  }, [bookingsState, attaccoDDOS]);

  //clients server calls
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
  }, [loggedIn, attaccoDDOS]);

  const getSingleClientByEmail = (email) => {
    let client;
    if (clients) {
      client = clients.find((c) => c.username == email);
    }
    return client;
  };

  //wallet server calls
  const getWalletById = async (id) => {
    let tmp = 0;
    await API.getWalletById(id.substring(1))
      .then((wallet) => {
        tmp = wallet.balance;
      })
      .catch((err) => console.log(err));
    return tmp;
  };

  const setNewWallet = async (id, amount) => {
    try {
      const response = await API.setNewWallet(id.substring(1), amount);
      toast.success("Wallet modified successfully", { position: "top-center" });
      return response;
    } catch (err) {
      toast.error("Error updating the wallet", { position: "top-center" });
      console.log(err);
    }
  };

  //complete booking
  const setCompletedBooking = async (id) => {
    try {
      await API.confirmBooking(id);
      toast.success("Booking completed successfully", {
        position: "top-center",
      });
    } catch (err) {
      toast.error("Error updating the booking", { position: "top-center" });
      console.log(err);
    }
  };

  //get categories
  useEffect(() => {
    const getClients = async () => {
      // call: GET /api/categories
      const response = await fetch("/api/categories");
      const clientList = await response.json();
      if (response.ok) {
        setCategories(clientList);
      }
    };
    getClients();
  }, [attaccoDDOS]);

  return (
    <div className="page">
      <Router>
        <ToastContainer />
        <NavbarCustom
          className="width100 navbar navbar-dark navbar-expand-sm bg-success fixed-top"
          logged={loggedIn}
          logout={doLogOut}
          user={userdata}
          date={date}
          virtualTime={virtualTime}
          setVirtualTime={setVirtualTime}
        />

        <Switch>
          <Route //login
            exact
            path="/login"
            render={() => (
              /** LOGIN  */
              <>
                {loggedIn ? (
                  <>
                    {userdata.id.charAt(0) === "C" ? (
                      <Redirect to="/cust" />
                    ) : (
                      <>
                        {userdata.id.charAt(0) === "S" ? (
                          <Redirect to="/emp" />
                        ) : (
                          <>
                            {userdata.id.charAt(0) === "F" ? (
                              <Redirect to="/farmer" />
                            ) : (
                              <>
                                {userdata.id.charAt(0) === "M" ? (
                                  <Redirect to="/manager" />
                                ) : (
                                  <Redirect to="/" />
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <Login handleSubmit={doLogIn} />
                )}{" "}
              </>
            )}
          />

          <Route //display current products
            path="/products"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id &&
                        (userdata.id.charAt(0) === "C" ||
                          userdata.id.charAt(0) === "S") ? (
                          <>
                            <ProductsList
                              className="below-nav main-content"
                              products={products}
                              setProducts={setProducts}
                              cart={cart}
                              setCart={(val) => setCart(val)}
                              categories={categories}
                              //farmers = {farmers} //???
                            />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //display next week products
            path="/trunksproducts"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id &&
                        (userdata.id.charAt(0) === "C" ||
                          userdata.id.charAt(0) === "S") ? (
                          <>
                            <ProductsList
                              className="below-nav main-content"
                              products={futureProducts}
                              cart={cart}
                              categories={categories}
                              //farmers = {farmers} //??? //eh metti mai che serve //SEI UN FOLLE FREEZEEEEERRRRRR!!!!!!!
                            />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //display delivered products (only for employeet)
            path="/fattorinosimulator"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "S" ? (
                          <>
                            <ProductsList
                              className="below-nav main-content"
                              products={deliveries}
                              categories={categories}
                              //farmers = {farmers} //??? //eh metti mai che serve (tipo per le notifiche)
                            />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          {/* When logged as farmer or customer we shouldn't get here */}
          <Route //registration
            path="/register"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn &&
                    (userdata.id.charAt(0) === "C" ||
                      userdata.id.charAt(0) === "F") ? (
                      <Redirect to="/home" />
                    ) : (
                      /** REGISTER */
                      <NewClientForm
                        className="below-nav main-content"
                        addUser={addUser}
                        getClientbyEmail={getSingleClientByEmail}
                      />
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //manager homepage
            path="/manager"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "M" ? (
                          <>
                            {/*<SidebarCustom /> */}
                            <Manager className="below-nav main-content" />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //farmer homepage
            path="/farmer"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "F" ? (
                          <>
                            {/*<SidebarCustom /> */}
                            <Farmer className="below-nav main-content" />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //customer homepage
            path="/cust"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "C" ? (
                          <>
                            {/*<SidebarCustom /> */}
                            <Customer className="below-nav main-content" />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //employeet homepage
            path="/emp"
            exact
            render={() => (
              /** Employee page */
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "S" ? (
                          <>
                            {/*<SidebarCustom /> */}
                            <Employee
                              className="below-nav main-content"
                              cart={cart}
                              clients={clients}
                            />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //update client data (only for employeet)
            path="/emp/clientData"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "S" ? (
                          <>
                            {/* <SidebarCustom /> */}
                            <ClientData
                              className="below-nav main-content"
                              clients={clients}
                              //getClient={getSingleClientByEmail}
                              getWallet={(id) => getWalletById(id)}
                              changeWallet={setNewWallet}
                              className="below-nav main-content"
                            />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //verify pending cancelation bookings (only for employeet)
            path="/emp/pending"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "S" ? (
                          <>
                            {/* <SidebarCustom /> */}
                            <CheckPending
                              className="below-nav main-content"
                              bookings={bookings}
                              products={products}
                              className="below-nav main-content"
                            />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //select delivery mode and address
            path="/deliveryMode"
            exact
            render={() => (
              /** Employee new order page da poter includere nel componente employee con path='{$path}/newOrder'*/
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id &&
                        (userdata.id.charAt(0) === "S" ||
                          userdata.id.charAt(0) === "C") ? (
                          <>
                            {deliveryMode ? (
                              <>{/*FORM CRISTIAN*/}</>
                            ) : (
                              <>
                                <DeliveryForm
                                  deliveryMode={deliveryMode}
                                  setDeliveryMode={setDeliveryMode}
                                />
                              </>
                            )}
                            {/*<SidebarCustom />
                            <BookingReview
                              className="below-nav main-content"
                              cart={cart}
                              setCart={setCart}
                              userdata={userdata}
                              clients={clients}
                              products={products}
                              setProducts={setProducts}
                              newProductBooking={newProductBooking}
                              setBookingsState={setBookingsState}
                              getWallet={getWalletById}
                              className="below-nav main-content"
                            />*/}
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //confirm booking
            path="/newOrder"
            exact
            render={() => (
              /** Employee new order page da poter includere nel componente employee con path='{$path}/newOrder'*/
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id &&
                        (userdata.id.charAt(0) === "S" ||
                          userdata.id.charAt(0) === "C") ? (
                          <>
                            {/*<SidebarCustom />*/}
                            <BookingReview
                              className="below-nav main-content"
                              cart={cart}
                              setCart={setCart}
                              userdata={userdata}
                              clients={clients}
                              products={products}
                              setProducts={setProducts}
                              newProductBooking={newProductBooking}
                              setBookingsState={setBookingsState}
                              getWallet={getWalletById}
                              className="below-nav main-content"
                            />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //set booking as completed (only for employeet)
            path="/emp/confirmOrder"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "S" ? (
                          <>
                            {/*<SidebarCustom />*/}
                            <BookingAcceptance
                              className="below-nav main-content"
                              bookings={bookings}
                              confirmBooking={setCompletedBooking}
                              products={products}
                              className="below-nav main-content"
                            />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //TODO: payment page
            path="/emp/pagah"
            exact
            render={() => (
              /** Employee payment page da poter includere nel componente employee con path='{$path}/pagah'*/
              //<>{loggedIn ? <SidebarCustom className="below-nav" /> : <Redirect to="/home" />}</>
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "S" ? (
                          <>
                            <SidebarCustom className="below-nav" />
                          </>
                        ) : (
                          <Redirect to="/home" />
                        )}
                      </>
                    ) : (
                      <Redirect to="/login" />
                    )}{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //homepage
            exact
            path="/home"
            render={() => (
              <div className="width100">
                <CarouselCustom className="customCarousel" logged={loggedIn} />
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
