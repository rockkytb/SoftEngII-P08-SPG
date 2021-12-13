import React from 'react';
import { useState } from "react";
import {
    CardColumns,
    Card,
    Col,
    Button,
    Alert
} from "react-bootstrap";

export default function PreparationConfirmFarmer(props) {

    const [showAlertTime, setShowAlertTime] = useState(false);

    function confirmActions() {
        console.log(props.confirmedProducts)
        if (props.confirmedProducts.length == 0) {
            return (<>No products to confirm</>);
        }
        return (
            <Col>
                {props.confirmedProducts.map((product) => {
                    return (
                        <Card>
                            <Card.Body>
                                <Card.Text className="text-dark">

                                    <>
                                        Product:<b> {product.name + "  "}</b><br />
                                        Quantity:<b> {product.qty}</b><br /><br />
                                    </>
                                </Card.Text>
                                <Button
                                    variant="warning"
                                    onClick={() => {
                                        if (props.calendarday.getDay() === 1 && props.calendarday.getHours() >= 9) {
                                            props.confirmPreparationFarmer(props.confirmedProducts);
                                        }
                                        else {
                                            setShowAlertTime(true);
                                        }
                                    }}
                                >
                                    Confirm preparation
                                </Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Col>
        )
    }

    return (
        <div className="below-nav no-flickr">

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
                <>{props.confirmedProducts && props.confirmedProducts.length > 0 ? confirmActions() : <>No products to confirm</>}</>
            </CardColumns>
        </div>
    );
}