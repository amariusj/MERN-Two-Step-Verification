
// IMPORT JSON WEB TOKEN

const jwt = require('jsonwebtoken')

// CREATE THE AUTH MIDDLEWARE FUNCTION

const auth = async (req, res, next) => {

    try {

        // GRAB THE TOKEN FROM THE REQUEST HEADERS

        const token = req.header("Authorization")

        // IF A TOKENN CANNOT BE FOUND. SEND AN ERROR

        if (!token) return res.status(400).json({msg: "Please log in or register."})

        // VERIFY THE TOKEN

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {

            // IF THERE IS AN ERROR, SEND IT TO THE CLIENT

            if (err) return res.status(400).json({msg: "Invalid Authorization"})

            // STORE THE PAYLOAD INSIDE A USER OBJECT WITHIN THE REQUEST

            req.user = payload

            // MOVE TO THE NEXT MIDDLEWARE FUNCTION

            next()

        })

    } catch (err) {

        // RETURN AN ERROR TO THE CLIENT

        return res.status(500).json({msg: err.message})

    }

}

// EXPORT THE AUTH MIDDLEWARE

module.exports = auth