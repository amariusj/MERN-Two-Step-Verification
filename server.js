
// ADDS ACCESS TO ENVIRONMENT VARIABLES

require('dotenv').config()

// INSTALL ALL NECESSARY LIBRARIES

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')

// CREATE THE EXPRESS SERVER

const app = express()

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

// CHECK IF YOU'RE RUNNING THE APP IN A PRODUCTION ENVIRONMENT

if (process.env.NODE_ENV === 'production') {

    // USE THE STATIC CONTENT FROM THE CLIENT BUILD FOLDER

    app.use(express.static(path.join(__dirname, "client", "build")))

    // SEND THE CLIENT, BUILD, AND INDEX.HTML FILES TO THE ENVIRONMENT

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })

}

// HOST THE SERVER ON A PORT

const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {

    if (err) return res.status(500).json({msg: err.message})

    console.log('Server running on port: ' + PORT)
    
})