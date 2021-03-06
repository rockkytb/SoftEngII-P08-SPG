import React from 'react';
import { Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";

function WarehouseManager(props) {


  return (
    <>
          <h1 className="below-nav main-content text-center">I'm a warehouse manager</h1>

          <Container fluid className = "text-center">
            
            <Row md={12}>
                <Col className="md-4 pr-0 pl-0 ">
                <Link to="/acksManager"> 
                    <Button variant="warning" className="m-3 ml-2 md-1 "> Acknowledge deliveries </Button> 
                </Link>
              </Col>
            </Row>

            <Row md={12}>
                <Col className="md-4 pr-0 pl-0 ">
                <Link to="/pickupSchedule"> 
                    <Button variant="warning" className="m-3 ml-2 md-1 "> Pick-up Schedule </Button> 
                </Link>
              </Col>
            </Row>

          </Container>

    </>
  );
}

export default WarehouseManager;
