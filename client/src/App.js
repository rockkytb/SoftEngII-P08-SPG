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
  const [update, setUpdate] = useState(false);
  const [booking, setBooking] = useState();
  const history = useHistory();
  const [usedMail, setUsedMail] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.getUserInfo();
        console.log(user);
        setLoggedIn(true);
        setUserData(user);
        setUpdate(true);
      } catch (err) {
        console.error(err.error);
        setUpdate(true);
      }
    };
    checkAuth();
  }, []);

  const doLogIn = async (credentials, type) => {
    try {
      console.log("inside doLogin");
      console.log(credentials);
      const user = await API.logIn(credentials, type);
      toast.success(`Welcome ${user.username}!`, { position: "top-center" }) ;
      setUserData(user);
      setLoggedIn(true);
    } catch (err) {
      toast.error("Wrong email or/and password, try again", {
        position: "top-center",
      });
      console.log(err);
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
        booking.id = res.idBooking;
      }
    };
    book()
      .then(() =>
        toast.success("Booking completed", { position: "top-center" })
      )
      .catch((err) => toast.error(err.errors, { position: "top-center" }));
  };

  const newProductBooking = () => {
    //crea associazione tra prodotti e booking con quantità. parametri da passare da definire
    const bookingProduct = async () => {
      const res = await API.newBookingProduct();
    };
    bookingProduct()
      .then(() =>
        toast.success("Booking completed", { position: "top-center" })
      )
      .catch((err) =>
        toast.error(err.errors[0].msg, { position: "top-center" })
      );
  };

  /*const getClientbyEmail = (email) => {
    console.log("sono in get Client by email");
    const checkEmail = async () => {
      console.log("sono in check email");
      const id_client = await API.getClientByEmail(email);
      console.log("nella funzione id_client= " + id_client);
      setUsedMail(id_client);
    };
    checkEmail().catch((err) => {
      console.log(
        err
      ); /* toast.error(err.errors[0].msg, { position: "top-center" }) 
    });
  };*/

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
  }, [loggedIn]);

  const getSingleClientByEmail = (email) =>{
    let client = {};
    if(clients){
      client = clients.find(c => c.username == email);
    }
    if (client!= undefined){
      setUsedMail(client.id);
      return client;
    } 

    const findUser = async () => {
      try{
        const clientData = await API.getClientByEmail(email);
        setUsedMail(clientData.id);
        console.log(clientData);
        return clientData;
      }
      catch(err){
        console.log(err);
        return undefined;
      }
    }
    return findUser();
  }

  const getWalletById = async (id) =>{
    try{
      const wallet = await API.getWalletById(id.substring(1));
      console.log(wallet);
      return wallet;
    }
    catch(err){
      console.log(err);
    }
  }

  const setNewWallet = async (id, amount) =>{
    try{
      const response = await API.setNewWallet(id.substring(1), amount);
      toast.success("Wallet modified successfully", { position: "top-center" });
      return response;
    }
    catch(err){
      toast.error("Error updating the wallet", { position: "top-center" });
      console.log(err);
    }
  }



  return (
    <div className="page">
      <Router>
        <ToastContainer />
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
              <NewClientForm
                addUser={addUser}
                getClientbyEmail={getSingleClientByEmail}
                usedMail={usedMail}
              />
            )}
          />

          <Route
            path="/cust"
            exact
            render={() => (
              <>
                {update ? <>
                  {loggedIn ?
                    (<>
                      {userdata.id && userdata.id.charAt(0) === 'C' ?
                        (<>
                          <SidebarCustom />
                          <Customer />
                        </>)
                        : (<Redirect to="/home" />)
                      }
                    </>)

                    : (<Redirect to="/login" />)} </> : <></>
                }
              </>
            )}
          />

          <Route
            path="/cust/cart"
            exact
            render={() => (
              /** Customer cart  da poter includere nel componente customer con path='{$path}/cart'*/
              <>
                <BookingReview
                  cart={cart}
                  clients={clients}
                  products={products}
                  setCart={setCart}
                  newBooking={newBooking}
                  newProductBooking={newProductBooking}
                  getWallet={getWalletById}
                  className="below-nav main-content"
                />
              </>
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
                {update ? (
                  <>
                    {loggedIn ? (
                      <>
                        {userdata.id && userdata.id.charAt(0) === "S" ? (
                          <>
                            <SidebarCustom />
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
                {update ? <>
                  {loggedIn ?
                    (<>
                      {userdata.id && userdata.id.charAt(0) === 'S' ?
                        (<>
                          <SidebarCustom />
                          <ClientData
                            getClient = {getSingleClientByEmail}
                            getWallet = {getWalletById}
                            changeWallet={setNewWallet}
                            className="below-nav main-content"
                          />
                        </>)
                        : (<Redirect to="/home" />)
                      }
                    </>)

                    : (<Redirect to="/login" />)} </> : <></>
                }
              </>
            )}
          />

          <Route
            path="/emp/newOrder"
            exact
            render={() => (
              /** Employee new order page da poter includere nel componente employee con path='{$path}/newOrder'*/
              <>
                {update ? <>
                  {loggedIn ?
                    (<>
                      {userdata.id && userdata.id.charAt(0) === 'S' ?
                        (<>
                          <SidebarCustom />
                          <BookingReview
                            cart={cart}
                            clients={clients}
                            products={products}
                            setCart={setCart}
                            newBooking={newBooking}
                            newProductBooking={newProductBooking}
                            getWallet={getWalletById}
                            className="below-nav main-content"
                          />
                        </>)
                        : (<Redirect to="/home" />)
                      }
                    </>)

                    : (<Redirect to="/login" />)} </> : <></>
                }
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
                {update ? <>
                  {loggedIn ?
                    (<>
                      {userdata.id && userdata.id.charAt(0) === 'S' ?
                        (<>
                          <SidebarCustom className="below-nav" />
                        </>)
                        : (<Redirect to="/home" />)
                      }
                    </>)
                    : (<Redirect to="/login" />)} </> : <></>
                }
              </>
            )}
          />

          <Route
            exact
            path="/home"
            render={() => (
              <div className="width100">
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
