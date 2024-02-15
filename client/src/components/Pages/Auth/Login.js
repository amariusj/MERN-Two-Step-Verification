
// IMPORT REACT INTO THE JS FILE

import React, { useState, useContext } from 'react'

// IMPORT BOOTSTRAP COMPONENTS

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

// IMPORT THE VERIFY COMPONENT

import Verify from './Verify'

// IMPORT GLOBAL STATE

import { GlobalState } from '../../../GlobalState'

// CREATES THE REACT FUNCTIONAL COMPONENT

export default function Login() {

    // GRAB THE STATE FROM GLOBAL STATE

    const state = useContext(GlobalState)

    // GRAB FUNCTIONS FROM USER API

    const { login } = state.userApi

    // CREATE A STATE VARIABLE FOR THE VERIFICATION SID

    const [sid, setSid] = useState(false)

    // CREATE A STATE VARIABLE FOR THE USER'S ID

    const [id, setId] = useState(false)

    // CREATE A STATE VARIABLE FOR THE USER'S PHONE NUMBER

    const [phoneNumber, setPhoneNumber] = useState(false)

    // CREATE A STATE FOR THE FORM

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    // CREATE A FUNCTION TO UPDATE THE INPUT FIELDS

    const handleChange = (e) => {

        // GRAB THE NAME AND VALUE FROM THE INPUT FIELD

        const { name, value } = e.target

        // UPDATE THE USER STATE WITH THE INPUTTED DATA

        setUser({...user, [name]:value})

    }

    // CREATE A FUNCTION TO SEND USER CREDENTIALS TO API

    const handleSubmit = async (e) => {

        try {

            // PREVENT THE BROWSER FROM RELOADING

            e.preventDefault()

            // SUBMIT THE DATA TO THE API

            const res = await login(user)    
            
            // STORE THE SID, ID, AND PHONE NUMBER

            setSid(res.data.sid)
            setId(res.data.id)
            setPhoneNumber(res.data.phoneNumber)

        } catch (err) {

            // CONSOLE THE ERROR

            console.log(`Error: ${err.response.data.msg}, Status Code: ${err.response.status}, Status: ${err.response.statusText}`)

            // ALERT THE ERROR TO THE CLIENT

            alert(`Error: ${err.response.data.msg}, Status Code: ${err.response.status}, Status: ${err.response.statusText}`)

        }

    }

    const form = <Container className="form">
                    <Container>

                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type='email' 
                                placeholder='johndoe@test.com' 
                                name="email" 
                                onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='****************' 
                                name="password" 
                                onChange={handleChange}
                                />
                            </Form.Group>

                            <Button variant="danger" className="mt-3" type="submit">Submit</Button>

                        </Form>

                    </Container>
                </Container>

    // RETURNS THE JSX TO THE CLIENT
    
    return (
        sid ? <Verify 
            handleChange={handleChange} 
            sid={sid}
            id={id}
            phoneNumber={phoneNumber}
            /> : form
    )
}
