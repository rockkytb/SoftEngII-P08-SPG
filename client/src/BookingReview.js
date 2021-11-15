import React, { useEffect } from "react";
import {
  Modal,
  Form,
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

  async function newBooking(clientID) {
    // DA VERIFICARE CON API È PER INSERIRE UN NUOVO BOOKING. MANDA ALL'API IL CLIENTID PRESO DAL BOOKING
    // sì però stai calmo
    let tmp = 0;

    const book = async () => {
      const res = await API.newBooking(clientID);
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
      }
      )
      .catch((err) => toast.error(err.errors, { position: "top-center" }));
  };

  async function handleCreateBooking() {
    let tmpSoldy = await props.getWallet(clientID);
    let total = 0;
    let id;
    if(clientID)
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
      if(clientID)
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
            <Card.Text>Price: {product.price}</Card.Text>
            <Card.Text>Quantity: {product.quantity}</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                props.products.map((x) => {
                  if (x.id === product.id) x.qty += product.quantity*1;
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
    <>
      <Alert show={showAlert} variant="success">
        <Alert.Heading>Are you sure?!</Alert.Heading>
        <p>
          You are going to erase the cart, win32 and possibly destroy the
          Universe. Do you really want to?
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Link to="/home">
            <Button
              onClick={() => {
                props.setCart([]);
              }}
            >
              You may fire when ready.
            </Button>
          </Link>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateBooking()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <CardColumns xs={1} md={5}>
        <>{props.cart.length ? productsActions() : <></>}</>
      </CardColumns>

      <Button variant="secondary" onClick={() => setShowAlert(true)}>
        Cancel
      </Button>

      <Button variant="primary" onClick={() => setShow(true)}>
        Confirm
      </Button>
    </>
  );
}

export default BookingReview;
