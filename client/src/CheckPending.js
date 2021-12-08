import React from 'react';
import {
    CardColumns,
    Card,
    Col,
    Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CheckPending(props) {

    function bookingActions() {
        let toPrint = props.bookings.filter((bk) => bk.state === "PENDINGCANCELATION");
        if (toPrint.length == 0) {
            return (<>No pending bookings present</>);
        }
        return toPrint.map((booking) => (
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Text className="text-dark">
                            <b>Booking id:</b> {booking.id} <br />
                            <b>Client:</b> {booking.name + " " + booking.surname}<br />
                            <b>Client email:</b> {booking.email} <br />
                            <b>Product list:</b><br />
                            {booking.products.map(p=>{
                                return <>
                                    Product: {p.product}<br />
                                    Quantity: {p.qty}<br /><br />
                                </>
                            })}
                            
                        </Card.Text>
                        <Link to="/emp/clientData">
                            <Button variant="warning" className="mr-2 ml-2 md-1 "> Check client data </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    return (
        <div className="below-nav">

            <CardColumns xs={1} md={5}>
                <>{props.bookings && props.bookings.length > 0 ? bookingActions() : <>No pending bookings present</>}</>
            </CardColumns>
        </div>
    );
}