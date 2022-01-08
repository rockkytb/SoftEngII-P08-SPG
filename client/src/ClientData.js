import React from 'react';
import { useEffect, useState } from "react";
import { Modal, Row,Col, Form, Button } from "react-bootstrap";

function ClientData(props) {
  const [id, setId] = useState(props.clients[0].id);
  const [client, setClient] = useState();
  const [wallet, setWallet] = useState();
  const [newWallet, setNewWallet] = useState();

  useEffect(() => {
    if (client) {
      const getWallet = async () => {
        // call: GET /api/clients
        const response = await props.getWallet(client.id);
        
        setWallet(response.toFixed(2));
        setNewWallet(response.toFixed(2));
        console.log(wallet);
      };
      getWallet();
    }

  }, [client]);

  return (
    <>
      {
        !client ?
          <Modal show={true}>
            <Modal.Header>
              <Modal.Title>What client you want to check?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Select Client</Form.Label>
                    <Form.Control
                      as="select"
                      id="selectClient"
                      onChange={(e) => setId(e.target.value)}
                      //defaultValue={props.clients && props.clients.length > 0 ? props.clients[0].id : ""}
                    >
                      {props.clients.length > 0 ? (
                        props.clients.map((c) => (
                          <option value={c.id}>
                            {c.name} {c.surname}
                          </option>
                        ))
                      ) : (
                        <></>
                      )}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" id="submitButton" disabled={props.clients && (props.clients.length <= 0)} onClick={() => { setClient(props.clients.find((c) => c.id === id)) }}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          :
          <div className="text-center below-nav main-content">
            <p>Client id: {client.id}</p>
            <p>Name: {client.name + " " + client.surname}</p>
            <p>Email: {client.username}</p>
            <p>Phone: {client.phone}</p>
            <p>Wallet: {wallet}€</p>
            <Form>
              <Form.Group>
                <Form.Label><h3 style={{ color: '#ffc107' }}>Change wallet value:</h3></Form.Label>
                <Row>
                  <Col md={5} />
                  <Col classname="md-2">
                    <Form.Control type="number" id="changeWallet" min="0" step="0.01" value={newWallet} onChange={ev => setNewWallet(ev.target.value)} />
                  </Col>
                  <Col md={5} />
                </Row>
              </Form.Group>
              <Button variant="warning" id={"clientButton"+client.id} onClick={() => { props.changeWallet(client.id, newWallet); setWallet(newWallet.toFixed(2)); }}>
                Submit
              </Button>
            </Form>

          </div>
      }
    </>

  );
}

export default ClientData;