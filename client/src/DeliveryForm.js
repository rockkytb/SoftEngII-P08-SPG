import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react'
import './NewClientForm.css'
import { toast } from "react-toastify";

function DeliveryForm(props) {
    const [validated, setValidated] = useState(false);
    
    const [street, setStreet] = useState (null);
    const [city, setCity] = useState (null);
    const [province, setProvince] = useState (null);
    const [postalCode, setPostalCode] = useState (null);
    const [country, setCountry] = useState (null);
    const [date, setDate] = useState ("");
    const [time, setTime] = useState ("");
    const [extraFee, setExtraFee] = useState (0);
    

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);

        } /*
        else {
            const newUser = {
                email: email,
                name: name,
                surname: surname,
                password: bcrypt.hashSync(password, 10),

            };

            props.addUser(newUser);
            setUsedMail("");
            setValidated(true);
        } */
    };


    return (
        <div className="Registration  " >

            <Form noValidate validated={validated} onSubmit={handleSubmit} className="pt-5">
                <Row className="justify-content-center">
                    <h2> Delivery Options </h2>
                </Row>

                <Row className="text-center">
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group id="DeliveryMode">
                            <Form.Check type="checkbox" label="Delivery at home?" 
                            checked={props.deliveryMode} 
                            onChange={() => props.setDeliveryMode(!props.deliveryMode)} />
                         </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>

                <Row className="justify-content-center">
                    <h4> Pick-Up in Shop </h4>
                </Row>
                
                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group size="lg" controlId="date">
                            <Form.Label>Date: </Form.Label>
                            <Form.Control 
                                    type="date" 
                                    value={date}
                                    required 
                                    onChange={ev => setDate(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a valid Date.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>

                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group size="lg" controlId="time">
                            <Form.Label>Time: </Form.Label>
                            <Form.Control 
                                    type="time" 
                                    value={time} 
                                    required
                                    onChange={ev => setTime(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a valid Time.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>

                <Row>
                    <Col xs={8} />
                    <Col xs={1}>
                        <Button onClick={() => 
                            { setDate(""); setTime("");  setValidated(false); }} 
                            type="button" variant="secondary" className="float-right">Clear</Button>
                    </Col>
                    <Col xs={1} className="pl-5">
                        <Button type="submit" variant="primary" className="float-right ">Save</Button>
                    </Col>
                    <Col xs={2} />
                </Row>
            </Form >
        </div>
    )
}


export default DeliveryForm;