import React from 'react';
import { useState } from "react";
import {
    CardColumns,
    Card,
    Col,
    Button,
} from "react-bootstrap";

export default function BookingAcceptance(props) {

    /*function productsView(){
        //TODO
        return(
            <>            
            </>
        );
    }*/

    function bookingActions() {
        let toPrint = props.bookings.filter((bk) => bk.state !== "COMPLETED");
        if(toPrint.length == 0){
            return (<>No pending bookings present</>);
        }
        return toPrint.map((booking) => (
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Text className="text-dark">
                            Booking id: {booking.id} <br />
                            Client: {booking.name + " " + booking.surname}<br />
                            Client email: {booking.email} <br />
                            Product: {booking.product}<br />
                            Product quantity: {booking.qty}<br />
                            {/*productsView()*/}
                        </Card.Text>
                        <Button
                            variant="primary"
                            disabled={booking.state=="COMPLETED"}
                            onClick={() => {
                                props.confirmBooking(booking.id);
                                booking.state="COMPLETED"
                                
                            }}
                            color="black"
                        >
                            Set as completed
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    return (
        <div className= "below-nav">

            <CardColumns xs={1} md={5}>
                <>{props.bookings && props.bookings.length > 0 ? bookingActions() : <>No pending bookings present</>}</>
            </CardColumns>
        </div>
    );
}