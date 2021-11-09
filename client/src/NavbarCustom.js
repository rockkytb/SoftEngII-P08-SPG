import { NavLink, Navbar, Button, Form, Col } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons"
function NavbarCustom(props) {
  return (
    <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top d-flex">
      
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
        Le_Cose SPG s.p.a.
      </NavLink>
      </Col>

      <Col className="navbar-nav ml-md-auto justify-content-end">
        <NavLink className="nav-item nav-link" href="#">
         <PersonCircle />
        
        </NavLink>

        <NavLink className="nav-item nav-link" href="#" onClick={props.logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-door-open-fill"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
          </svg>
        </NavLink>
      </Col>
    </Navbar>
  );
}

export default NavbarCustom;
