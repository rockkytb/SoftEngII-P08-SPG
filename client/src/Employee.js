import React from 'react';
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Employee(props) {


  return (
    <>
      <h1 className="below-nav main-content text-center">I'm an Employee</h1>

      <Container fluid className="text-center">
        <Row md={12}>
          <Col className="md-4 pr-0 pl-0 ">

            <Link to="/register">
              <Button variant="warning" className="m-3 ml-2 md-1 ">New Client</Button>
            </Link>
            <Link to="/emp/clientData">
              <Button variant="warning" className="m-3 ml-2 md-1 ">Manage clients wallet</Button>
            </Link>

            <Link to="/products">
              <Button variant="warning" className="m-3 ml-2 md-1 ">New Booking</Button>
            </Link>

            <Link to="/emp/confirmOrder">
              <Button variant="warning" className="m-3 ml-2 md-1 ">Set bookings as completed</Button>
            </Link>
            <Link to="/products">
              <Button variant="warning" className="m-3 ml-2 md-1 "> Browse Available products </Button>
            </Link>
            <Link to="/emp/pending">
              <Button variant="warning" className="m-3 ml-2 md-1 "> Check Pending Cancelation </Button>
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
