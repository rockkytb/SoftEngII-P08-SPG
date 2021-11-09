import { NavLink, Navbar, Button, Form } from "react-bootstrap";

function NavbarCustom(props) {
  return (
    <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top">
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
      <NavLink className="navbar-brand">
        Le_Cose SPG s.p.a.
      </NavLink>

      <div className="navbar-nav ml-md-auto">
        <NavLink className="nav-item nav-link" href="#">
          <svg
            className="bi bi-people-circle"
            width="30"
            height="30"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
            <path
              fillRule="evenodd"
              d="M8 9a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z"
              clipRule="evenodd"
            />
          </svg>
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
      </div>
    </Navbar>
  );
}

export default NavbarCustom;
