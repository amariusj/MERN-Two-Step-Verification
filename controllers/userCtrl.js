
// ADD ENVIRONMENT VARIABLES

const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
} = process.env

// IMPORT ALL LIBRARIES

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


// CREATE THE CONTROLLER AND ITS FUNCTIONS

const ctrl = {

    // REGISTER --- SAVES A NEW USER TO THE DATABASE AND SENDS A VERIFICATION CODE

    register: async (req, res) => {
        
        try {

            // GRAB THE SUBMITTED DATA FROM THE REQUEST BODY

            const {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                confirmPassword
            } = req.body


            // CREATE A REGULAR EXPRESSION FOR THE FIRST AND LAST NAME

            const validateName = /^[a-z ,.'-]+$/i


            // CREATE A REGULAR EXPRESSION FOR THE EMAIL ADDRESS

            const validateEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


            // CREATE AN ARRAY STORE POTENTIAL ERRORS

            let validationErrors = []


            // VERIFY ALL REQUIRED FIELDS HAVE VALUE

            if (!firstName || !firstName.match(validateName)) validationErrors.push("Please enter a first name.")
            if (!lastName || !lastName.match(validateName)) validationErrors.push("Please enter a last name.")
            if (!email || !email.match(validateEmail)) validationErrors.push("Please enter an email address.")
            if (!password) validationErrors.push("Please enter a password.")
            if (!confirmPassword) validationErrors.push("Please enter a confirmation password.")
            if (!phoneNumber) validationErrors.push("Please enter a phone number.")


            // CHECK IF A USER ALREADY EXISTS WITH THAT EMAIL ADDRESS

            const existingUser = await User.findOne({email})

            // IF A USER DOES EXIST, ADD IT TO THE ERRORS ARRAY

            if (existingUser) validationErrors.push("A user with that email address already exists")

            // IF ANY ERRORS EXISTS, SEND THEM TO THE CLIENT

            if (validationErrors.length > 0) return res.status(400).json({errors: validationErrors})



            // PASSWORD VALIDATION

            

            // CREATE AN ARRAY TO STORE POTENTIAL ERRORS

            let passwordErrors = []

            // VERIFY THE PASSWORD IS AT LEAST 8 CHARACTERS LONG

            if (password.length < 8) passwordErrors.push("Your password must be at least 8 characters long.")

            // VVERIFY THE PASSWORD HAS A LOWERCASE LETTER

            if (!password.match(/[a-z]/)) passwordErrors.push("Your password must contain at leasgt one lower case letter.")

            // VERIFY THE PASSWORD HAS AN UPPERCASE LETTER

            if (!password.match(/[A-Z]/)) passwordErrors.push("Your password must contain at least one uppercase letter.")

            // VERIFY THE PASSWORD HAS A DIGIT

            if (!password.match(/[0-9]/)) passwordErrors.push("Your password must contain at least one digit.")

            // VERIFY THE PASSWORD HAS AT LEAST ONE SPECIAL CHARACTER

            if (!password.match(/[!@#\\$%\\^&\\*()]/)) passwordErrors.push("Your password must contain at least one special character.")

            // VVERIFY THE PASSWORDS MATCH
            if (password !== confirmPassword) passwordErrors.push("Your password and confirmation password do not match.")


            // IF ANY ERRORS EXISTS, SEND THEM TO THE CLIENT

            if (passwordErrors.length > 0) return res.status(400).json({errors: passwordErrors})


            // SAVE THE USER INFO INTO THE DATABASE



            // HASH THE PASSWORD

            const hashedPassword = await bcrypt.hash(password, 10)

            // STORE THE USER'S DATA INSIDE AN OBJECT

            const userData = {
                firstName,
                lastName,
                email,
                phoneNumber,
                password: hashedPassword
            }

            // CREATE A NEW USER DOCUMENT

            const newUser = new User(userData)

            // SAVE THE NEW USER DOCUMENT TO THE DATABASE

            await newUser.save()    


            // TWO-STEP VERIFY THE USER


            // CREATE A VERIFICATION SERVICE

            const verificationService = await client.verify.v2.services
                .create({friendlyName: 'Two-Step Verification Test'})

            // SEND THE VERIFICATION CODE TO THE SUBMITTED PHONE NUMBER

            await client.verify.v2.services(verificationService.sid)
                .verifications
                .create({ to: phoneNumber, channel: 'sms' })

            // RETURN THE VERIFICATION SERVICE AND  CODE SIDS TO THE CLIENT

            return res.status(200).json({
                msg: "User successfully created!",
                sid: verificationService.sid,
                id: newUser._id
            })


        } catch (err) {

            return res.status(500).json({msg: err.message})

        }

    },

    // VERIFYSMS --- VERIFIES THE USERS CREDENTIALS AND CREATES A USER SESSION

    verifySms: async (req, res) => {

        try {

            // GRAB THE SUBMITTED DATA FROM THE REQUEST BODY

            const {

                sid,
                code,
                phoneNumber,
                id

            } = req.body

            // SUBMIT THE VERIFICATION CODE TO THE VERIFICATION SERVICE

            const verification = await client.verify.v2.services(sid)
                .verificationChecks
                .create({ to: phoneNumber, code })

            // IF THE STATUS IS PENDING, SEND AN ERROR

            if (verification.status === 'pending') return res.status(400).json({msg: "Incorrect code."})

            // IF THE STATUS IS APPROVED, CREATE A USER SESSION

            if (verification.status === 'approved') {

                // CREATE THE ACCESS TOKEN

                const accessToken = createAccessToken({id})

                // CREATE THE REFRESH TOKEN

                const refreshToken = createRefreshToken({id})

                // CREATE A COOKIE AND STORE THE REFRESH TOKEN IN IT

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    path: '/user/refresh-token',
                    maxAge: 1000 * 60 * 60 * 24 * 7 //7d
                })

                // SEND THE ACCESS TOKEN TO THE CLIENT

                return res.status(200).json({
                    accessToken
                })

            }

        } catch (err) {

            return res.status(500).json({msg: err.message})

        }

    },

    // REFRESH --- GENERATES A NEW REFRESH AND ACESS TOKEN

    refresh: async (req, res) => {

        try {

            // GRAB THE REFRESH TOKEN COOKIE FROM THE REQUEST

            const { refreshToken } = req.cookies

            // IF THE COOKIE CANNOT BE FOUND, SEND AN ERROR TO THE CLIENT

            if (!refreshToken) return res.status(400).json({msg: "Please login or register."})

            // VERIFY THE TOKEN IS VALID

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {

                // IF THERE IS AN ERROR WITH VERIFYING THE TOKEN, SEND THE ERROR

                if (err) return res.status(400).json({msg: "Invalid Authorization"})

                // GENERATE A NEW ACCESS TOKEN

                const accessToken = createAccessToken({id: payload.id})

                // GENERATE A NEW REFRESH TOKEN

                const refreshToken = createRefreshToken({id: payload.id})

                // REFRESH THE REFRESH TOKEN COOKIE

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    path: '/user/refresh-token',
                    maxAge: 1000 * 60 * 60 * 24 * 7 //7d
                })

                // SEND THE ACCESS TOKEN TO THE CLIENT

                return res.status(200).json({msg: accessToken})

            })

        } catch (err) {

            return res.status(500).json({msg: err.message})

        }

    },

    // LOGIN --- CHECKS FOR AN EXISTING USER AND SENDS A VERIFICATION CODE

    login: async (req, res) => {

        try {

            // GRAB THE DATA SUBMITTED FROM THE REQUEST BODY

            const {

                email,
                password

            } = req.body

            // CHECK IF A USER ALREADY EXISTS

            const user = await User.findOne({email}).select('password phoneNumber')

            // IF A USER CANNOT BE FOUND, SEND AN ERROR TO THE CLIENT

            if (!user) return res.status(400).json({msg: "A user does not exist with that email address."})

            // IF A PASSWORD WAS NOT PROVIDED, SEND AN ERROR

            if (!password) return res.status(400).json({msg: "Please eneter a password."})

            // VERIFY THE PASSWORD IS CORRECT

            const match = bcrypt.compare(password, user.password)

            // IF THE PASSWORD IS INCORRECT, SEND AN ERROR

            if (!match) return res.status(400).json({msg: "Incorrect password."})

            // TWO-STEP VERIFY THE USER


            // CREATE A VERIFICATION SERVICE

            const verificationService = await client.verify.v2.services
                .create({friendlyName: 'Two-Step Verification Test'})

            // SEND THE VERIFICATION CODE TO THE SUBMITTED PHONE NUMBER

            client.verify.v2.services(verificationService.sid)
                .verifications
                .create({ to: user.phoneNumber, channel: 'sms' })

            // RETURN THE VERIFICATION SERVICE AND  CODE SIDS TO THE CLIENT

            return res.status(200).json({
                sid: verificationService.sid,
                id: user._id
            })
            

        } catch (err) {

            return res.status(500).json({msg: err.message})

        }

    },

    // LOGOUT --- DELETS A USER'S SESSION

    logout: async (req, res) => {

        try {

            // CLEAR THE USER'S COOKIE

            res.clearCookie('refreshToken', { path: '/user/refresh-token' })

            // RETURN A CONFIRMATION MESSAGE TO THE CLIENT

            return res.status(200).json({msg: "User successfully logged out."})

        } catch (err) {

            return res.status(500).json({msg: err.message})

        }

    },

    // GETUSER --- SENDS THE USER INFORMATION TO THE CLIENT

    getUser: async (req, res) => {

        try {

            // LOCATE THE USER WITH THE ID FROM THE ACCESS TOKEN

            const user = await User.findById(req.user.id).select('-password')

            // IF A USER CANNOT BE FOUND, SEND AN ERROR

            if (!user) return res.status(400).json({msg: "This user no longer exists."})

            // RETURN THE USER INFORMATION TO THE CLIENT

            return res.status(200).json({user})

        } catch (err) {

            return res.status(500).json({msg: err.message})

        }
        
    },

    // DELETE --- DELETES THE USER FROM THE DATABASE

    delete: async (req, res) => {

        try {

            // LOCATE THE USER AND DELETE THEM

            const deletedUser = await User.findByIdAndDelete(req.user.id)

            // IF THERE ARE ANY ERRORS, SEND THEM TO THE CLIENT

            if (!deletedUser) return res.status(400).json({msg: "This user does not exist."})

            // CLEAR THE REFRESH COOKIE

            res.clearCookie('refreshToken')

            // RETURN A SUCCESSFUL MESSAGE TO THE CLIENT

            return res.status(200).json({msg: "User successfully deleted."})

        } catch (err) {

            // IF AN ERROR, RETURN AN ERROR TO THE CLIENT

            return res.status(500).json({msg: err.message})

        }

    }

}



// FUNCTIONS



// CREATE AN ACCESS TOKEN

const createAccessToken = (user) => {

    // RETURN THE SIGNED TOKEN VALUE

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m'})

}

// CREATE A REFRESH TOKEN

const createRefreshToken = (user) => {

    // RETURN THE SIGNED TOKEN VALUE

    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d'})

}


// EXPORT THE CONTROLLER

module.exports = ctrl