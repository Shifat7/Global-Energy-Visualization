import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Energy Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="navigation" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/bar">
                Bar
              </Nav.Link>
              <Nav.Link as={Link} to="/line">
                Line
              </Nav.Link>
              <Nav.Link as={Link} to="/map">
                Map
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default navigation;
