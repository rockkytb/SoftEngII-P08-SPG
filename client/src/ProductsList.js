import React from 'react';
import { useState } from "react";
import {
  CardColumns,
  Card,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

export default function ProductsList(props) {
  const [showView, setShowView] = useState(false);

  const [productId, setProductId] = useState();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const [orderQuantity, setOrderQuantity] = useState(1);

  function handleAddToCart() {
    //TODO
    let product = { id: productId, name: name, quantity: orderQuantity, price: price }
    let tmp = props.cart.slice(0);
    tmp.push(product);
    props.setCart(tmp);
    props.products.forEach((p) => {
      if (p.id === product.id) p.quantity -= product.quantity;
    });
    //edit quantity live so that the product is reserved

    handleViewClose();
  }

  //const handleViewShow = () => setShowView(true);
  const handleViewClose = () => {
    setShowView(false);
    setProductId();
    setName("");
    setQuantity(1);
  };

  function productsActions() {
    return props.products.map((product) => (
      <Col>
        <Card>
          {/*TODO: <Card.Img variant="top" src={templateTraduction(props.template)}/>*/}
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              Price: {product.price}
              <br />
              Category:TODO
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                setProductId(product.id);
                setName(product.name);
                setQuantity(product.quantity);
                setPrice(product.price);
                setShowView(true);
              }}
            >
              Add to Garfield Kart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  }

  return (
    <>
      <Modal show={showView} onHide={handleViewClose}>
        <Modal.Header>
          <Modal.Title>Add to cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>{name}</Form.Label>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue="1"
                  default="1"
                  min="1"
                  max={quantity}
                  onChange={e => { setOrderQuantity(e.target.value); }}
                />
              </Form.Group>
            </Form>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddToCart()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <CardColumns xs={1} md={5}>
        <>{props.products.length ? productsActions() : <></>}</>
      </CardColumns>
    </>
  );
}
