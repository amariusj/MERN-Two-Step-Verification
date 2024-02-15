
// IMPORT USE EFFECT FROM REACT

import { useState, useEffect } from 'react'

// IMPORT AXIOS FOR HTTP REQUESTS

import axios from 'axios'

// CREATE THE REACT FUNCTIONAL COMPONENT

export default function UserAPI(token) {



    // CREATE A STATE VARIABLE TO HOLD THE USER INFORMATION

    const [user, setUser] = useState({})
    const [isLogged, setIsLogged] = useState(false)

    // CREATE A USE EFFECT FOR GETTING THE USER'S INFO

    useEffect(() => {

        // IF THERE IS AN ACCESS TOKEN, USE IT TO FIND THE USER

        if (token) {

            // CREATE THE FUNCTION TO GET THE USER INFOR

            const getUser = async () => {

                try {

                    // MAKE THE REQUEST TO THE API

                    const res = await axios.get('/user/infor', {
                        headers: {
                            Authorization: token
                        }
                    })

                    // STORE THE USER INFORMATION

                    setUser(res.data.user)

                    // SHOW THE USER AS LOGGED IN

                    setIsLogged(true)

                } catch (err) {

                    // IF THERE'S AN ERROR, LOG TO THE CONSOLE AND ALERT THE CLIENT

                    alert(err.response.data.msg)

                }

            }

            // CALL THE GETUSER FUNCTION

            getUser()

        }

    },[token])

    // CREATE A FUNCTION TO REGISTER A NEW USER

    const register =  (user) => {

        // MAKE A REQUEST TO THE API'S REGISTER ROUTE

        const res =  axios.post('/user/register', user)

        // RETURN THE RESPONSE

        return res

    }

    // CREATE A FUNCTION TO VERIFY THE USER CREDENTIALS

    const verifySms = (credentials) => {

        // MAKE A REQUEST TO THE APO'S VERIFY SMS ROUTE

        const res = axios.post('/user/verify-sms', credentials)

        // RETURN THE RESPONSE

        return res

    }

    // CREATE A FUNCTION TO LOG IN AN EXISTING USER

    const login = (user) => {

        // MAKE A REQUEST TO THE API'S REGISTER ROUTE

        const res =  axios.post('/user/login', user)

        // RETURN THE RESPONSE

        return res

    }

    // CREATE A FUNCTION TO LOG OUT AN EXISTING USER

    const logout = () => {

        // Make the request to the API

        const res = axios.get('/user/logout')

        // Return the response

        return res

    }

    // RETURN THE FUNCTIONS AND STATE TO THE APP

    return {
        register,
        verifySms,
        login,
        logout,
        user: [user, setUser],
        isLogged: [isLogged, setIsLogged]
    }
}
