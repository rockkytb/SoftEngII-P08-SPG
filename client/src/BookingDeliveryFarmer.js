import React from 'react';
import { useState } from "react";
import {
    CardColumns,
    Card,
    Col,
    Alert,
    Button,
} from "react-bootstrap";

export default function BookingDeliveryFarmer(props) {

    const [showAlertTime, setShowAlertTime] = useState(false);

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
                                if(props.calendarday.getDay() === 2 && props.calendarday.getHours() <= 23){
                                //TODO, confirm delivery
                                props.confirmDelivery(props.confirmedProducts);}
                                else{
                                    setShowAlertTime(true);
                                }
                                
                                
                            }}
                            color="black"
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
            <Alert show={showAlertTime} variant="danger">
                <Alert.Heading>You cannot confirm delivery now</Alert.Heading>
                <p>
                Deliveries must happen only from 00 am to 23 pm of Tuesday
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button
                    color="black"
                    onClick={() => {
                    
                        setShowAlertTime(false);
                    }}
                    >
                    Close.
                    </Button>
                
                </div>
            </Alert>

            <CardColumns xs={1} md={5}>
                <>{props.confirmedProducts && props.confirmedProducts.length > 0 ? deliveryActions() : <>No products to deliver</>}</>
            </CardColumns>
        </div>
    );
}