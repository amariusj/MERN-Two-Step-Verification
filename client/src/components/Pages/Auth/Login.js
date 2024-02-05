
// IMPORT REACT INTO THE JS FILE

import React from 'react'

// IMPORT BOOTSTRAP COMPONENTS

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

// CREATES THE REACT FUNCTIONAL COMPONENT

export default function Login() {

    // RETURNS THE JSX TO THE CLIENT
    
    return (
        <Container className="form">
            <Container>

                <Form>

                    <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='johndoe@test.com' 
                        name="email" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='****************' 
                        name="password" 
                        />
                    </Form.Group>

                    <Button variant="danger" className="mt-3" type="submit">Submit</Button>

                </Form>

            </Container>
        </Container>
    )
}
