import { Modal, Form,  Row, Col} from "react-bootstrap";

function BookingReview(props) {

  const [clientID, setClientID] = useState();
  const [show, setShow] = useState(false);

  async function handleCreateBooking() {
    //TODO
    newProd = { id: productId, quantity: quantity };
    props.cart.push(product);
    props.products.map((p) => {
      if (p.id === product.id) p.quantity -= product.quantity;
    });
    //edit quantity live so that the product is reserved

    handleViewClose();
  }

  const handleViewClose = () => {
    setShowView(false);
    setProductId();
    setName("");
    setQuantity(1);
  };

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
  </Modal>;
}

export default { BookingReview };
