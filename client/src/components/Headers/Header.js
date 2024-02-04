
// Imports React to the JS File

import React from 'react'

// IMPORTS ALL BOOTSTRAP COMPONENTS

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

// IMPORT REACT ROUTER DOM COMPONENTS

import { Link } from 'react-router-dom'

// CREATE THE REACT FUNCTIONAL COMPONENT

export default function Header() {



  return (
    <Navbar expand="lg" className="bg-light" variant="light">
        <Container>
            <Navbar.Brand as={Link} to="/">MERN Two-Step Verification App</Navbar.Brand>
            <Navbar.Toggle aria-controls="menu" />
            <Navbar.Collapse id="menu">
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
