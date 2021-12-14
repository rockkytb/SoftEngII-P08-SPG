import React from 'react';
import { useState } from "react";
import {
    CardColumns,
    Card,
    Col,
    Button,
} from "react-bootstrap";

export default function AcknowledgeDeliveryFarmer(props) {

    function acknowledgeActions() {
        if(props.acknowledges.length === 0){
            return (<>No deliveries to Acknowledge</>);
        }
        return props.acknowledges.map((ack) => (
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Text className="text-dark">
                                Farmer:<b> {ack.farmer+ "  "}</b><br />
                                has delivered products
                        </Card.Text>
                        <Button
                            variant="warning"
                            id={"confirm"+ack.farmer}
                            onClick={() => {
                                
                                props.confirmAck(ack.id);
                            }}
                            
                        >
                            Set as read
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    return (
        <div className= "below-nav">

            <CardColumns xs={1} md={5}>
                <>{props.acknowledges && props.acknowledges.length > 0 ? acknowledgeActions() : <>No acknowledges to read</>}</>
            </CardColumns>
        </div>
    );
}