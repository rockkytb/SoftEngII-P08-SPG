import { Button, } from "react-bootstrap";
import { Link } from "react-router-dom";

function Customer(props) {


  return (
    <>
          <h1 className="below-nav main-content">I'm a customer lul</h1>

          <div className="main-content">
            <Link to="/cust/cart">
              <Button>Go to you cart</Button>
            </Link>

            <Link to="/cust/newOrder">
              <Button>Make a new order</Button>
            </Link>
          </div>

    </>
  );
}

export default Customer;