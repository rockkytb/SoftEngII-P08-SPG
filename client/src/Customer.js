import React from 'react';
import { Button, Modal, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Customer(props) {
  const [show, setShow] = useState(false);

  return (
    <>
          <h1 className="below-nav main-content">I'm a customer lul</h1>

          <div className="main-content">
            <Link to="./cart">
              <Button>Go to you cart</Button>
            </Link>

            <Link to="./newOrder">
              <Button>Make a new order</Button>
            </Link>
          </div>

    </>
  );
}

export default Customer;