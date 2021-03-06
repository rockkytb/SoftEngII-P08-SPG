import React from "react";
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
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "react-bootstrap/Image";
import ImageFinder from "./ImageFinder.js";

function BookingReview(props) {
  const [clientID, setClientID] = useState(
    props.userdata.id.charAt(0) === "S"
      ? props.clients[0].id
      : props.userdata.id
  );
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertTime, setShowAlertTime] = useState(false);
  const [showAlertPickUp, setShowAlertPickUp] = useState(false);
  const [show, setShow] = useState(false);

  const [showNoValidation, setShowNoValidation] = useState(false);

  const [deliveryMode, setDeliveryMode] = useState(false);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [extraFee, setExtraFee] = useState(0);
  const [validated, setValidated] = useState(false);

  function computeMaxDate(){
    const date= new Date();
    /*We want to have next week, not the current weeks because confirmations
    happens saturday and sunday*/
    if(date.getDay()===4 || date.getDay()===5)
      date.setDate(date.getDate() + 7);
    while(date.getDay()!==5){
      date.setDate(date.getDate() + 1);
    }
    return date.toISOString().split("T")[0];
  }

  function computeMinDate(){
    const date= new Date();
    while(date.getDay()!==3){
      date.setDate(date.getDate() + 1);
    }
    return date.toISOString().split("T")[0];
  }

  async function newBooking(IDclient) {

    let tmp = 0;

    const book = async () => {
      tmp = await props.newBooking(IDclient, props.cart);
    };
    book()
      .then(() => {
        props.newProductMode({
          idBooking: tmp,
          delivery: deliveryMode ? 1 : 0,
          street: street,
          city: city,
          province: province,
          postal_code: postalCode,
          country: country,
          date: date,
          time: time,
          extra_fee: deliveryMode ? 5 : 0,
        });
        props.setBookingsState(true);
        props.setCart([]);
        toast.success("Booking completed", { position: "top-center" },{toastId: 26});
        handleClose();
      })
      .catch((err) => toast.error(err.errors, { position: "top-center" },{toastId: 27}));
  }

  const handleClose = () => {
    setDate("");
    setTime("");
    setCountry("");
    setProvince("");
    setCity("");
    setStreet("");
    setPostalCode("");
    setValidated(false);
    setShow(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const handleCreateBooking = async () => {
      const pickupdate = new Date(date);

      if (
        pickupdate.getDay() === 3 ||
        pickupdate.getDay() === 4 ||
        pickupdate.getDay() === 5
      ) {
        if (
          deliveryMode &&
          (street === null ||
            street === "" ||
            city === null ||
            city === "" ||
            province === null ||
            province === "" ||
            postalCode === null ||
            postalCode === "" ||
            country === null ||
            country === "")
        ) {
          setShowNoValidation(true);
        } else {
          let id;
          if (clientID) {
            id = clientID.substring(1);
            newBooking(id);
          }
        }
      } else {
        setShowAlertPickUp(true);
      }
    };

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      handleCreateBooking();
      setValidated(true);
    }
  };

  function productsActions() {
    return props.cart.map((product) => (
      <Col>
        <Card className="text-dark">
          {/*TODO: <Card.Img variant="top" src={templateTraduction(props.template)}/>*/}
          <Card.Body>
            <Card.Title><h4>{product.name}</h4><h6> {product.size} {product.unit_of_measure}</h6></Card.Title>
            <Card.Text>
              <Row>
                <Col xs={7}>
                  <b>Price:</b> {product.price} ??? <br />
                
                  <b>Total Price:</b> {(product.price * product.quantity).toFixed(2)} ??? <br />
                
                  <b>Quantity:</b> {product.quantity}
                </Col>
                <Col xs={5}>
                    <Image src={ImageFinder(product.name.toLowerCase())} rounded fluid />
                </Col>
              </Row>
            </Card.Text>
            <Button
              variant="warning"
              onClick={() => {
                props.setProducts((oldList) => {
                  const list = oldList.map((p) => {
                    if (product.id === p.id) {
                      return {
                        id: p.id,
                        name: p.name,
                        category: p.category,
                        qty: p.qty + product.quantity * 1,
                        price: p.price,
                        farmer_email: p.farmer_email,
                      };
                    } else {
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
    <div className="below-nav no-flickr">
      <div class="col-md-12 text-center">
        <Link to={"/products"}>
          <Button variant="warning" className="mr-2 md-2 ">
            Back to products
          </Button>
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
            variant="warning"
            id="removeButton"
            onClick={() => {
              props.cart.forEach((product) => {
                props.setProducts((oldList) => {
                  const list = oldList.map((p) => {
                    if (product.id === p.id) {
                      return {
                        id: p.id,
                        name: p.name,
                        category: p.category,
                        qty: p.qty + product.quantity * 1,
                        price: p.price,
                        farmer_email: p.farmer_email,
                      };
                    } else {
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

      <Alert show={showAlertTime} variant="danger">
        <Alert.Heading>You cannot confirm booking now</Alert.Heading>
        <p>
          Bookings must happen only from 10 am of Saturday until 23 pm of Sunday
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            variant="warning"
            onClick={() => {
              setShowAlertTime(false);
            }}
          >
            Close
          </Button>
        </div>
      </Alert>

      <Modal show={show} onHide={handleClose}>
        <Alert show={showAlertPickUp} variant="danger">
          <Alert.Heading>You cannot choose this date</Alert.Heading>
          <p>Pick up or deliveries must happen only from Wednesday to Friday</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              variant="warning"
              onClick={() => {
                setShowAlertPickUp(false);
              }}
            >
              Close
            </Button>
          </div>
        </Alert>

        <Alert show={showNoValidation} variant="danger">
          <Alert.Heading>Please fill al fields</Alert.Heading>
          <p>All fields are mandatory</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              variant="warning"
              onClick={() => {
                setShowNoValidation(false);
              }}
            >
              Close
            </Button>
          </div>
        </Alert>

        <Modal.Header>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {props.userdata.id.charAt(0) === "S" && (
                <Form.Group>
                  <Form.Label>
                    <h3>Select Client</h3>
                  </Form.Label>
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
              )}
              <Form.Label>
                <h3>Delivery Options</h3>
              </Form.Label>

              <Row className="text-center">
                <Col xs={2} />
                <Col xs={8}>
                  <Form.Group id="DeliveryMode">
                    <Form.Check
                      type="checkbox"
                      label="Delivery at home?"
                      checked={deliveryMode}
                      onChange={() => setDeliveryMode(!deliveryMode)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={2} />
              </Row>

              <Row>
                <Col xs={2} />
                <Col xs={8}>
                  <Form.Label>
                    {deliveryMode ? (
                      <h5> Delivery at home with extra fee of 5 euros </h5>
                    ) : (
                      <h5> Pick-Up in Shop </h5>
                    )}
                  </Form.Label>
                </Col>
                <Col xs={2} />
              </Row>

              {deliveryMode ? (
                <>
                  <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                      <Form.Group size="lg" controlId="date">
                        <Form.Label>Date: </Form.Label>
                        <Form.Control
                          type="date"
                          value={date}
                          min={computeMinDate()}
                          max={computeMaxDate()}
                          required
                          onChange={(ev) => setDate(ev.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please insert a date.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={2} />
                  </Row>

                  <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                      <Form.Group size="lg" controlId="time">
                        <Form.Label>Time: </Form.Label>
                        <Form.Control
                          type="time"
                          value={time}
                          required
                          onChange={(ev) => setTime(ev.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please insert a time.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={2} />
                  </Row>

                  <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                      <Form.Group size="lg" controlId="country">
                        <Form.Label>Country: </Form.Label>
                        <Form.Control
                          autoFocus
                          type="text"
                          value={country}
                          required
                          onChange={(ev) => setCountry(ev.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please insert a country.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={2} />
                  </Row>

                  <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                      <Form.Group size="lg" controlId="country">
                        <Form.Label>Province: </Form.Label>
                        <Form.Control
                          type="text"
                          value={province}
                          required
                          onChange={(ev) => setProvince(ev.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please insert a province.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={2} />
                  </Row>

                  <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                      <Form.Group size="lg" controlId="country">
                        <Form.Label>City: </Form.Label>
                        <Form.Control
                          type="text"
                          value={city}
                          required
                          onChange={(ev) => setCity(ev.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please insert a city.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={2} />
                  </Row>

                  <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                      <Form.Group size="lg" controlId="country">
                        <Form.Label>Address: </Form.Label>
                        <Form.Control
                          type="text"
                          value={street}
                          required
                          onChange={(ev) => setStreet(ev.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please insert a address.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={2} />
                  </Row>

                  <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                      <Form.Group size="lg" controlId="country">
                        <Form.Label>Postal Code: </Form.Label>
                        <Form.Control
                          type="text"
                          value={postalCode}
                          required
                          onChange={(ev) => setPostalCode(ev.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please insert a postal code.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={2} />
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                      <Form.Group size="lg" controlId="date">
                        <Form.Label>Date: </Form.Label>
                        <Form.Control
                          type="date"
                          value={date}
                          min={computeMinDate()}
                          max={computeMaxDate()}
                          required
                          onChange={(ev) => setDate(ev.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please insert a date.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={2} />
                  </Row>

                  <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                      <Form.Group size="lg" controlId="time">
                        <Form.Label>Time: </Form.Label>
                        <Form.Control
                          type="time"
                          value={time}
                          required
                          onChange={(ev) => setTime(ev.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please insert a time.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={2} />
                  </Row>
                </>
              )}
              <Row className="justify-content-center">
                <Button
                  className="mr-1"
                  variant="secondary"
                  id="closeModal"
                  onClick={handleClose}
                >
                  Close
                </Button>

                <Button
                  className="ml-1"
                  type="submit"
                  variant="warning"
                  color="black"
                  id="submitModal"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Col>
        </Modal.Body>
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
            <Button
              variant="warning"
              color="black"
              id="butConf"
              onClick={() => {
                //BOOKINGS may happen only between saturday 10 am until sunday 23
                if (
                  (props.calendarday.getDay() === 6 &&
                    props.calendarday.getHours() >= 10) ||
                  (props.calendarday.getDay() === 0 &&
                    props.calendarday.getHours() < 23)
                ) {
                  setShow(true);
                } else {
                  setShowAlertTime(true);
                }
              }}
            >
              Confirm Booking
            </Button>
          </Col>
          <Col md={4} />
        </Row>
      ) : (
        <>
          <h3 className="text-center">Your cart is empty</h3>
        </>
      )}
    </div>
  );
}

export default BookingReview;
