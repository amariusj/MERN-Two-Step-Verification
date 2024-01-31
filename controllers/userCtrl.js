
// IMPORT ALL LIBRARIES

const jwt = require('jsonwebtoken')
const twilio = require('twilio')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')


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

            // RETURN A CONFIRMATION RESPONSE TO THE CLIENT

            return res.status(200).json({msg: "User successfully created!"})


        } catch (err) {

            return res.status(500).json({msg: err.message})

        }

    }

}

// EXPORT THE CONTROLLER

module.exports = ctrl