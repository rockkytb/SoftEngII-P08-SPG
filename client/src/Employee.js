import { Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

function Register() {
  return (
    <>
      <Redirect to="/register" />
    </>
  );
}

function Employee() {
  const [show, setShow] = useState(false);

  return (
    <>
      <h1>Sono un impiegato lmao</h1>

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
    </>
  );
}

export default Employee;
