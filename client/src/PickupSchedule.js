import React from 'react';
import { useState } from "react";
import {
    CardColumns,
    Card,
    Col,
    Button,
} from "react-bootstrap";

export default function PickupSchedule(props) {

let scheduled = props.bookings.sort(function (a, b) {
    if ((a.date > b.date) && (a.time > b.time)) {
        return -1;
    }
    if ((b.date > a.date) && (b.time > a.time)) {
        return 1;
    }
    return 0;
});


    function pickupScheduleActions() {
        if(scheduled.length == 0){
            return (<>No pick-up scheduled</>);
        }
        return scheduled.map((b) => (
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Text className="text-dark">
                                Client: {b.idClient+ "  "} <br />
                                Booking: {b.idBooking+ " "} <br />
                                Date: <b>{b.date+ " "} </b> <br />
                                Time: <b>{b.time+ " "} </b> <br />
                        </Card.Text>
                      
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    return (
        <div className= "below-nav">

            <CardColumns xs={1} md={5}>
                <>{scheduled && scheduled.length > 0 ? pickupScheduleActions() : <>No pick-up scheduled</>}</>
            </CardColumns>
        </div>
    );
}