import React from 'react';
import { Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";

function Customer(props) {


  return (
    <>
          <h1 className="below-nav main-content text-center">I'm a customer</h1>
          <h4 className="text-center">Wallet Balance {props.wallet} €</h4>

          <Container fluid className = "text-center">
            <Row md={12}>
                <Col className="md-4 pr-0 pl-0 ">
                <Link to="/products"> 
                    <Button variant="warning" className="m-3 ml-2 md-1 "> Reserve products </Button> 
                </Link>
              </Col>
              <Col className="md-4 pr-0 pl-0 ">
                <Link to="/cust/orders"> 
                    <Button variant="warning" className="m-3 ml-2 md-1 "> See bookings </Button> 
                </Link>
              </Col>
            </Row>
        
          </Container>

    </>
  );
}

export default Customer;
