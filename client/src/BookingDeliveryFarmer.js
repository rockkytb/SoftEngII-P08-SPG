import React from 'react';
import { useState } from "react";
import {
    CardColumns,
    Card,
    Col,
    Button,
} from "react-bootstrap";

export default function BookingDeliveryFarmer(props) {

    function deliveryActions() {
        if(props.confirmedProducts.length == 0){
            return (<>No confirmed products to deliver</>);
        }
        return (
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Text className="text-dark">
                            {props.confirmedProducts.map((product) => {
                                return (
                                <>
                                Product:<b> {product.name+ "  "}</b><br />
                                Quantity:<b> {product.qty}</b><br /><br />
                                </>);
                            })}
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={() => {
                                //TODO, confirm delivery
                                //props.confirmBooking(booking.id);
                                
                                
                            }}
                        >
                            Set as delivered
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    return (
        <div className= "below-nav">

            <CardColumns xs={1} md={5}>
                <>{props.confirmedProducts && props.confirmedProducts.length > 0 ? deliveryActions() : <>No products to deliver</>}</>
            </CardColumns>
        </div>
    );
}