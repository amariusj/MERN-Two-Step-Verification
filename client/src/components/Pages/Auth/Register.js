
// IMPORT REACT INTO THE JS FILE

import React from 'react'

// IMPORT BOOTSTRAP COMPONENTS

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

// CREATES THE REACT FUNCTIONAL COMPONENT

export default function Register() {

    // RETURNS THE JSX TO THE CLIENT
    return (
        <Container className="form">
            <Container>

                <Form>

                    <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='John' 
                        name="firstName" 
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Doe' 
                        name="lastName" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='johndoe@test.com' 
                        name="email" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        type='tel' 
                        placeholder='+14045552222' 
                        name="phoneNumber" 
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

                    <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='********' 
                        name="confirmPassword" 
                        />
                    </Form.Group>

                    <Button variant="danger" className="mt-3" type="submit">Submit</Button>

                </Form>

            </Container>
        </Container>
    )
}
