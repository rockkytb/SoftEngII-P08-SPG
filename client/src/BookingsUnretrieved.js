import { Row, Col, Card, Dropdown } from "react-bootstrap"
import Image from "react-bootstrap/Image";
import ImageFinder from "./ImageFinder.js";


function BookingsUnretrieved(props) {
    const bookings = props.bookingsUnretrieved ? props.bookingsUnretrieved : [];

    return (
        <>
            <div className="below-nav no-flickr">
                <Row className="pb-4">
                    <Col md={3} xs={4} className="pr-1 text-right">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Report
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                               
                                    <Dropdown.Item id={"All" } >
                                        All
                                    </Dropdown.Item>

                                    <Dropdown.Item id={"weekly" } >
                                        Weekly report
                                    </Dropdown.Item>

                                    <Dropdown.Item id={"monthly" } >
                                        Monthly report
                                    </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    </Row>
            </div>
            <h1 className="below-nav main-content text-center">Unretrieved Bookings</h1>
            {bookings.map((book) => {
                return (
                    <Col>
                        <Card className="text-dark">
                            {/*TODO: <Card.Img variant="top" src={templateTraduction(props.template)}/>*/}
                            <Card.Body>
                                <Card.Title>
                                    <h4>Booking #{book.idBooking}</h4>
                                    <h5>User: {book.idClient}</h5>
                                </Card.Title>

                                {book.products.map((p) => {
                                    return (
                                        <>
                                            <Card.Text>
                                                <Row>
                                                    <Col xs={7}>
                                                        <b>Product:</b> {p.product}
                                                        <br />
                                                        <b>Quantity:</b> {p.qty}
                                                        <br />
                                                    </Col>
                                                    <Col xs={5}>
                                                        <Image
                                                            src={ImageFinder(p.product.toLowerCase())}
                                                            rounded
                                                            fluid
                                                        />
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                        </>
                                    );
                                })}
                            </Card.Body>
                        </Card>
                    </Col>

                )
            })
            }
        </>
    );
}

export default BookingsUnretrieved;