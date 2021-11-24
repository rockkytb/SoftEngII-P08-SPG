import React from 'react';
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Employee(props) {


  return (
    <>
      <h1 className="below-nav main-content">I'm an Employee</h1>

      <Container fluid className="text-center">
        <Row md={12}>
          <Col className="md-4 pr-0 pl-0 ">

            <Link to="/register">
              <Button className="mr-2 ml-2 md-1 ">New Client</Button>
            </Link>
            <Link to="/emp/clientData">
              <Button className="mr-2 ml-2 md-1 ">Manage clients wallet</Button>
            </Link>

            <Link to="/products">
              <Button className="mr-2 ml-2 md-1 ">New Booking</Button>
            </Link>

            <Link to="/emp/confirmOrder">
              <Button className="mr-2 ml-2 md-1 ">Set bookings as completed</Button>
            </Link>
            <Link to="/products">
              <Button className="mr-2 ml-2 md-1 "> Browse Available products </Button>
            </Link>
            <Link to="/emp/pending">
              <Button className="mr-2 ml-2 md-1 "> Check Pending Cancellation </Button>
            </Link>

          </Col>
        </Row>






        {/*<Link to="/emp/newOrder">
          <Button className="mr-2 md-2 ">Confirm Booking</Button>
        </Link>*/}


      </Container>
    </>
  );
}

export default Employee;
