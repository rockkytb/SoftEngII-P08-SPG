import { ClockFill, CalendarFill } from "react-bootstrap-icons"
import { Col, Button} from "react-bootstrap";
import React from 'react';

function Clock (props) {
    return (
        <>
            
            <Col md={1} className={props.mobile ? ("d-none"):("mr-1")}>
                <CalendarFill style={{color: 'white'}} size={25}/>
            </Col>
            <Col md={1} className="mr-1">
                    <h6 className="d-inline">
                    {' '}
                    {props.date.toLocaleDateString('en-GB', {
                        weekday: 'short'
                    })}
                    </h6>
            </Col>
            <Col md={1} className={props.mobile ? ("d-none"):("ml-1")}>
                <ClockFill style={{color: 'white'}} size={25}/>
            </Col>
            <Col md={1} className="mr-3">
                    <h6 className="d-inline">
                    {props.date.toLocaleString('en-GB', {
                        hour: 'numeric',
                        minute: 'numeric'
                    })}
                    </h6>
            </Col>
            <Col md={6} className={props.mobile ? (""):("ml-3")} >
                {props.mobile? (<>
                        
                        <Button variant={props.virtualTime ? ("success"):("danger")} onClick = {()=>{props.setVirtualTime((oldVT)=>!oldVT)}}>Virtual clock - {props.virtualTime ? ("Enabled"):("Disabled")}</Button>
                        
                        </>):(<>
                    <span className="custom-control custom-switch d-inline" size={10}>
                        <input type="checkbox" value={props.virtualTime} className="custom-control-input d-inline" id="virtualTime"
                        onClick = {()=>{props.setVirtualTime((oldVT)=>!oldVT)}}/>
                        <label className="custom-control-label d-inline" for="virtualTime" id="virtual-label">Virtual</label>
                    </span>
                
                </>
                )}
                
            </Col>
            
            
            

        </>
    )
    
}

export default Clock;
