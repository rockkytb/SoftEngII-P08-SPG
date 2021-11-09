import { Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

function Employee(){

    const [show, setShow] = useState(false);

    

  return (
    <>
      <h1>Sono un impiegato lmao</h1>

      <Modal
            show={show}
            onHide={rest.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New User
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Select service: </Form.Label> 
                            <select className="ml-1">
                                {availableServices ? availableServices.map(service =>
                                    <option
                                        label={service.name}
                                        id={service.id}
                                        onChange={ev => setSelectedService(ev.target.checked)}
                                    />
                                ) : ""}
                            </select >
                    </Form.Group>
                    <Container className="d-flex justify-content-end">
                        <Button className="mr-1" variant="secondary" onClick={() => { props.onHide(); setSelectedService(); setValidated(false); }}>Close</Button>
                        <Button className="ml-1" type="submit" variant="success"> New Ticket </Button>
                    </Container>
                </Form>
            </Modal.Body>


        </Modal>

      <Button class="bi bi-plus-circle-fill" onClick={handleShow}/>
    </>
  );
}

export default Employee;
