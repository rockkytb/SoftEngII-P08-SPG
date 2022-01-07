import React from 'react';
import { useState } from "react";
import {
    CardColumns,
    Card,
    Col,
    Button,
} from "react-bootstrap";

export default function PickupSchedule(props) {
    
    if(props.bookings)
        props.bookings.sort((a, b) => {
        let tmpa = new Date(a.date).getTime();
        let tmpb = new Date(b.date).getTime();
            if ((tmpa > tmpb)) {
                return 1;
            }
            if ((tmpb > tmpa)) {
                return -1;
            }
            return 0;
        });


    function pickupScheduleActions() {
        if (props.bookings.length === 0) {
            return (<>No pick-up scheduled</>);
        }
        return props.bookings.map((b) => (
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Text className="text-dark">
                            Client: {b.idClient + "  "} <br />
                            Booking: {b.idBooking + " "} <br />
                            Date: <b>{b.date + " "} </b> <br />
                            Time: <b>{b.time + " "} </b> <br />
                        </Card.Text>
                        {props.userdata.id && props.userdata.id.charAt(0) === "W" ? (
                          <>
                        <Button
                            variant="warning"
                            id={"confirmButton" + b.idBooking}
                            onClick={() => {

                                props.confirmPreparation(b.idBooking);
                            }}

                        >
                            Confirm preparation
                        </Button>
                        </>):(<></>)}
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    return (
        <div className="below-nav">

            <CardColumns xs={1} md={5}>
                <>{props.bookings && props.bookings.length > 0 ? pickupScheduleActions() : <>No pick-up scheduled</>}</>
            </CardColumns>
        </div>
    );
}