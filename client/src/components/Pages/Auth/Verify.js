
// IMPORT REACT TO CREATE THE REACT FUNCTIONAL COMPONENT

import React, { useState, useContext } from 'react'

// IMPORT THE BOOTSTRAP COMPONENTS

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// IMPORT GLOBAL STATE

import { GlobalState } from '../../../GlobalState'

// CREATE THE REACT FUNCTIONAL COMPONENT

export default function Verify({sid, id, phoneNumber}) {

  // GRAB THE STATE FROM THE GLOBAL STATE

  const state = useContext(GlobalState)

  // GRAB THE VERIFYSMS FUNCTION FROM THE USER API

  const { verifySms } = state.userApi

  // CREATE A STATE FOR THE CODE

  const [code, setCode] = useState('')

  // CREATE A FUNCTION TO UPDATE THE CODE FIELD

  const handleCode = (e) => {

    // GRAB THE VALUE FROM THE INPUT

    const { value } = e.target

    // UPDATE THE CODE STATE

    setCode(value)

  }

  // SUBMIT THE VERIFY CODE TO THE API

  const handleVerify = async (e) => {

    try {

        // PREVENT THE PAGE FROM RELOADING UPON SUBMIT

        e.preventDefault()

        // MAKE THE REQUEST TO THE API

        const res = await verifySms({
            sid,
            code,
            phoneNumber,
            id
        })

        // ALERT THE SUCCESSFUL CONFIRMATION TO THE CLIENT

        alert(res.data.msg)

        // CREATE A NEW LOCAL STORAGE ITEM CALLED LOGGED

        localStorage.setItem('isLogged', true)

        // REDIRECT THE USER TO THE HOME PAGE

        window.location.href = '/'

    } catch (err) {

        // LOG THE ERROR TO THE CONSOLE

        console.log(err)

        // ALERT THE ERROR TO THE CLIENT

        alert(err.response.data.msg)

    }

}

  return (
    <Container className="form">
        <Container className="verify">

            <h3 className='mt-3'>Please enter the code sent to your number:</h3>
            
            <Form onSubmit={handleVerify}>

                <Form.Group className="mb-3" controlId="code">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control 
                    type='password' 
                    name="code" 
                    value={code}
                    onChange={handleCode}
                    />
                </Form.Group>

                <Button variant="danger" className="mt-3" type="submit">Submit</Button>

            </Form>

        </Container>
    </Container>
  )
}
