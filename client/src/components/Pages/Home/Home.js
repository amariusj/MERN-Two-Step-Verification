
// IMPORT REACT INTO THE JS FILE

import React from 'react'

// IMPORT BOOTSTRAP COMPONENTS

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

// CREATES THE REACT FUNCTIONAL COMPONENT

export default function Home() {

    // RETURNS THE JSX TO THE CLIENT
    
    return (
        <Container className="home-page">
            <Col className="box">
                <Row>
                    <h1>Welcome to my Two-Step Verification App!</h1>
                </Row>
                <Row>
                    <p>This app is designed to test the functionality behind two-step verification when using email and SMS. Feel free to register a new account or login to an existing account to try it!</p>
                </Row>
            </Col>
        </Container>
    )
}
