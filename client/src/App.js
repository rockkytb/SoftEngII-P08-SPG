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
} from "react-router-dom";
import Employee from "./Employee";
import SidebarCustom from "./Sidebar";
import API from "./API";
import NewClientForm from "./NewClientForm";
import { Login } from "./Login";
import ProductsList from "./ProductsList";
import BookingReview from "./BookingReview";
import Customer from "./Customer";
import Farmer from "./Farmer";
import WarehouseManager from "./WarehouseManager";
import Manager from "./Manager";
import ClientData from "./ClientData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingAcceptance from "./BookingAcceptance";
import BookingDeliveryFarmer from "./BookingDeliveryFarmer";
import BookingConfirmFarmer from "./BookingConfirmFarmer";
import AcknowledgeDeliveryManager from "./AcknowledgeDeliveryManager";
import CheckPending from "./CheckPending";
import ReportAvailability from "./ReportAvailability";
import WarehouseWorker from "./WarehouseWorker";
import PickupSchedule from "./PickupSchedule";
import PreparationConfirmFarmer from "./PreparationConfirmFarmer";
import OrderList from "./OrderList";
import BookingsUnretrieved from "./BookingsUnretrieved";

function App() {
  const [products, setProducts] = useState([]);
  const [futureProducts, setFutureProducts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [bookingsState, setBookingsState] = useState(true);
  const [attaccoDDOS, setAttaccoDDOS] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userdata, setUserData] = useState({});
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [virtualTime, setVirtualTime] = useState(false);
  const [firstTimeVc, setFirstTimeVc] = useState(true);
  const [timers, setTimers] = useState();
  const [confirmedProductsFarmer, setConfirmedProductsFarmer] = useState([]);
  const [deliveryState, setDeliveryState] = useState(true);
  const [categories, setCategories] = useState([]);
  const [acknowledges, setAcknowledges] = useState([]);
  const [ackState, setAckState] = useState(true);
  const [productsExpectedFarmer, setProductsExpectedFarmer] = useState([]);
  const [bookingsUnretrieved, setBookingsUnretrieved] = useState([]);
  const [customerWallet, setCustomerWallet] = useState (0);

  //const [booking, setBooking] = useState();
  //const history = useHistory();
  //const [usedMail, setUsedMail] = useState();

  //fake clock manager
  useEffect(() => {
    clearInterval(timers);
    if (virtualTime) {
      //Polling to server every 2 seconds
      API.enableDisableVirtualClock().then(() => {
        setTimers(
          setInterval(() => {
            API.getTime().then((serverDate) => setDate(new Date(serverDate)));
          }, 2000)
        );
      });
    } else {
      if (firstTimeVc) {
        setDate(new Date(date));
        setTimers(
          setInterval(() => {
            API.getTime().then((serverDate) => setDate(new Date(serverDate)));
          }, 10000)
        );
        setFirstTimeVc(false);
      } else {
        //Update date every 20 seconds if real time enabled
        API.enableDisableVirtualClock().then((date) => {
          setDate(new Date(date));
          setTimers(
            setInterval(() => {
              API.getTime().then((serverDate) => setDate(new Date(serverDate)));
            }, 10000)
          );
        });
      }
    }

    //SHORT-TERM: sends date to server
    //const resp = API.setDate(date.getDay());
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
      toast.success(
        `Welcome ${user.username}!`,
        { position: "top-center" },
        { toastId: 1 }
      );
      setUserData(user);
      setLoggedIn(true);
    } catch (err) {
      toast.error(
        err,
        {
          position: "top-center",
        },
        { toastId: 10 }
      );
    }
  };

  //logout
  const doLogOut = async () => {
    await API.logOut()
      .then(() =>
        toast.success(
          "Logout Succeeded",
          { position: "top-center" },
          { toastId: 2 }
        )
      )
      .catch(() =>
        toast.error(
          "Error during logout, try again",
          {
            position: "top-center",
          },
          { toastId: 11 }
        )
      );
    setLoggedIn(false);
    setUserData();
    setUpdate(true);
    setCart([]);
    setBookingsState(true);
    setDeliveryState(true);
  };

  //add user to system db
  const addUser = (newUser) => {
    const add = async () => {
      const res = await API.addUser(newUser);
      if (res && res.idClient) {
        newUser.id = res.idClient;
      }
      if (!loggedIn) {
        const credentials = {
          username: newUser.email,
          password: newUser.clearpsw,
        };
        doLogIn(credentials, "C");
      }
    };

    add()
      .then(() => {
        setAttaccoDDOS("update1");
        toast.success(
          "Registration completed",
          { position: "top-center" },
          { toastId: 3 }
        );
      })
      .catch((err) => {
        if (err.errors && err.errors[0]) {
          toast.error(err.errors, { position: "top-center" }, { toastId: 12 });
        } else {
          toast.error(err.error, { position: "top-center" }, { toastId: 13 });
        }
      });
  };

  //add booking to system db
  const newBooking = async (clientID, products) => {

    const book = async () => {
      const res = await API.newBooking(clientID, products);
      if (res && res.idBooking) {
        //setBooking({ id: res.idBooking });
        return res.idBooking;
      }
    };
    book()
      .then(() => setAttaccoDDOS("update4"))
      .catch((err) =>
        toast.error(err.errors, { position: "top-center" }, { toastId: 5 })
      );
  };

  const newProductMode = (booking) => {
    const bookingMode = async () => {
      await API.newBookingMode(booking);
    };
    bookingMode();
  };

  //update products, bookings and next week products
  useEffect(async () => {
    let tmp = await API.attaccoDoS(userdata);
    setProducts(tmp.products);
    setBookings(tmp.bookings);
    setClients(tmp.clients);
    setCategories(tmp.categories);
    if (userdata && userdata.id) {
      setProductsExpectedFarmer(
        userdata.id.charAt(0) === "F"
          ? tmp.products.filter((f) => f.state == "EXPECTED")
          : ""
      );
      setConfirmedProductsFarmer(
        userdata.id.charAt(0) === "F"
          ? tmp.products.filter((f) => f.state !== "EXPECTED")
          : ""
      );
    }
    if (userdata && userdata.id && userdata.id.charAt(0) === "S") {
      setAllBookings(tmp.allBookings);
    }
    if (userdata && userdata.id && userdata.id.charAt(0) === "C") {
      setCustomerWallet(tmp.wallet.balance.toFixed(2));
    }
    if (userdata && userdata.id && userdata.id.charAt(0) === "A") {
      setBookingsUnretrieved(tmp.bookingsUnretrieved);
    }
  }, [bookingsState, attaccoDDOS, loggedIn, userdata]);

  const addFutureProducts = async (id, products) => {
    let tmp = 0;
    await API.newFutureProduct(id.substring(1), products)
      .then((response) => {
        console.log("Tutto ok: " + response);
      })
      .catch((err) => console.log(err));
    return tmp;
  };

  //update acks manager
  useEffect(() => {
    if (loggedIn && ackState && userdata.id && userdata.id.charAt(0) === "M") {
      const getAcksManager = async () => {
        // call: GET /api/acksNew
        const response = await fetch("/api/acksNew");
        const ackList = await response.json();
        if (response.ok) {
          setAcknowledges(ackList);
        }
      };

      getAcksManager();
      setAckState(false);
    }
  }, [ackState, loggedIn]);

  const getSingleClientByEmail = async (email) => {
    const client = await API.getClientByEmail(email);
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
      toast.success(
        "Wallet modified successfully",
        { position: "top-center" },
        { toastId: 6 }
      );
      return response;
    } catch (err) {
      toast.error(
        "Error updating the wallet",
        { position: "top-center" },
        { toastId: 7 }
      );
      console.log(err);
    }
  };

  //complete booking
  const setCompletedBooking = async (id) => {
    try {
      await API.confirmBooking(id);
      toast.success(
        "Booking completed successfully",
        {
          position: "top-center",
        },
        { toastId: 8 }
      );
    } catch (err) {
      toast.error(
        "Error updating the booking",
        { position: "top-center" },
        { toastId: 9 }
      );
      console.log(err);
    }
  };

  const setReadAck = async (id) => {
    try {
      await API.confirmAck(id);
      setAckState(true);
      toast.success(
        "Delivery acknowledge",
        {
          position: "top-center",
        },
        { toastId: 14 }
      );
    } catch (err) {
      setAckState(true);
      toast.error(
        "Error updating the delivery",
        { position: "top-center" },
        { toastId: 15 }
      );
      console.log(err);
    }
  };

  const setCompletedDeliveryFarmer = async (productList) => {
    try {
      await API.confirmDeliveryProducts(productList);
      setDeliveryState(true);
      await API.newAck(userdata.id.substring(1), userdata.username);
      setAckState(true);
      toast.success(
        "Delivery completed successfully",
        {
          position: "top-center",
        },
        { toastId: 16 }
      );
    } catch (err) {
      toast.error(
        "Error updating the delivery",
        { position: "top-center" },
        { toastId: 17 }
      );
      console.log(err);
    }
  };

  const confirmProductsFarmer = async (productList) => {
    try {
      const confirmList = productList.map((product) => {
        return {
          id: product.id,
          state: "CONFIRMED",
        };
      });
      for (const product of confirmList) {
        await API.confirmProductsFarmer(product);
      }

      setDeliveryState(true);
      setAttaccoDDOS((old) => !old);
      toast.success(
        "Products confirmed successfully",
        {
          position: "top-center",
        },
        { toastId: 18 }
      );
    } catch (err) {
      toast.error(
        "Error with the confirmation",
        { position: "top-center" },
        { toastId: 19 }
      );
      console.log(err);
    }
    /*finally{
      setAttaccoDDOS(true);
    }*/
  };

  const confirmPreparation = async (id) => {
    try {
      await API.confirmPreparation(id);
      setAttaccoDDOS((old) => !old);
      toast.success(
        "Preparation confirmed",
        {
          position: "top-center",
        },
        { toastId: 20 }
      );
    } catch (err) {
      setAttaccoDDOS((old) => !old);
      toast.error(
        "Error confirming preparation",
        { position: "top-center" },
        { toastId: 21 }
      );
      console.log(err);
    }
  };

  const confirmPreparationFarmer = async (id) => {
    try {
      await API.confirmPreparationFarmer(id);
      setAttaccoDDOS((old) => !old);
      toast.success(
        "Preparation confirmed",
        {
          position: "top-center",
        },
        { toastId: 22 }
      );
    } catch (err) {
      setAttaccoDDOS((old) => !old);
      toast.error(
        "Error confirming preparation",
        { position: "top-center" },
        { toastId: 23 }
      );
      console.log(err);
    }
  };

  /////// ROUTES

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
          bookings={bookings}
        />

        <Switch>
          <Route //login
            exact
            path="/login"
            render={() => {
              if (loggedIn) {
                switch (userdata.id.charAt(0)) {
                  case "C":
                    return (
                      <>
                        <Redirect to="/cust" />;
                      </>
                    );
                  case "S":
                    return (
                      <>
                        <Redirect to="/emp" />;
                      </>
                    );
                  case "F":
                    return (
                      <>
                        <Redirect to="/farmer" />;
                      </>
                    );
                  case "M":
                    return (
                      <>
                        <Redirect to="/warehouseManager" />;
                      </>
                    );
                  case "W":
                    return (
                      <>
                        <Redirect to="/warehouseWorker" />;
                      </>
                    );
                  case "A":
                    return (
                      <>
                        <Redirect to="/manager" />;
                      </>
                    );
                  default:
                    return (
                      <>
                        <Redirect to="/" />;
                      </>
                    );
                }
              } else {
                return (
                  <>
                    <Login handleSubmit={doLogIn} />;
                  </>
                );
              }
            }}
          />

          <Route //display current products
            path="/products"
            exact
            render={() => (
              <>
                {setUpdate(true)}
                {update ? (
                  <>
                    {loggedIn &&
                    userdata.id &&
                    (userdata.id.charAt(0) === "F" ||
                      userdata.id.charAt(0) === "M" ||
                      userdata.id.charAt(0) === "W") ? (
                      <Redirect to="/home" />
                    ) : (
                      <>
                        {setAttaccoDDOS(true)}
                        <ProductsList
                          className="below-nav main-content"
                          products={products}
                          setProducts={setProducts}
                          cart={cart}
                          setCart={(val) => setCart(val)}
                          categories={categories}
                          loggedIn={loggedIn}
                          user={userdata}
                        //farmers = {farmers} //???
                        />
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          />

          <Route //add next week products
            path="/addFutureproducts"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "F" ? (
                          <>
                            {setAttaccoDDOS(true)}
                            <ReportAvailability
                              className="below-nav main-content"
                              addFutureProducts={addFutureProducts}
                              categories={categories}
                              setDirty={setAttaccoDDOS}
                              id={userdata.id ? userdata.id : ""}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
                          <>
                            <Redirect to="/home" />
                          </>
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
                      userdata.id.charAt(0) === "F" ||
                      userdata.id.charAt(0) === "M") ? (
                      <>
                        <Redirect to="/home" />
                      </>
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

          {/* Warehouse worker home page */}
          <Route
            path="/warehouseWorker"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "W" ? (
                          <>
                            {/*<SidebarCustom /> */}
                            <WarehouseWorker className="below-nav main-content" />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/acksManager"
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
                            <AcknowledgeDeliveryManager
                              className="below-nav main-content"
                              confirmAck={setReadAck}
                              acknowledges={acknowledges}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/warehouseManager"
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
                            <WarehouseManager className="below-nav main-content" />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/pickupSchedule"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id &&
                        (userdata.id.charAt(0) === "M" ||
                          userdata.id.charAt(0) === "W") ? (
                          <>
                            {/*<SidebarCustom /> */}
                            {setAttaccoDDOS("update15")}
                            <PickupSchedule
                              userdata={userdata}
                              className="below-nav main-content"
                              bookings={bookings}
                              confirmPreparation={confirmPreparation}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/bookingsUnretrieved"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "A" ? (
                          <>
                            {/*<SidebarCustom /> */}
                            {setAttaccoDDOS("update18")}
                            <BookingsUnretrieved
                              userdata={userdata}
                              className="below-nav main-content"
                              bookingsUnretrieved={bookingsUnretrieved}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/manager"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "A" ? (
                          <>
                            {/*<SidebarCustom /> */}
                            <Manager className="below-nav main-content" />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/confirmBookingFarmer"
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
                            <BookingConfirmFarmer
                              className="below-nav main-content"
                              expectedProducts={productsExpectedFarmer}
                              confirmProducts={confirmProductsFarmer}
                              calendarday={date}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/confirmPreparationFarmer"
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
                            <PreparationConfirmFarmer
                              className="below-nav main-content"
                              confirmedProducts={confirmedProductsFarmer}
                              confirmPreparationFarmer={
                                confirmPreparationFarmer
                              }
                              calendarday={date}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/confirmDeliveryFarmer"
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
                            <BookingDeliveryFarmer
                              className="below-nav main-content"
                              confirmedProducts={
                                confirmedProductsFarmer
                                  ? confirmedProductsFarmer
                                  : []
                              }
                              confirmDelivery={setCompletedDeliveryFarmer}
                              calendarday={date}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/cust"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {setAttaccoDDOS(true)}
                        {userdata.id && userdata.id.charAt(0) === "C" ? (
                          <>
                            {/*<SidebarCustom /> */}
                            <Customer className="below-nav main-content" wallet={customerWallet}/>
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
            path="/cust/orders"
            exact
            render={() => (
              <>
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {setAttaccoDDOS(false)}
                        {userdata.id && userdata.id.charAt(0) === "C" ? (
                          <>
                            {/*<SidebarCustom /> */}
                            <OrderList
                              className="below-nav main-content"
                              bookings={bookings}
                              products={products}
                              user={userdata}

                              updateOrder={async (product) => {
                                await API.updateOrder(product);
                                toast.success(
                                  "Booking updated",
                                  { position: "top-center" },
                                  { toastId: 24 }
                                );
                                setAttaccoDDOS((old) => !old);
                              }}
                              deleteProductBooking={async (product) => {
                                await API.deleteProductBooking(product);
                                toast.success(
                                  "Product removed",
                                  { position: "top-center" },
                                  { toastId: 25 }
                                );
                                setAttaccoDDOS((old) => !old);
                              }}
                              calendarday={date}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
                        {setAttaccoDDOS("update12")}
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
                          <>
                            <Redirect to="/home" />
                          </>
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
                            <ClientData
                              className="below-nav main-content"
                              clients={clients}
                              //getClient={getSingleClientByEmail}
                              getWallet={(id) => getWalletById(id)}
                              changeWallet={setNewWallet}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
                            {/* <SidebarCustom /> */ setAttaccoDDOS("update3")}
                            <CheckPending
                              className="below-nav main-content"
                              bookings={allBookings}
                              products={futureProducts}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
                              newBooking={newBooking}
                              newProductMode={newProductMode}
                              setBookingsState={setBookingsState}
                              getWallet={getWalletById}
                              calendarday={date}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
                            {/*<SidebarCustom />*/ setAttaccoDDOS("update13")}
                            <BookingAcceptance
                              className="below-nav main-content"
                              bookings={bookings}
                              confirmBooking={setCompletedBooking}
                              products={products}
                            />
                          </>
                        ) : (
                          <>
                            <Redirect to="/home" />
                          </>
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
                {setAttaccoDDOS("update2")}
                <CarouselCustom className="customCarousel" logged={loggedIn} />
              </div>
            )}
          />

          <Route
            path="/*"
            render={() => (
              <>
                <Redirect to="/home" />
              </>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
