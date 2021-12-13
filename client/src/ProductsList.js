import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CardColumns, Card, Row,Col, Button, Modal, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import ImageFinder from "./ImageFinder.js";

export default function ProductsList(props) {
  const [showView, setShowView] = useState(false);

  const [productId, setProductId] = useState();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [unitOfMeasure, setUnitOfMeasure] = useState("");

  //FILTERS
  const[categoryFilter,setCategoryFilter]= useState([]);
  const[farmerFilter,setFarmerFilter]= useState([]);

  const [orderQuantity, setOrderQuantity] = useState(1);


  const availableCategories = Array.from(new Set(props.products.map(p=>p.category)));
  const availableFarmers = Array.from(new Set(props.products.map(p=>p.farmer_email)));

  
  function handleAddToCart() {
    let update = 0;
    let product = {
      id: productId,
      name: name,
      quantity: orderQuantity,
      price: price,
      size: size,
      unit_of_measure: unitOfMeasure
    };

    props.setCart((oldList) => {
      const list = oldList.map((item) => {
        if (item.id === product.id) {
          update = 1;
          return {
            id: productId,
            name: name,
            quantity: product.quantity * 1 + item.quantity * 1,
            price: price,
          };
        } else {
          return item;
        }
      });
      return list;
    });

    props.setProducts((oldList) => {
      const list = oldList.map((p) => {
        if (product.id === p.id) {
          return {
            id: p.id,
            name: p.name,
            category: p.category,
            qty: p.qty - orderQuantity * 1,
            price: p.price,
            farmer_email: p.farmer_email,
          };
        } else {
          return p;
        }
      });
      return list;
    });

    if (update === 0) {
      props.setCart((oldList) => {
        return [product, ...oldList];
      });
    }
    //edit quantity live so that the product is reserved

    handleViewClose();
  }

  const handleViewClose = () => {
    setShowView(false);
    setProductId();
    setName("");
    setQuantity(1);
    setSize(0);
    setUnitOfMeasure("");
  };

  const prodotti = categoryFilter.length === 0 ? (props.products):(props.products.filter(p=>categoryFilter.includes(p.category)));
  const filteredProducts = farmerFilter.length === 0 ? (prodotti):(prodotti.filter(p=>farmerFilter.includes(p.farmer_email)));


  //DEFAULT, SORTED IN ALPHABETIC ORDER
  function productsActions() {
    //TOCHECK: problems into modifying a prop?
    //the product must be one from next week so it must be not already confirmed
    return filteredProducts.sort((a, b) => {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return a.id - b.id;
    }).map((product) => {
      console.log(product);
      return (
        <Col>
          <Card className="text-dark">
            {/*TODO: <Card.Img variant="top" src={templateTraduction(props.template)}/>*/}
            <Card.Body>
              <Card.Title><h4>{product.name}</h4><h6> {product.size} {product.unit_of_measure}</h6></Card.Title>
              <Card.Text>
                <Row>
                  <Col xs={7}>
                    <b>Price:</b> {product.price} € 
                    <br />
                    <b>Category:</b> {product.category}
                    <br />
                    <b>Available quantity:</b> {product.qty}
                    <br />
                    <b>Farmer:</b> {product.farmer_email}
                  </Col>
                  <Col xs={5}>
                    <Image src={ImageFinder(product.name.toLowerCase())} rounded fluid />
                  </Col>
                </Row>
              </Card.Text>
              <Button
                variant="warning"
                id={"addCart"+product.id}
                onClick={() => {
                  setProductId(product.id);
                  setName(product.name);
                  setQuantity(product.qty);
                  setPrice(product.price);
                  setSize(product.size);
                  setUnitOfMeasure(product.unit_of_measure);
                  setShowView(true);
                }}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      )
    });
  }

  return (
    <>
      <div className="below-nav no-flickr">
        <Row className="pb-4">
          <Col md={3} xs={4} className="pr-1 text-right">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {availableCategories.map((c,catid)=>(<>
                  <Dropdown.Item id={"catFilter"+c} onClick={() => {
                        if(categoryFilter.includes(c)){
                          setCategoryFilter(oldList => {return oldList.filter(cat => cat !== c);});
                        }
                        else{
                          setCategoryFilter(oldList => {return oldList.concat(c);});
                        }
                      
                        }}>
                  <Form.Group id={catid}>
                    <Form.Check
                      type="checkbox"
                      label={c}
                      checked={categoryFilter.includes(c)}
                    />
                  </Form.Group>
                </Dropdown.Item>
                </>))}
                
                
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3} xs={4} className="text-left">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Farmer
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {availableFarmers.map((f,farmerid)=>(<>
                  <Dropdown.Item id={"farmerFilter"+f.charAt(0)+f.charAt(1)} onClick={() => {
                        console.log(farmerFilter);
                        if(farmerFilter.includes(f)){
                          setFarmerFilter(oldList => {return oldList.filter(farmer => farmer !== f);});
                        }
                        else{
                          setFarmerFilter(oldList => {return oldList.concat(f);});
                        }
                      
                        }}>
                  <Form.Group id={farmerid}>
                    <Form.Check
                      type="checkbox"
                      label={f}
                      checked={farmerFilter.includes(f)}
                    />
                  </Form.Group>
                </Dropdown.Item>
                </>))}
                </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={6} xs={4} className="text-left p-0">
            <Link to={"/newOrder"}>
              <Button variant="warning" className="mr-2 md-2 ">View cart</Button>
            </Link>
          </Col>
        </Row>
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
                    }}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button id="closeButton" variant="secondary" onClick={handleViewClose}>
              Close
            </Button>
            <Button id="submitButton" variant="warning" onClick={() => handleAddToCart()}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <CardColumns xs={1} md={5}>
          <>{filteredProducts.length > 0 ? productsActions() : <>No products available</>}</>
        </CardColumns>
      </div>
    </>
  );
}
