import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Alert,
  Card,
  Button,
  CardColumns,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import API from "./API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookingReview(props) {
  const [clientID, setClientID] = useState(props.clients[0].id);
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [soldy, setSoldy] = useState(0);

  async function newBooking(IDclient) {
    // DA VERIFICARE CON API È PER INSERIRE UN NUOVO BOOKING. MANDA ALL'API IL CLIENTID PRESO DAL BOOKING
    // sì però stai calmo
    let tmp = 0;

    const book = async () => {
      const res = await API.newBooking(IDclient);
      if (res && res.idBooking) {
        tmp = res.idBooking;
      }
    };
    book()
      .then(() => {
        toast.success("Booking completed", { position: "top-center" });
        props.cart.map((p) => {
          props.newProductBooking(tmp, p.id, p.quantity);
        });
        props.setBookingsState(true);
        props.setCart([]);
        handleClose();
      }
      )
      .catch((err) => toast.error(err.errors, { position: "top-center" }));
  };

  async function handleCreateBooking() {
    let tmpSoldy = await props.getWallet(clientID);
    let total = 0;
    let id;
    if (clientID)
      id = clientID.substring(1);


    setSoldy(tmpSoldy);

    props.cart.map((p) => {
      total += p.price;
    });

    if (total <= soldy) {
      newBooking(id)
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const getSoldy = async () => {
      let id;
      if (clientID)
        id = clientID.substring(1);
      const response = await fetch("/api/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const wallet = await response.json();
      if (response.ok) {
        setSoldy(wallet.balance);
      } else {
        throw wallet;
      }
    };
    if (clientID)
      getSoldy();
  }, [clientID]);

  function productsActions() {
    return props.cart.map((product) => (
      <Col>
        <Card className="text-dark">
          {/*TODO: <Card.Img variant="top" src={templateTraduction(props.template)}/>*/}
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>Unit Price: {product.price} €</Card.Text>
            <Card.Text>Total Price: {product.price * product.quantity} €</Card.Text>
            <Card.Text>Quantity: {product.quantity}</Card.Text>
            <Button
              variant="primary"
              onClick={() => {

                props.setProducts(oldList => {
                  const list = oldList.map((p) => {
                    if(product.id === p.id){
                      return {id: p.id, name: p.name, category: p.category, 
                        qty: p.qty + product.quantity *(1),
                        price:p.price, farmer_email:p.farmer_email};
                    }
                    else{
                      return p;
                    }
                  });
                  return list;
                });

                let array = props.cart.filter((p) => p.id !== product.id);
                props.setCart(array);
              }}
            >
              Remove from cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  }
  return (
    <div className="below-nav">
      <div class="col-md-12 text-center">
        <Link to={"/products"}>
          <Button className="mr-2 md-2 ">Back to products</Button>
        </Link>
      </div>
      <Alert show={showAlert} variant="danger">
        <Alert.Heading>Are you sure?!</Alert.Heading>
        <p>
          You are going to erase the cart, win32 and possibly destroy the
          Universe. Do you really want to?
        </p>
        <hr />
        <div className="d-flex justify-content-end">
            <Button
              onClick={() => {
                props.cart.forEach(product => {
                  props.setProducts(oldList => {
                    const list = oldList.map((p) => {
                      if(product.id === p.id){
                        return {id: p.id, name: p.name, category: p.category, 
                          qty: p.qty + product.quantity *(1),
                          price:p.price, farmer_email:p.farmer_email};
                      }
                      else{
                        return p;
                      }
                    });
                    return list;
                  });
                  
                  
                });
                
                props.setCart([]);
                setShowAlert(false);
              }}
            >
              You may fire when ready.
            </Button>
          
        </div>
      </Alert>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Select Client</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setClientID(e.target.value)}
                >
                  {props.clients.length > 0 ? (
                    props.clients.map((c) => (
                      <option value={c.id}>
                        {c.name} {c.surname}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" id="closeModal" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" id="submitModal" onClick={() => handleCreateBooking()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <CardColumns xs={1} md={5}>
        <>{props.cart.length ? productsActions() : <></>}</>
      </CardColumns>
      {props.cart.length ? (

          <Row>
            <Col md={4} />
            <Col className="md-2 text-right">
              <Button variant="secondary" onClick={() => setShowAlert(true)}>
                Empty Cart
              </Button>
            </Col>
            <Col className="md-2 text-left">
                <Button variant="primary" id="butConf" onClick={() => setShow(true)}>
                  Confirm Booking
                </Button>
            </Col>
            <Col md={4} />
          </Row>

      ):(<><h3 className = "text-center">Your cart is empty</h3></>)}
      
    </div>
  );
}

export default BookingReview;
