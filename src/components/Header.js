import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Header = () => {
  return (

    <header className="header">
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
      <Container>
        <Navbar.Brand href="/">Redux Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
            <Nav.Link href="/">Home</Nav.Link>
             <Nav.Link href="post">Posts</Nav.Link>
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
       
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header