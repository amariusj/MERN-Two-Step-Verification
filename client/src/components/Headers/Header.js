
// Imports React to the JS File

import React, { useContext } from 'react'

// IMPORTS ALL BOOTSTRAP COMPONENTS

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

// IMPORT REACT ROUTER DOM COMPONENTS

import { Link } from 'react-router-dom'

// IMPORT GLOBAL STATE 

import { GlobalState } from '../../GlobalState'

// CREATE THE REACT FUNCTIONAL COMPONENT

export default function Header() {

  // Grab the state from Global State

  const state = useContext(GlobalState)

  // Grab the isLogged state from the user API

  const [isLogged] = state.userApi.isLogged

  // GRAB THE LOGOUT FUNCTION FROM THE USER API

  const { logout } = state.userApi

  // GRAB THE SETtOKEN FUNCTION FROM THE GLOBAL STATE

  const setToken = state.token[1]

  // CREATES A FUNCTION THAT LOGS A USER OUT

  const logOut = async ()  => {

    try {

      // MAKE LOG OUT REQUEST TO API

      const res = await logout()

      // CONFIRM THE LOG OUT TO THE CLIENT

      alert(res.data.msg)

      // CLEAR THE LOGIN STORAGE

      localStorage.clear('isLogged')

      // CLEAR THE ACCESS TOKEN

      setToken(false)

      // REDIRECT TO THE HOME PAGE

      window.location.href = '/'

    } catch (err) {

      console.log(err)
      alert(err)

    }

  }

  // Create the JSX for being logged in

  const loggedOut =  <Nav className="ms-auto">
                      <Nav.Link as={Link} to="/">Home</Nav.Link>
                      <Nav.Link as={Link} to="/login">Login</Nav.Link>
                      <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </Nav>

  const loggedIn =  <Nav className="ms-auto">
                      <Nav.Link as={Link} to="/">Home</Nav.Link>
                      <Nav.Link as={Link} onClick={logOut}>Sign Out</Nav.Link>
                    </Nav>

  // Create the JSX for being logged out

  return (
    <Navbar expand="lg" className="bg-light" variant="light">
        <Container>
            <Navbar.Brand as={Link} to="/">MERN Two-Step Verification App</Navbar.Brand>
            <Navbar.Toggle aria-controls="menu" />
            <Navbar.Collapse id="menu">
                {
                  isLogged ? loggedIn : loggedOut
                }
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
