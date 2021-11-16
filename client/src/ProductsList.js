import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CardColumns, Card, Col, Button, Modal, Form } from "react-bootstrap";

export default function ProductsList(props) {
  const [showView, setShowView] = useState(false);

  const [productId, setProductId] = useState();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const [orderQuantity, setOrderQuantity] = useState(1);

  function handleAddToCart() {
    let update = 0;
    let product = {
      id: productId,
      name: name,
      quantity: orderQuantity,
      price: price,
    };
    
    props.setCart((oldList) => {

        const list = oldList.map((item)=>{
          if (item.id === product.id)
            {
              update = 1;
              return {
                id: productId,
                name: name,
                quantity: (product.quantity*1) + (item.quantity *1),
                price: price,
              };
            }
          else
          {
            return item;
          }
        });
        return list;
    });
    /*props.products.forEach((p) => {
      if (p.id === product.id) p.qty -= orderQuantity;
    });*/
    if (update === 0){
      props.setCart(oldList =>{ return [product, ...oldList];});
    }
    //edit quantity live so that the product is reserved
    
    handleViewClose();
  }

  
  const handleViewClose = () => {
    setShowView(false);
    setProductId();
    setName("");
    setQuantity(1);
  };

  function productsActions() {
    return props.products.map((product) => (
      <Col>
        <Card className="text-dark">
          {/*TODO: <Card.Img variant="top" src={templateTraduction(props.template)}/>*/}
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              Unit Price: {product.price} €
              <br />
              Category: {product.category}
              <br />
              Available quantity: {product.qty}
              <br />
              Farmer : {product.farmer_email}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                setProductId(product.id);
                setName(product.name);
                setQuantity(product.qty);
                setPrice(product.price);
                setShowView(true);
              }}
            >
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  }

  return (
    <>
      <div className="below-nav">
      <div class="col-md-12 text-center">
        <Link to="/emp/newOrder">
          <Button className="mr-2 md-2 ">Go to cart</Button>
        </Link>
      </div>
        <Modal show={showView} onHide={handleViewClose}>
          <Modal.Header>
            <Modal.Title>Add to cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>{name}</Form.Label>
                  <Form.Label>: Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue="1"
                    default="1"
                    min="1"
                    max={quantity}
                    onChange={(e) => {
                      if (e.target.value > 0 && e.target.value <= quantity){
                        setOrderQuantity(e.target.value);}
                      if (e.target.value < 0) {setOrderQuantity(1);}
                      if (e.target.value > quantity) {setOrderQuantity(quantity);}
                    }}
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
      </div>
    </>
  );
}
