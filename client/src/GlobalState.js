
// IMPORTS REACT AND ITS UTILITIES

import React, { createContext, useState, useEffect } from 'react'

// IMPORT AXIOS FOR HTTPS REQUESTS

import axios from 'axios'

// IMPORT THE APIS TO THE CLIENT

import UserAPI from './api/UserAPI'

// CREATES THE CONTEXT THE APP WILL USE

export const GlobalState = createContext()

// CREATE A DATAPROVIDER REACT FUNCTIONAL COMPONENT TO BE ADDED TO THE APP

export function DataProvider({children}) {

    // CREATE A STATE VARIABLE TO HOLD THE ACCESS TOKEN TO THE API

    const [token, setToken] = useState(false)

    // GRAB THE REFRESH TOKEN WHENEVER A USER LOGS IN

    useEffect(()=> {

        // IF YOU'RE ABLE TO FIND AN ISLOGGED LOCAL STORAGE KEY

        if (localStorage.getItem('isLogged')) {

            // ATTEMPT GRABBING THE REFRESH TOKEN

            const refresh = async () => {

                // MAKE THE REQUEST TO THE API

                const res = await axios.get('user/refresh-token')

                // SET THE TOKEN STATE TO THE ACCESS TOKEN PROVIDED

                setToken(res.data.accessToken)

            }

            // LOG THE REQUEST TO THE CLIENT

            refresh()

        }

    }, [])

    // CREATE A STATE TO HOLD ALL DATA

    const state = useState({
        token: [token, setToken],
        userApi: UserAPI(token)
    })

    // RETURN THE CONTEXT WITHIN THE REACT FUNCTIONAL COMPONENT

    return (
        <GlobalState.Provider value={state} >
            {children}
        </GlobalState.Provider>
    )

}