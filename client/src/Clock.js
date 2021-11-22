import { ClockFill, CalendarFill } from "react-bootstrap-icons"
import { Row, Col } from "react-bootstrap";

function Clock (props) {
    return (
        <>
            <Col md={1} className="mr-1">
                <CalendarFill style={{color: 'white'}} size={25}/>
            </Col>
            <Col md={5}>
                    <h6 className="d-inline">
                    {' '}
                    {props.date.toLocaleDateString('en-GB', {
                        weekday: 'long'
                    })}
                    </h6>
            </Col>
            <Col md={1} className="mr-1">
                <ClockFill style={{color: 'white'}} size={25}/>
            </Col>
            <Col md={5}>
                    <h6 className="d-inline">
                    {props.date.toLocaleString('en-GB', {
                        hour: 'numeric',
                        minute: 'numeric'
                    })}
                    </h6>
            </Col>
            
            
            
            

        </>
    )
    
}

export default Clock;