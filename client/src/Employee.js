import React from 'react';
import { Button, } from "react-bootstrap";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Employee(props) {
  //const [show, setShow] = useState(false);

  return (
    <>
      <h1 className="below-nav main-content">Sono un impiegato lmao</h1>

      <div className="main-content">
        <Link to="/register">
          <Button className="mr-2 md-2 ">New Client</Button>
        </Link>

        <Link to="/emp/clientData">
          <Button className="mr-2 md-2 ">Manage client data</Button>
        </Link>

        <Link to="/products">
          <Button className="mr-2 md-2 ">New Booking</Button>
        </Link>

        <Link to="/emp/newOrder">
          <Button className="mr-2 md-2 ">Confirm Booking</Button>
        </Link>

        <Link to="/emp/confirmOrder">
          <Button className="mr-2 md-2 ">Set bookings as completed</Button>
        </Link>
      </div>
    </>
  );
}

export default Employee;
