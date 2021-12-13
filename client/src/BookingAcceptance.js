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
        //FIX il filtro prende tutto quello che non è completed
        let toPrint = props.bookings.filter((bk) => bk.state !== "COMPLETED");
        if(toPrint.length == 0){
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
                            {/*productsView()*/}
                        </Card.Text>
                        <Button
                            variant="warning"
                            disabled={booking.state=="COMPLETED"}
                            id={"setAsCompleted"+booking.id}
                            onClick={() => {
                                props.confirmBooking(booking.id);
                                booking.state="COMPLETED"
                                
                            }}
                            
                        >
                            Set as completed
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    return (
        <div className= "below-nav no-flickr">

            <CardColumns xs={1} md={5}>
                <>{props.bookings && props.bookings.length > 0 ? bookingActions() : <>No pending bookings present</>}</>
            </CardColumns>
        </div>
    );
}