import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react'
import { toast } from "react-toastify";

function ReportAvailability(props) {
    //TODO: for now send only one product at a time, needs change to server api

    const [toSend, setToSend] = useState(false);
    const [validated, setValidated] = useState(false);

    //const [products, setProducts] = useState([]);

    const [productname, setName] = useState("");
    const [category, setCategory] = useState(props.categories && props.categories[0] && props.categories[0].id ? props.categories[0].id : -1);
    const [price, setPrice] = useState(0.0);
    const [qty, setQty] = useState(0);

    //const [measure, setMeasure] = useState("");
    //const [state, setState] = useState("");

    if (category == -1) {
        if (props.categories && props.categories[0] && props.categories[0].id)
            setCategory(props.categories[0].id);
        else
            props.setDirty(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || !props.id || category == -1) {
            event.stopPropagation();
        } else {
            const product = {
                name: productname,
                category: category,
                price: price,
                qty: qty,
                farmer_id: props.id.substring(1),
            };
            console.log(product);

            props.addFutureProducts(props.id, product);
            setValidated(true);
            toast.success("Succesfully added", { position: "top-center" });
        }
    };

    return (
        <>

            <div className="Registration  " >

                <Form noValidate validated={validated} onSubmit={handleSubmit} className="pt-5">
                    <Row className="justify-content-center">
                        <h2> Next week advertisment </h2>
                    </Row>
                    <Row>
                        <Col xs={2} />
                        <Col xs={8}>
                            <Form.Group controlId='text'>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type='text'
                                    value={productname}
                                    required
                                    onChange={ev => setName(ev.target.value)} />
                                {(!productname || productname.length == 0) && <Form.Control.Feedback type="invalid">
                                    Please insert a name for the product.
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </Col>
                        <Col xs={2} />
                    </Row>

                    <Row>
                        <Col xs={2} />
                        <Col xs={8}>
                            <Form.Group controlId='select'>
                                <Form.Label>Category:</Form.Label>
                                <Form.Control as="select" value={category} onChange={e => setCategory(e.target.value)}>
                                    {props.categories ?
                                        props.categories.map((c) =>
                                            <option value={c.id}>
                                                {c.name}
                                            </option>
                                        ) : <></>}
                                </Form.Control>
                                {category <= 0 && <Form.Control.Feedback type="invalid">
                                    Please insert a valid category for the product.
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </Col>
                        <Col xs={2} />
                    </Row>

                    <Row>
                        <Col xs={2} />
                        <Col xs={8}>
                            <Form.Group>
                                <Form.Label>Price per item:</Form.Label>
                                <Form.Control type="number" min="0" step="0.01" value={price} onChange={ev => setPrice(ev.target.value)} />
                                {price <= 0.0 && <Form.Control.Feedback type="invalid">
                                    Please insert a valid price.
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </Col>
                        <Col xs={2} />
                    </Row>

                    <Row>
                        <Col xs={2} />
                        <Col xs={8}>
                            <Form.Group controlId='text'>
                                <Form.Label>Quantity:</Form.Label>
                                <Form.Control type="number" min="0" step="1" value={qty} onChange={ev => setQty(ev.target.value)} />
                                {qty <= 0 && <Form.Control.Feedback type="invalid">
                                    Please insert a quantity.
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </Col>
                        <Col xs={2} />
                    </Row>

                    <Row>
                        <Col xs={8} />
                        <Col xs={1}>
                            <Button onClick={() => { setName(""); setCategory(props.categories[0].id); setPrice(0.0); setQty(0); setValidated(false); }} type="button" variant="secondary" className="float-right">Clear</Button>
                        </Col>
                        <Col xs={1} className="pl-5">
                            <Button type="submit" variant="primary" className="float-right ">Save</Button>
                        </Col>
                        <Col xs={2} />
                    </Row>
                </Form >
            </div>

        </>
    )
}


export default ReportAvailability;