import React from 'react';
import { useState } from "react";
import {
    CardColumns,
    Card,
    Col,
    Button,
    Alert
} from "react-bootstrap";

export default function BookingConfirmFarmer(props) {

    const [showAlertTime, setShowAlertTime] = useState(false);

    function confirmActions() {
        if(props.expectedProducts.length == 0){
            return (<>No expected products to confirm</>);
        }
        return (
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Text className="text-dark">
                            {props.expectedProducts.map((product) => {
                                return (
                                <>
                                Product:<b> {product.name+ "  "}</b><br />
                                Quantity:<b> {product.qty}</b><br /><br />
                                </>);
                            })}
                        </Card.Text>
                        <Button
                            variant="warning"
                            onClick={() => {
                                if(props.calendarday.getDay() === 1 && props.calendarday.getHours() >= 9)
                                {
                                props.confirmProducts(props.expectedProducts);}
                                else{
                                    setShowAlertTime(true);
                                }
                                
                                
                            }}
                            
                        >
                            Confirm products
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    return (
        <div className= "below-nav">

            <Alert show={showAlertTime} variant="danger">
                <Alert.Heading>You cannot confirm products now</Alert.Heading>
                <p>
                Product must be confirmed only from 09:00 am to 23:59 pm of Monday
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button
                    variant="warning"
                    onClick={() => {
                    
                        setShowAlertTime(false);
                    }}
                    >
                    Close
                    </Button>
                
                </div>
            </Alert>

            <CardColumns xs={1} md={5}>
                <>{props.expectedProducts && props.expectedProducts.length > 0 ? confirmActions() : <>No products to confirm</>}</>
            </CardColumns>
        </div>
    );
}