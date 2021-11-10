import { Button, Modal, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

/*function Register() {
  return (
    <>
      <Redirect to="/register" />
    </>
  );
}*/

function Employee(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <h1 className="below-nav main-content">Sono un impiegato lmao</h1>

      <div className="main-content">
        <Link to="/register">
          <Button>New Client</Button>
        </Link>

        <Link to="./newOrder">
          <Button>Confirm Booking</Button>
        </Link>
      </div>
    </>
  );
}

export default Employee;
