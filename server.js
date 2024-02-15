
// ADDS ACCESS TO ENVIRONMENT VARIABLES

require('dotenv').config()



// INSTALL ALL NECESSARY LIBRARIES

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoose = require('mongoose')



// CREATE THE EXPRESS SERVER

const app = express()



// ADD CONFIGURATIONS TO THE SERVER:



    // ADD HTTP LOGGING TO THE CONSOLE

    app.use(morgan('dev'))

    // ADD CROSS-ORIGIN RESOURCE SHARING BETWEEN API AND CLIENT

    app.use(cors())

    // ENABLE THE ABILITY TO UPLOAD FILES

    app.use(fileUpload({
        useTempFiles: true
    }))

    // PARSES THE COOKIES PASSED TO THE SERVER

    app.use(cookieParser())

    // PARSE THE JSON PASSED TO THE SERVER

    app.use(express.json())



// CONNECT TO THE MONGODB DATABASE



    // GRAB THE MONGODB URI FROM THE ENVIRONMENT VARIABLES

    const uri = process.env.MONGODB_URI

    // ATTEMPT CONNECTING TO THE DATABASE

    const connect = async () => {

        // AWAIT THE CONNECTION
        await mongoose.connect(uri)

        // LOG THE SUCCESSFUL CONNECTION
        console.log(`Successfully connected to the database`)

    }
    connect()
    .catch((err) => {

        // IF THERE'S AN ERROR CONNECTING, SEND IT TO THE CONSOLE
        console.log(`There was an error connecting to your MongoDB database: ${err.message}`)
    })
    


// ADD THE ROUTES TO THE SERVER


    // IMPORT THE ROUTES
    const userRouter = require('./routes/userRouter')

    // SET THE ROUTES
    app.use('/user', userRouter)


// CHECK IF YOU'RE RUNNING THE APP IN A PRODUCTION ENVIRONMENT

if (process.env.NODE_ENV === 'production') {

    // USE THE STATIC CONTENT FROM THE CLIENT BUILD FOLDER

    app.use(express.static(path.join(__dirname, "client", "build")))

    // SEND THE CLIENT, BUILD, AND INDEX.HTML FILES TO THE ENVIRONMENT

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })

}

// HOST THE SERVER


    // DETERMINE THE PORT THE SERVER WILL RUN ON

    const PORT = process.env.PORT || 5000

    // LISEN THE SERVER ON THE DESIGNATED PORT

    app.listen(PORT, (err) => {

        // IF THERE'S AN ERROR, SEND IT TO THE CLIENT

        if (err) return res.status(500).json({msg: err.message})

        // LOG THAT THE SERVER IS SUCCESSFULLY RUNNING

        console.log('Server running on port: ' + PORT)
    
    })