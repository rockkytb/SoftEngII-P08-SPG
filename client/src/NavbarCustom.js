import React, { useState } from 'react';
import { NavLink, Navbar, Col, Row } from "react-bootstrap";
import { PersonCircle, DoorOpenFill, HouseDoorFill, BellFill, ClockFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Clock from "./Clock.js"
import { toast } from "react-toastify";


function NavbarCustom(props) {
  const [showNotification, setShowNotification] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [showNotificationEmpty, setShowNotificationEmpty] = useState(false);
  const [showNotificationPreparation, setShowNotificationPreparation] = useState(false);
  const [showNotificationMissedcounter, setShowNotificationMissedcounter] = useState(false);


  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>

        <Clock mobile={true} date={props.date} virtualTime={props.virtualTime} setVirtualTime={props.setVirtualTime}></Clock>

      </Popover.Content>
    </Popover>
  );

  let toPrint, toPrintConfirm, toPrintEmpty, toPrintMissed;

  if (props.user && props.user.id && props.user.id.charAt(0) == 'C') {
    toPrint = props.bookings && props.bookings.length > 0 ?
      props.bookings.filter((bk) => bk.state === "PENDINGCANCELATION")
      :
      "" ;
      console.log("toprint")
      console.log(toPrint)
      console.log(firstTime)
    if (firstTime && toPrint.length !== 0) {
      setShowNotification(true);
      setFirstTime(false);
    }

    toPrintEmpty = props.bookings && props.bookings.length > 0 ?
      props.bookings.filter((bk) => bk.state === "EMPTY")
      :
      "";

    if (firstTime && toPrintEmpty.length !== 0) {
      setShowNotificationEmpty(true);
      setFirstTime(false);
    }

    toPrintConfirm = props.bookings && props.bookings.length > 0 ?
      props.bookings.filter((bk) => bk.state === "CONFIRMED")
      :
      "";
    //Total price
    let total = 0;
    if (toPrintConfirm) {
      toPrintConfirm = toPrintConfirm.map((bk) => {
        bk.total = 0;
        bk.products.map((p) => bk.total += p.qty * p.price)
        return bk;
      });
      toPrintConfirm.forEach((bk) => total += bk.total);
    }
    if (firstTime && toPrintConfirm.length !== 0) {


      setShowNotificationPreparation(true);
      setFirstTime(false);
    }


   
  }

  if (props.user && props.user.id && props.user.id.charAt(0) == 'C') {
    ((props.user.missedCount === 3 || props.user.missedCount === 4) ? toPrintMissed = "Yes" : toPrintMissed = "No" )
    if (firstTime && toPrintMissed === "Yes") {
      setShowNotificationMissedcounter(true);
      setFirstTime(false);
    } else{
      props.loggedIn && setShowNotificationMissedcounter(false);
    }
  }


  function checkType() {
    if (props.user && props.user.id && props.user.id.charAt(0) == 'C') {
      return (
        <>
          <Row>
            <div className="notificationIcon" >
              <BellFill size={30} className="notificationIcon mr-3" fill="white" id="notificationBell" onClick={() => {
                console.log(showNotification)
                showNotification && toast.error("Insufficient money in the wallet ", { position: "top-right" }, { toastId: 30 });
                
                showNotificationEmpty && toast.error(<>
                  <b>Warning:</b><br />
                  {toPrintEmpty.map((bk) => <><b>Booking {bk.id}</b> canceled because no products were confirmed from farmers.</>)}<br />
                </>, { position: "top-right" }, { toastId: 31 });
                
                showNotificationPreparation &&
                  toPrintConfirm.map((bk) =>
                    toast.success(<>
                      <b>Purchase confirmation, booking #{bk.id}:</b><br />
                      {bk.products.map((p) => p.qty + " " + p.product + " ")}<br />
                      <b>Total: {bk.total} €</b></>
                      , { position: "top-right" }, { toastId: 28 })
                  )

                  toPrintMissed === "Yes" && showNotificationMissedcounter && toast.error(<>
                    <b>Warning:</b><br />
                    {`You have ${props.user.missedCount} missed pickups!\n
                 You will be suspeneded for 30 days on the 5th time.`}
                    </>,
                   { position: "top-right" }, { toastId: 32 } )

              }


              } />

              {(showNotification || showNotificationPreparation || showNotificationEmpty || showNotificationMissedcounter) && <div className="notificationCounter"> </div>}
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
          <Link to="/warehouseManager" style={{ color: 'white' }}>
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
    else if (props.user && props.user.id && props.user.id.charAt(0) == 'W') {
      return (
        <>
          <Link to="/warehouseWorker" style={{ color: 'white' }}>
            <PersonCircle size={30} />
          </Link>
        </>
      )
    }
    else if (props.user && props.user.id && props.user.id.charAt(0) == 'A') {
      return (
        <>
          <Link to="/manager" style={{ color: 'white' }}>
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


      <Col md={4} xs={2} className="d-flex justify-content-center ml-3">
        <NavLink className="navbar-brand">
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
            <h2 id="title">SPG</h2>
          </Link>
        </NavLink>
      </Col>

      <Col xs={1} className="d-flex d-md-none justify-content-center ml-3 p-0">
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <ClockFill style={{ color: 'white' }} size={30} />
        </OverlayTrigger>
      </Col>


      <Col md={4} xs={9} className="navbar-nav ml-md-auto justify-content-end">
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
