
// IMPORTS REACT TO THE JS FILE

import React from 'react'

// IMPORTS REACT ROUTER DOM COMPONENTS

import { Routes, Route } from 'react-router-dom'

// IMPORTS ALL PAGES

import Home from './Home/Home'
import Login from './Login/Login'
import NotFound from './NotFound/NotFound'
import Register from './Register/Register'

// CREATES THE REACT FUNCTIONAL COMPONENT

export default function Pages() {

    // RETURN THE JSX TO THE CLIENT
    return (

        // ADDS ROUTING TO THE RFC

        <Routes>

            { /* ADDS ALL THE ROUTES TO THE APP */ }

            { /* The home/landing page. Default route to the app */ }

            <Route exact path='/' Component={Home} />

            { /* The login page. */ }

            <Route exact path='/login' Component={Login} />

            { /* The not found page. This page will be shown when a user */ }
            { /* navigates to a route that doesn't have a component. */ }

            <Route path='*' Component={NotFound} />

            { /* The register page. */ }

            <Route exact path='/register' Component={Register} />

        </Routes>


    )
}
