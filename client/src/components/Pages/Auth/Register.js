
// IMPORT REACT INTO THE JS FILE

import React, { useState, useContext } from 'react'

// IMPORT BOOTSTRAP COMPONENTS

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

// IMPORT THE REACT PHONE INPUT LIBRARY

import PhoneInput from 'react-phone-input-2'

// IMPORT THE VERIFY COMPONENT

import Verify from './Verify'

// IMPORT GLOBAL STATE

import { GlobalState } from '../../../GlobalState'

// CREATES THE REACT FUNCTIONAL COMPONENT

export default function Register() {

    // CREATES THE STATE FOR THE FORM'S INPUT FIELDS

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    })

    // CREATE A STATE FOR THE VERIFICATION ID

    const [sid, setSid] = useState(false)

    // CREATE A STATE FOR THE USER ID

    const [id, setId] = useState(false)

    // GRAB THE STATE FROM GLOBAL STATE

    const state = useContext(GlobalState)

    // GRAB THE FUNCTIONS FROM THE STATE

    const { register } = state.userApi

    // UPDATE THE VALUE OF AN INPUT FIELD WHEN SOMEONE TYPES IN IT

    const handleChange = (e) => {

        // GRAB THE VALUE AND NAME FROM THE INPUT FIELD

        const { value, name } = e.target

        // UPDATE THE USER STATE WITH THE NEW VALUE

        setUser({...user, [name]:value})

    }

    // UODATE THE PHONE NUMBER FIELD IN THE USER OBJECT

    const handlePhoneInput = (value) => {

        // CALL THE SETUSER FUNCTION AND UPDATE THE USER OBJECT

        setUser({...user, phoneNumber: value})

    }

    // SUBMIT THE USER DATA TO THE API

    const handleSubmit = async (e) => {

        try {

                // PREVENT THE FORM FROM RELOADING UPON SUBMISSION

                e.preventDefault()

                // MAKE THE REQUEST TO THE API

                const res = await register(user)

                // IF THE REQUEST WAS SUCCESSFUL, STORE THE DATA AND SHOW THE VERIFY PAGE
        
                // STORES THE VERIFICATION SERVICE ID

                setSid(res.data.sid)

                // STORES THE NEWLY CREATED USER'S ID

                setId(res.data.id)

        } catch (err) {

            // IF THERE'S AN ERROR, ALERT THE CLIENT

            alert(err.response.data.msg)

        }

    }

    // THE JSX FOR THE REGISTER FORM

    const form = <Container className="form">
                    <Container>

                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='John' 
                                name="firstName" 
                                value={user.firstName}
                                onChange={handleChange}
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Doe' 
                                name="lastName" 
                                value={user.lastName}
                                onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type='email' 
                                placeholder='johndoe@test.com' 
                                name="email" 
                                value={user.email}
                                onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <PhoneInput
                                country={'us'}
                                type='tel' 
                                placeholder='+14045552222'
                                name="phoneNumber"
                                value={user.phoneNumber}
                                onChange={handlePhoneInput}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='****************' 
                                name="password" 
                                value={user.password}
                                onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='****************' 
                                name="confirmPassword" 
                                value={user.confirmPassword}
                                onChange={handleChange}
                                />
                            </Form.Group>

                            <Button variant="danger" className="mt-3" type="submit">Submit</Button>

                        </Form>

                    </Container>
                </Container>

    // RETURNS THE JSX TO THE CLIENT

    return (
        !sid ? form : <Verify 
                        user={user} 
                        handleChange={handleChange}
                        sid={sid}
                        id={id}
                    />
    )
}
