import React, { useEffect, useState } from 'react';
import { NavLink, Navbar, Button, Col, Row } from "react-bootstrap";
import { PersonCircle, DoorOpenFill, HouseDoorFill, BellFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom";
import Clock from "./Clock.js"
import { ToastContainer, toast } from "react-toastify";


function NavbarCustom(props) {
const [firstTime, setFirstTime] = useState(true);
const [showNotification, setShowNotification] = useState(false);

console.log("aaaaaaaaaaaaah")
console.log(props.bookings)

  
let toPrint = props.bookings && props.bookings.length>0 ? 
props.bookings.filter((bk) => bk.state === "PENDINGCANCELATION") 
:
"";

if (firstTime && toPrint.length !== 0) {
  setShowNotification(true);
  setFirstTime(false);
}


  function checkType() {
    if (props.user && props.user.id && props.user.id.charAt(0) == 'C') {
      return (
        <>
          <Row>
            <div className="notificationIcon" >
              <BellFill size={30} className="notificationIcon mr-3" fill="white" onClick={()=> {showNotification && toast.error("Insufficient money in the wallet ", { position: "top-right" })} } />
              {showNotification && <div className="notificationCounter"> </div>}
            </div>

            <Link to="/cust" style={{ color: 'white' }}>
              <PersonCircle size={30} />
            </Link>
          </Row>
        </>
      )
    }
    else if (props.user && props.user.id && props.user.id.charAt(0) == 'S') {
      return (
        <>
          <Link to="/emp" style={{ color: 'white' }}>
            <PersonCircle size={30} />
          </Link>
        </>
      )
    }
    else if (props.user && props.user.id && props.user.id.charAt(0) == 'M') {
      return (
        <>
          <Link to="/manager" style={{ color: 'white' }}>
            <PersonCircle size={30} />
          </Link>
        </>
      )
    }
    else if (props.user && props.user.id && props.user.id.charAt(0) == 'F') {
      return (
        <>
          <Link to="/farmer" style={{ color: 'white' }}>
            <PersonCircle size={30} />
          </Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link to="/register" style={{ color: 'white' }}>
            <PersonCircle size={30} />
          </Link>
        </>
      )
    }
  }

  return (
    <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top">

      <Col md={4} className="d-none d-md-flex  justify-content-left pl-0">
        <Clock date={props.date} virtualTime={props.virtualTime} setVirtualTime={props.setVirtualTime}></Clock>
      </Col>

      <Col md={4} xs={5} className="d-flex justify-content-center">
        <NavLink className="navbar-brand">
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
            <h2 id="title">SPG s.p.a.</h2>
          </Link>
        </NavLink>
      </Col>

      <Col md={4} xs={7} className="navbar-nav ml-md-auto justify-content-end">
        <NavLink className="nav-item nav-link mr-3">
          <Link to="/home" style={{ color: 'white' }}>
            <HouseDoorFill size={30} />
          </Link>
        </NavLink>
        <NavLink className="nav-item nav-link">
          <>
            {
              props.logged ?
                <>

                  {
                    checkType()
                  }
                </>
                :
                <Link to="/login" style={{ color: 'white' }}>
                  <PersonCircle size={30} />
                </Link>
            }
          </>


        </NavLink>

        <NavLink className="nav-item nav-link ml-3" href="#" onClick={props.logout}>
          {props.logged && <DoorOpenFill size={30} />}

        </NavLink>
      </Col>
    </Navbar>
  );
}


export default NavbarCustom;
