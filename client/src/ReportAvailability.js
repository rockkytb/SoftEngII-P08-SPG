import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react'
import { toast } from "react-toastify";

function ReportAvailability(props) {
    //Product Expected

    const [productname, setName] = useState("");
    const [qty, setQty] = useState(0);
    //const [measure, setMeasure] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0.0);
    const [state, setState] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log("valore setUsedMail " + usedMail);
        let val = props.getClientbyEmail(email);
        if(val){
            setUsedMail(val.id);
        }
        else{
            setUsedMail(-1);
        }
        console.log("valore setUsedMail " + usedMail);
        if (form.checkValidity() === false || usedMail == -1 ) {
            event.stopPropagation();
            if (usedMail == -1) {
                setUsedMail("");
                toast.error("Email already used", { position: "top-center" })
            }

        } else {
            const newUser = {
                email: email,
                name: name,
                surname: surname,
                password: bcrypt.hashSync(password, 10),

            };

            props.addUser(newUser);
            setUsedMail("");
            setValidated(true);
        }
    };


    return (<></>/*
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
                            <Form.Control.Feedback type="invalid">
                                Please insert a name for the product.
                            </Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">
                                Please insert a quantity.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>

                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group size="lg">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                required
                                onChange={ev => setEmail(ev.target.value)} />
                            {email.length === 0 && <Form.Control.Feedback type="invalid">
                                Please insert an email address.
                            </Form.Control.Feedback>}
                            {regex.test(email) === false && email.length > 0 &&
                                <Form.Control.Feedback type="invalid">
                                    Please insert an email address. '@' must be included.
                                </Form.Control.Feedback>
                            }


                            {!(usedMail == -1 ) && <Form.Control.Feedback type="invalid">
                                Email already used
                            </Form.Control.Feedback>}
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>

                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type='password'
                                value={password}
                                required
                                onChange={ev => setPassword(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>

                <Row>
                    <Col xs={8} />
                    <Col xs={1}>
                        <Button onClick={() => { setName(""); setSurname(""); setEmail(""); setPassword(""); setValidated(false); }} type="button" variant="secondary" className="float-right">Clear</Button>
                    </Col>
                    <Col xs={1} className="pl-5">
                        <Button type="submit" variant="primary" className="float-right ">Save</Button>
                    </Col>
                    <Col xs={2} />
                </Row>
            </Form >
        </div>
    */)
}


export default ReportAvailability;