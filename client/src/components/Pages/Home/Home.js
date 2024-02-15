
// IMPORT REACT INTO THE JS FILE

import React, { useContext } from 'react'

// IMPORT BOOTSTRAP COMPONENTS

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

// IMPORT GLOBAL STATE 

import { GlobalState } from '../../../GlobalState'

// CREATES THE REACT FUNCTIONAL COMPONENT

export default function Home() {

    // Grab the state from Global State

    const state = useContext(GlobalState)

    // Grab the isLogged state from the user API

    const [isLogged] = state.userApi.isLogged

    // Grab the user data from the state

    const [user] = state.userApi.user

    // RETURNS THE JSX TO THE CLIENT
    
    return (
        <Container className="home-page">
            <Col className="box">
                <Row>
                    <h1>Welcome to my Two-Step Verification App!</h1>
                </Row>
                <Row>
                    {
                        isLogged ? 
                        <p>Hi {user.firstName}! You are currently logged in</p> :
                        <p>This app is designed to test the functionality behind two-step verification when using email and SMS. Feel free to register a new account or login to an existing account to try it!</p>
                    }
                </Row>
            </Col>
        </Container>
    )
}
