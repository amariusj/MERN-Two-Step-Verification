
// IMPORTS REACT AND ITS UTILITIES

import React, { createContext } from 'react'

// CREATES THE CONTEXT THE APP WILL USE

export const GlobalState = createContext()

// CREATE A DATAPROVIDER REACT FUNCTIONAL COMPONENT TO BE ADDED TO THE APP

export function DataProvider({children}) {

// RETURN THE CONTEXT WITHIN THE REACT FUNCTIONAL COMPONENT

    return (
        <GlobalState.Provider value={null} >
            {children}
        </GlobalState.Provider>
    )

}