import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
// import {Link} from 'react-router-dom';

export function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container >
          <Navbar.Brand >Data Visualization Energy Project</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link to="/!#" className="Links">Home</Link>
                <Link to="/About" className="Links">About</Link> */}

          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
