import { useState } from "react";
import { Row, Col, Card, Dropdown } from "react-bootstrap"
import Image from "react-bootstrap/Image";
import ImageFinder from "./ImageFinder.js";


function BookingsUnretrieved(props) {
    const bookings = props.bookingsUnretrieved ? props.bookingsUnretrieved : [];
    const [filter, setFilter] = useState("All");

    function getWeek(in_date){
        let date = in_date;
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                                - 3 + (week1.getDay() + 6) % 7) / 7);
    }

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
                               
                                    <Dropdown.Item id={"All" } onClick={() => setFilter("All")}>
                                        All
                                    </Dropdown.Item>

                                    <Dropdown.Item id={"weekly" } onClick={() => setFilter("weekly")}>
                                        Weekly report
                                    </Dropdown.Item>

                                    <Dropdown.Item id={"monthly" } onClick={() => setFilter("monthly")}>
                                        Monthly report
                                    </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    </Row>
            </div>
            <h1 className="below-nav main-content text-center">Unretrieved Bookings</h1>
            {bookings.filter((book) => {
                if(filter == "All")
                    return true;
                let today = new Date();
                let bookDate = new Date(book.end_date);
                console.log(bookDate);
                if(today.getFullYear() == bookDate.getFullYear() && today.getMonth() == bookDate.getMonth() && ((filter == "weekly"  && getWeek(today) == getWeek(bookDate))
                 || (filter == "monthly")))
                    return true;
                return false;
            }).map((book) => {
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