import { Modal, Form, Row, Col, Alert } from "react-bootstrap";

function BookingReview(props) {
  const [clientID, setClientID] = useState();
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  async function handleCreateBooking() {
    let bookingID = await fetch("/api/bokings/", {
      method: "POST",
    });

    handleClose();
  }

  const handleClose = () => {
    setShow(false);
    
  };

  function cancelOrder() {
    

    return (
      <>
        <Alert show={showAlert} variant="success">
          <Alert.Heading>Are you sure?!</Alert.Heading>
          <p>
            You are going to erase the cart, win32 and possibly destroy the
            Universe. Do you really want to?
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Link to="/home">
              <Button
                onClick={() => {
                  props.cart = [];
                }}
              >
                You may fire when ready.
              </Button>
            </Link>
          </div>
        </Alert>
      </>
    );
  }

  function productsActions() {
    return props.cart.map((product) => (
      <Col>
        <Card>
          {/*TODO: <Card.Img variant="top" src={templateTraduction(props.template)}/>*/}
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>Price: {product.price}</Card.Text>
            <Card.Text>Quantity: {product.quantity}</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                props.cart.filter((p) => p.id !== product.id);
              }}
            >
              Remove Garfield from Lasagna
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  }
  return (
    <>
      <Modal show={showView} onHide={handleViewClose}>
        <Modal.Header>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Select Client</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setClientID(e.target.value)}
                >
                  {props.clients.map((c) => (
                    <option value={c.id}>
                      {c.name} {c.surname}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCreateBooking()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Button variant="secondary" onClick={() => setShowAlert(true)}>
        Cancel
      </Button>

      <Button variant="primary" onClick={() => setShow(true)}>
        Confirm
      </Button>
    </>
  );
}

export default { BookingReview };
