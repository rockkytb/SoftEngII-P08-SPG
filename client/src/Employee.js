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
      <h1 className="below-nav">Sono un impiegato lmao</h1>
      <Link to="/register">
        <Button
        //onClick={() => Register()}
        >
          New Client
        </Button>
      </Link>



      <Button
        onClick={() => setShow(true)}
      >
        Confirm Booking
      </Button>
    </>
  );
}

export default Employee;
