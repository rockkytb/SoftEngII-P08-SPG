import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react'
import './NewClientForm.css'
import { toast } from "react-toastify";

function NewClientForm(props) {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [usedMail, setUsedMail] = useState("");
    const bcrypt = require('bcryptjs');

    const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
                toast.error("Email already used", { position: "top-center" },{toastId: 32})
            }

        } else {
            const newUser = {
                email: email,
                name: name,
                surname: surname,
                password: bcrypt.hashSync(password, 10),
                clearpsw: password

            };

            props.addUser(newUser);
            setUsedMail("");
            setValidated(true);
        }
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
                                id="nameField"
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
                                id="surnameField"
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
                                id="emailField"
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
                                id="pswField"
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
                    <Col md={7} xs={6}/>
                    <Col md={1} xs={1}>
                        <Button id="clearButton" onClick={() => { setName(""); setSurname(""); setEmail(""); setPassword(""); setValidated(false); }} type="button" variant="secondary" className="float-right">Clear</Button>
                    </Col>
                    <Col md={2} xs={3} className="pl-5">
                        <Button variant="warning" color="black" id="submitButton" type="submit" className="float-right ">Register</Button>
                    </Col>
                    <Col md={2} xs={2}/>
                </Row>
            </Form >
        </div>
    )
}


export default NewClientForm;