import React from 'react';
import { Link } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";

function WarehouseWorker(props) {

  return (
    <>
          <h1 className="below-nav main-content text-center">I'm a warehouse worker</h1>

          <Container fluid className = "text-center">
            
          <Row md={12}>
                <Col className="md-4 pr-0 pl-0 ">
                <Link to="/pickupSchedule"> 
                    <Button variant="warning" className="m-3 ml-2 md-1 "> Pick-up Preparation </Button> 
                </Link>
              </Col>
            </Row>

          </Container>

    </>
  );
}

export default WarehouseWorker;