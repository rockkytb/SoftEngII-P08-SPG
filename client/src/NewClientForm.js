import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react'


function NewClientForm(props) {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const bcrypt = require('bcryptjs');

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const newUser = {
                email: email,
                name: name,
                surname: surname,
                password: bcrypt.hashSync(password, 10), /* da cambiare con hashpassword*/

            };
           
            props.addUser(newUser);
        }
        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="pt-5">
            <Row>
                <Col xs={2} />
                <Col xs={8}>
                    <Form.Group controlId='nome'>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type='text' value={name} required onChange={ev => setName(ev.target.value)} />
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
                    <Form.Group controlId='cogn'>
                        <Form.Label>Surname:</Form.Label>
                        <Form.Control type='text' value={surname} required onChange={ev => setSurname(ev.target.value)} />
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
                    <Form.Group controlId='mail'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='text' value={email} required onChange={ev => setEmail(ev.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please insert an email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col xs={2} />
            </Row>

            <Row>
                <Col xs={2} />
                <Col xs={8}>
                    <Form.Group controlId='nome'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='text' value={password} required onChange={ev => setPassword(ev.target.value)} />
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
    )
}


export default NewClientForm;