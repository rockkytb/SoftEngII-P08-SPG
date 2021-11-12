import { useState } from "react";
import { Modal, Col, Form, Button} from "react-bootstrap";

function ClientData(props){
    const [client, setClient] = useState();
    const [custEmail, setEmail] = useState("");
    const [wallet, setWallet] = useState();
    const [newWallet, setNewWallet] = useState(0);

    /*if(client == undefined )
        setClient();*/

    if(client && client.id && !wallet)
        setWallet(props.getWallet(client.id));
    if(client && wallet && !newWallet)
        setNewWallet(wallet);
    
    return(
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
                      <Form.Control type="email" placeholder="Enter client email" onChange={ev => setEmail(ev.target.value)} />
                  </Form.Group>
                </Form>
              </Col>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" disabled={!custEmail || custEmail == ""} onClick={() => {setClient(props.getClient(custEmail))}}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          : 
            <>
            <p>Client id: {client.id}</p><br/>
            <p>Client email: {client.email}</p><br/>
            <p>Client wallet: {wallet}€</p><br/>
            <Form>
                  <Form.Group>
                    <Form.Label>Change wallet value:</Form.Label>
                      <Form.Control type="number" min="0" default={newWallet} onChange={ev => setNewWallet(ev.target.value)} />
                  </Form.Group>
                  <Button variant="primary" onClick={() => {setClient(props.getClient(custEmail))}}>
                    Submit
                </Button>
            </Form>
            
            </>
        }
        </>

    );
}

export default ClientData ;