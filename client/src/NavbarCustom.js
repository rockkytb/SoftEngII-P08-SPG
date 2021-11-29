import React from 'react';
import { NavLink, Navbar, Button, Col, Row } from "react-bootstrap";
import { PersonCircle, DoorOpenFill, HouseDoorFill, BellFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom";
import Clock from "./Clock.js"

function NavbarCustom(props) {

  function checkType() {
    if (props.user && props.user.id && props.user.id.charAt(0) == 'C') {
      return (
        <>
          <Row>
            <div className="notificationIcon" >
              <BellFill size={30} className="notificationIcon mr-3" fill="white" />
              <div className="notificationCounter"> </div>
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




      <Col md={2} className="d-flex  justify-content-left">
        <Clock date={props.date} virtualTime={props.virtualTime} setVirtualTime={props.setVirtualTime}></Clock>
      </Col>

      <Col md={8} className="d-flex  justify-content-center">
        <NavLink className="navbar-brand">
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
            <h1 id="title">Le_Cose SPG s.p.a.</h1>
          </Link>
        </NavLink>
      </Col>

      <Col md={2} className="navbar-nav ml-md-auto justify-content-end">
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
