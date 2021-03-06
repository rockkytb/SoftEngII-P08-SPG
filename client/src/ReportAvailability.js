import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react'
import { toast } from "react-toastify";

function ReportAvailability(props) {
    

    const [toSend, setToSend] = useState(false);
    const [validated, setValidated] = useState(false);

    //const [products, setProducts] = useState([]);

    const [productname, setName] = useState("");
    const [category, setCategory] = useState(props.categories && props.categories[0] && props.categories[0].id ? props.categories[0].id : -1);
    const [price, setPrice] = useState(0.01);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(1);
    const [unitOfMeasure, setUnitOfMeasure] = useState("kg");

    //const [measure, setMeasure] = useState("");
    //const [state, setState] = useState("");

    const UOM = ["kg","g","l"];

    if (category == -1) {
        if (props.categories && props.categories[0] && props.categories[0].id)
            setCategory(props.categories[0].id);
        else
            props.setDirty(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false || !props.id || category == -1) {
            event.stopPropagation();
        } else {
            const product = {
                name: productname,
                category: category,
                price: price,
                qty: qty,
                size: size,
                unit_of_measure: unitOfMeasure,
                farmerid: props.id.substring(1),
            };

            
            props.addFutureProducts(props.id, product);
            toast.success("Succesfully added", { position: "top-center" },{toastId: 29});
            setName(""); 
            setCategory(props.categories[0].id); 
            setPrice(0.01); 
            setQty(1);
            setSize(1); 
            setUnitOfMeasure("kg"); 
            setValidated(false);
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
                                    id="nameField"
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
                                <Form.Control as="select" value={category} id="categoryField" onChange={e => setCategory(e.target.value)}>
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
                                <Form.Control type="number" min="0.01" step="0.01" id="priceField" value={price} onChange={ev => setPrice(ev.target.value)} />
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
                                <Form.Control type="number" min="1" step="1" id="quantityField" value={qty} onChange={ev => setQty(ev.target.value)} />
                                {qty <= 0 && <Form.Control.Feedback type="invalid">
                                    Please insert a quantity.
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </Col>
                        <Col xs={2} />
                    </Row>

                    <Row>
                        <Col xs={2} />
                        <Col xs={8}>
                            <Form.Group controlId='text'>
                                <Form.Label>Size:</Form.Label>
                                <Form.Control type="number" min="1" step="1" value={size} id="sizeField" onChange={ev => setSize(ev.target.value)} />
                                {qty <= 0 && <Form.Control.Feedback type="invalid">
                                    Please insert the size of a single product.
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </Col>
                        <Col xs={2} />
                    </Row>

                    <Row>
                        <Col xs={2} />
                        <Col xs={8}>
                            <Form.Group controlId='select'>
                                <Form.Label>Unit of measure:</Form.Label>
                                <Form.Control as="select" value={unitOfMeasure} id="uomField" onChange={e => setUnitOfMeasure(e.target.value)}>
                                    {UOM ?
                                        UOM.map((c) =>
                                            <option value={c}>
                                                {c}
                                            </option>
                                        ) : <></>}
                                </Form.Control>
                                {unitOfMeasure && <Form.Control.Feedback type="invalid">
                                    Please insert a valid unitOfMeasure for the product.
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </Col>
                        <Col xs={2} />
                    </Row>


                    <Row>
                        <Col xs={8} />
                        <Col xs={1}>
                            <Button id="clearButton" onClick={() => { setName(""); setCategory(props.categories[0].id); setPrice(0.01); setQty(1); setUnitOfMeasure(""); setSize(1); setValidated(false); }} type="button" variant="secondary" className="float-right">Clear</Button>
                        </Col>
                        <Col xs={1} className="pl-5">
                            <Button type="submit" id="submitButton" variant="warning" className="float-right ">Add</Button>
                        </Col>
                        <Col xs={2} />
                    </Row>
                </Form >
            </div>

        </>
    )
}


export default ReportAvailability;