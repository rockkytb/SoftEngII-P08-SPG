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
import { Login } from "./Login";
import ProductsList from "./ProductsList";
import BookingReview from "./BookingReview";
import Customer from "./Customer";
import ClientData from "./ClientData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingAcceptance from "./BookingAcceptance";

function App() {
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingsState, setBookingsState] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userdata, setUserData] = useState({});
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [virtualTime, setVirtualTime] = useState (false);
  const [timers, setTimers] = useState(); 
  //const [booking, setBooking] = useState();
  //const history = useHistory();
  //const [usedMail, setUsedMail] = useState();
  
  useEffect(() => {
    clearInterval(timers);
    if(virtualTime){
      //Adds 3 hours every 3 seconds
      setTimers( setInterval(() => setDate ( (oldDate) =>
        {
          let d = new Date(oldDate);
          d.setHours (oldDate.getHours() +3);
          return d;
        }
      ),3000));

    }
    else{
       //Update date every minute if real time enabled
       setDate(new Date());
       setTimers(  setInterval(() => setDate(new Date()), 60000));
    }
    
  }, [virtualTime]);

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

  const addUser = (newUser) => {
    const add = async () => {
      const res = await API.addUser(newUser);
      if (res && res.idClient) {
        newUser.id = res.idClient;
        setDirty(true);
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

  const newBooking = async (clientID) => {
    // DA VERIFICARE CON API È PER INSERIRE UN NUOVO BOOKING. MANDA ALL'API IL CLIENTID PRESO DAL BOOKING
    // sì però stai calmo
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

  const newProductBooking = (bid, pid, qty) => {
    //crea associazione tra prodotti e booking con quantità. parametri da passare da definire
    const bookingProduct = async () => {
      await API.newBookingProduct(bid, pid, qty);
      await API.editProductQty (pid,qty);
      setBookingsState(true);
    };
    bookingProduct();
    
  };

  useEffect(() => {
    if(bookingsState){
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
      setBookingsState(false);
    }
  }, [bookingsState]);

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
  }, [loggedIn, dirty]);

  const getSingleClientByEmail = (email) => {
    let client;
    if (clients) {
      client = clients.find((c) => c.username == email);
    }
    return client;
  };

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
          <Route
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
                          <Redirect to="/" />
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

          <Route
            path="/products"
            exact
            render={() => (
              <>
                {update ? (
                    <>
                        {loggedIn ? (
                          <>
                            {userdata.id && (userdata.id.charAt(0) === "C" || userdata.id.charAt(0) === "S") ? (
                              <>
                                  <ProductsList className="below-nav main-content"
                                    products={products}
                                    cart={cart}
                                    setCart={(val) => setCart(val)}
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
                    </>)
                    :(<></>)}

              
              </>
            )}
          />

          {/* When logged as farmer or customer we shouldn't get here */}
          <Route
            path="/register"
            exact
            render={() => (
              <>
                {update ? (
                    <>
                      { loggedIn && (userdata.id.charAt(0) === "C" || userdata.id.charAt(0) === "F")  ? 
                        (<Redirect to="/home" />):(
                      /** REGISTER */
                      <NewClientForm className="below-nav main-content"
                        addUser={addUser}
                        getClientbyEmail={getSingleClientByEmail}
                        
                        />
                        )}
                    </>)
                    :(<></>)}
              </>
            )}
          />

          <Route
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
                            <Customer className="below-nav main-content"/>
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


          <Route
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

          <Route
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
                            <ClientData className="below-nav main-content"
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

          <Route
            path="/newOrder"
            exact
            render={() => (
              /** Employee new order page da poter includere nel componente employee con path='{$path}/newOrder'*/
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && (userdata.id.charAt(0) === "S" || userdata.id.charAt(0) === "C" ) ? (
                          <>
                            {/*<SidebarCustom />*/}
                            <BookingReview className="below-nav main-content"
                              cart={cart}
                              setCart={setCart}
                              clients={clients}
                              products={products}
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

          <Route
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
                            <BookingAcceptance className="below-nav main-content"
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

          <Route
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

          <Route
            exact
            path="/home"
            render={() => (
              <div className="width100">
                <CarouselCustom className="customCarousel" logged = {loggedIn} />
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
