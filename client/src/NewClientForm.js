import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react'
import './NewClientForm.css'


function NewClientForm(props) {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const bcrypt = require('bcryptjs');

    const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log("valore setUsedMail " + props.getClientbyEmail(email).id)
        props.getClientbyEmail(email);

        if (form.checkValidity() === false && !(props.usedMail === -1 /*|| props.usedMail === undefined */)) {
            event.stopPropagation();
        } else {
            const newUser = {
                email: email,
                name: name,
                surname: surname,
                password: bcrypt.hashSync(password, 10),

            };

            props.addUser(newUser);
        }
        setValidated(true);
    };


    return (
        <div className="Registration  " >

            <Form noValidate validated={validated} onSubmit={handleSubmit} className="pt-5">
                <Row className="justify-content-center">
                    <h2> New Customer </h2>
                </Row>
                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group controlId='text'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                autoFocus
                                type='text'
                                value={name}
                                required
                                onChange={ev => setName(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>

                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group controlId='text'>
                            <Form.Label>Surname:</Form.Label>
                            <Form.Control
                                type='text'
                                value={surname}
                                required
                                onChange={ev => setSurname(ev.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please insert a surname.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={2} />
                </Row>

                <Row>
                    <Col xs={2} />
                    <Col xs={8}>
                        <Form.Group size="lg" controlId="email">
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

                            {!(props.usedMail === -1 /*|| props.usedMail === undefined*/) && <Form.Control.Feedback type="invalid">
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
    )
}


export default NewClientForm;