import { Container, Navbar } from 'react-bootstrap';


function NavbarCustom(props) {
    return (
        <Navbar bg="primary" variant="dark">
            <Container className="d-flex justify-content-center align-items-center" >
                <Navbar.Brand href="/home">
                Solidarity Purchasing Group
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}


export default NavbarCustom;