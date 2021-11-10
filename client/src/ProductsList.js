import { useState } from "react";
import { CardColumns, Card, Col, Button, Row, Modal, Form} from "react-bootstrap";

export default function ProductsList(props) {
    const [showView, setShowView] = useState(false);

    const [productId, setProductId] = useState();
    const [name, setName] = useState("");
    const [quantity, setQuantity]=useState(1);

    function handleAddToCart(){
        //TODO

    }

    //const handleViewShow = () => setShowView(true);
    const handleViewClose = () =>{
        setShowView(false);
        setProductId();
        setName("");
        setQuantity(1);
      }

    function productsActions() {
        return props.memes.map((product) => (
            <Col>
                <Card>
                    {/*TODO: <Card.Img variant="top" src={templateTraduction(props.template)}/>*/}
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>Price: {product.price}<br />Category:TODO</Card.Text>
                        <Button variant="primary" onClick={() => {setProductId(product.id); setName(product.name); setQuantity(product.quantity); setShowView(true);}} >Add to Garfield Kart</Button>
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    return (
        <>
            <Modal show={showView} onHide={handleViewClose}>
                <Modal.Header>
                    <Modal.Title>
                        Add to cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>{name}</Form.Label>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" min="1" max={quantity} /*onChange={e => { setQuantity(e.target.value); }}*//>
                            </Form.Group>
                        </Form>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAddToCart()}>
                        Submit
                    </Button>
                </Modal.Footer>

            </Modal>
            <CardColumns xs={1} md={5} >
                <>
                    {props.products.length ?
                        productsActions()
                        : <></>}
                </>
            </CardColumns>
        </>
    );
}