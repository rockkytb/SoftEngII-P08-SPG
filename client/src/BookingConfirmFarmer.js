import React from 'react';
import { useState } from "react";
import {
    CardColumns,
    Card,
    Col,
    Button,
} from "react-bootstrap";

export default function BookingConfirmFarmer(props) {

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
                            variant="primary"
                            onClick={() => {
                                //TODO, confirm delivery
                                props.confirmProducts(props.expectedProducts);
                                
                                
                            }}
                            color="black"
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

            <CardColumns xs={1} md={5}>
                <>{props.expectedProducts && props.expectedProducts.length > 0 ? confirmActions() : <>No products to confirm</>}</>
            </CardColumns>
        </div>
    );
}