import { Button, Modal, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

function Register() {
  return (
    <>
      <Redirect to="/register" />
    </>
  );
}

function Employee(props) {
  const [show, setShow] = useState(false);
  




  return (
    <>

      <Row>
        <h1 className="below-nav">Sono un impiegato lmao</h1>
      </Row>
      <Row>
        <Button
          onclick={() => {
            return (
              <>
                <Redirect to="/register" />
              </>
            );
          }}
        >
          New Client
        </Button>
      </Row>
      <Row>
        <Button
          onclick={setShow(true)}
        >
          Confirm Booking
        </Button>
      </Row>
    </>
  );
}

export default Employee;
