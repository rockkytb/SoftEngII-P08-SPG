import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CardColumns,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import ImageFinder from "./ImageFinder.js";

export default function ProductsList(props) {
  const [showView, setShowView] = useState(false);

  const [productId, setProductId] = useState();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [bookingId, setBookingId] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(1);

  function handleAddToCart() {

      let product = {
        ID_Booking: bookingId,
        ID_Product: productId,
        quantity: orderQuantity,
      };

    
    handleViewClose();
  }


  const handleViewClose = () => {
    setProductId(0);
    setBookingId(0);
    setOrderQuantity(0);
    setName("");
    setQuantity(0);
    setShowView(false);
  };

  //DEFAULT, SORTED IN ALPHABETIC ORDER
  function productsActions() {
    //TOCHECK: problems into modifying a prop?
    //the product must be one from next week so it must be not already confirmed
    props.bookings.map((book) => {
      return (
        <Col>
          <Card className="text-dark">
            {/*TODO: <Card.Img variant="top" src={templateTraduction(props.template)}/>*/}
            <Card.Body>
              <Card.Title>
                <h4>Booking #{book.id}</h4>
              </Card.Title>
              <Card.Text>
                <Row>
                  <Col xs={7}>
                    <b>Product:</b> {book.product}
                    <br />
                    <b>Quantity:</b> {book.qty}
                    <br />
                  </Col>
                  <Col xs={5}>
                    <Image
                      src={ImageFinder(book.product.toLowerCase())}
                      rounded
                      fluid
                    />
                  </Col>
                </Row>
              </Card.Text>
              <Button
                variant="warning"
                onClick={() => {
                    if (
                        (props.calendarday.getDay() === 6 &&
                          props.calendarday.getHours() >= 10) ||
                        (props.calendarday.getDay() === 0 &&
                          props.calendarday.getHours() < 23)
                      ) {
                        setProductId(book.idProd);
                        setBookingId(book.id);
                        setOrderQuantity(book.qty);
                        setName(book.product);
                        let tmp = props.products.find((f) => f.id === book.idProd);
                        setQuantity(tmp.qty);
                        setShowView(true);
                      } else {
                        setShowAlertTime(true);
                      }

                }}
              >
                Update quantity
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  }

  return (
    <>
      <div className="below-nav no-flickr">

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

        <Modal show={showView} onHide={handleViewClose}>
          <Modal.Header>
            <Modal.Title>Edit quantity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>{name}</Form.Label>
                  <Form.Label>: Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    id="qtyButton"
                    defaultValue="1"
                    default="1"
                    min="1"
                    max={quantity}
                    onChange={(e) => {
                      if (e.target.value > 0 && e.target.value <= quantity) {
                        setOrderQuantity(e.target.value);
                      }
                      if (e.target.value < 0) {
                        setOrderQuantity(1);
                      }
                      if (e.target.value > quantity) {
                        setOrderQuantity(quantity);
                      }
                      console.log(quantity);
                    }}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id="closeButton"
              variant="secondary"
              onClick={handleViewClose}
            >
              Close
            </Button>
            <Button
              id="submitButton"
              variant="warning"
              onClick={() => handleAddToCart()}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <CardColumns xs={1} md={5}>
          <>
            {props.bookings && props.bookings.length > 0 ? (
              productsActions()
            ) : (
              <>No products available</>
            )}
          </>
        </CardColumns>
      </div>
    </>
  );
}
