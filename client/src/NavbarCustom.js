import React from 'react';
import { NavLink, Navbar, Button, Col } from "react-bootstrap";
import { PersonCircle, DoorOpenFill, HouseDoorFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom";
import Clock from "./Clock.js"

function NavbarCustom(props) {

  function checkType() {
    if (props.user && props.user.id && props.user.id.charAt(0) == 'C') {
      return (
        <>
          <Link to="/cust" style={{color: 'white'}}>
            <PersonCircle size={30}/>
          </Link>
        </>
      )
    }
    else if (props.user && props.user.id && props.user.id.charAt(0) == 'S') {
      return (
        <>
          <Link to="/emp" style={{color: 'white'}}>
            <PersonCircle size={30}/>
          </Link>
        </>
      )
    }
    else if (props.user && props.user.id && props.user.id.charAt(0) == 'M') {
      return (
        <>
          <Link to="/manager" style={{color: 'white'}}>
            <PersonCircle size={30}/>
          </Link>
        </>
      )
    }
    else if (props.user && props.user.id && props.user.id.charAt(0) == 'F') {
      return (
        <>
          <Link to="/farmer" style={{color: 'white'}}>
            <PersonCircle size={30}/>
          </Link>
        </>
      )
    }
    else {
      return (
        <>
          <Link to="/register" style={{color: 'white'}}>
            <PersonCircle size={30}/>
          </Link>
        </>
      )
    }
  }

  return (
    <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top">

      <Col md={1}>
        <Button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#left-sidebar"
          aria-controls="left-sidebar"
          aria-expanded="false"
          aria-label="Toggle sidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
      </Col>

      
      
      <Col md = {2} className="d-flex  justify-content-left">
        <Clock date={props.date} virtualTime={props.virtualTime} setVirtualTime={props.setVirtualTime}></Clock>
      </Col>

      <Col md = {6}className="d-flex  justify-content-center">
        <NavLink className="navbar-brand">
          <Link to="/home" style={{ textDecoration: 'none', color: 'white'}}>
            <h1>Le_Cose SPG s.p.a.</h1>
          </Link>
        </NavLink>
      </Col>

      <Col md ={3} className="navbar-nav ml-md-auto justify-content-end">
        <NavLink className="nav-item nav-link">
          <Link to="/home" style={{color: 'white'}}>
                  <HouseDoorFill size={30}/>
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
                <Link to="/login" style={{color: 'white'}}>
                  <PersonCircle size={30}/>
                </Link>
            }
          </>


        </NavLink>

        <NavLink className="nav-item nav-link" href="#" onClick={props.logout}>
          {props.logged && <DoorOpenFill size={30}/>}
          
        </NavLink>
      </Col>
    </Navbar>
  );
}

export default NavbarCustom;
