import React from 'react';
import { Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";

function Farmer(props) {


  return (
    <>
          <h1 className="below-nav main-content text-center">I'm a farmer</h1>

          <Container fluid className = "text-center">
          <Row md={12}>
                <Col className="md-4 pr-0 pl-0 ">
                  <Link to="/confirmBookingFarmer"> 
                      <Button variant="warning" className="mr-2 ml-2 md-1 "> Confirm Booking </Button> 
                  </Link>

                  <Link to="/confirmDeliveryFarmer"> 
                      <Button variant="warning" className="mr-2 ml-2 md-1 "> Confirm Delivery </Button> 
                  </Link>

                  <Link to="/addFutureproducts"> 
                      <Button variant="warning" className="mr-2 ml-2 md-1 "> Add products </Button> 
                  </Link>
              </Col>
            </Row>
        
          </Container>

    </>
  );
}

export default Farmer;