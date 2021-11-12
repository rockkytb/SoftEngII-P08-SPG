import React from 'react';
import { Button, Modal, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Employee(props) {
  //const [show, setShow] = useState(false);

  return (
    <>
      <h1 className="below-nav main-content">Sono un impiegato lmao</h1>

      <div className="main-content">
        <Link to="/register">
          <Button className="mr-2 ">New Client</Button>
        </Link>

        <Link to="/emp/clientData">
          <Button className="mr-2 ">Manage client data</Button>
        </Link>

        <Link to="/emp/newOrder">
          <Button>Confirm Booking</Button>
        </Link>
      </div>
    </>
  );
}

export default Employee;
