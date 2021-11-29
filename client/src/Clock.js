import { ClockFill, CalendarFill } from "react-bootstrap-icons"
import { Col} from "react-bootstrap";
import React from 'react';

function Clock (props) {
    return (
        <>
            
            <Col md={1} className="mr-1">
                <CalendarFill style={{color: 'white'}} size={25}/>
            </Col>
            <Col md={3}>
                    <h6 className="d-inline">
                    {' '}
                    {props.date.toLocaleDateString('en-GB', {
                        weekday: 'short'
                    })}
                    </h6>
            </Col>
            <Col md={1} className="mr-1">
                <ClockFill style={{color: 'white'}} size={25}/>
            </Col>
            <Col md={3} className="mr-3">
                    <h6 className="d-inline">
                    {props.date.toLocaleString('en-GB', {
                        hour: 'numeric',
                        minute: 'numeric'
                    })}
                    </h6>
            </Col>
            <Col md={7}>
                <span className="custom-control custom-switch d-inline" size={10}>
                    <input type="checkbox" value={props.virtualTime} className="custom-control-input d-inline" id="virtualTime"
                    onClick = {()=>{props.setVirtualTime((oldVT)=>!oldVT)}}/>
                    <label className="custom-control-label d-inline" for="virtualTime" id="virtual-label">Virtual</label>
                </span>
            </Col>
            
            
            

        </>
    )
    
}

export default Clock;