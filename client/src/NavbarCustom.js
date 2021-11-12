import { NavLink, Navbar, Button, Col } from "react-bootstrap";
import { PersonCircle, DoorOpenFill, HouseDoorFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom";

function NavbarCustom(props) {

  function checkType() {
    if (props.user.id && props.user.id.charAt(0) === 'C') {
      return (
        <>
          <Link to="/cust" style={{color: 'white'}}>
            <PersonCircle size={30}/>
          </Link>
        </>
      )
    }
    else if (props.user.id && props.user.id.charAt(0) === 'S') {
      return (
        <>
          <Link to="/emp" style={{color: 'white'}}>
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

      <Col >
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

      <Col className="d-flex  justify-content-center">
        <NavLink className="navbar-brand">
          <Link to="/home" style={{ textDecoration: 'none', color: 'white'}}>
            SPG s.p.a.
          </Link>
        </NavLink>
      </Col>

      <Col className="navbar-nav ml-md-auto justify-content-end">
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
