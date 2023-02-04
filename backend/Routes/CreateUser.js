const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret = "Mynameismoniksyadavandimtryingtolearnbackend";

router.post("/createuser", [

    body('email').isEmail(),
    body('name').isLength({min: 3}),
    body('password', 'length should be atleast 5').isLength({min: 5}) ],

    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password, salt);   // first param is the thing you want to secure and second is salt

        try {
            await User.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
                address: req.body.address
            })

            res.json({success: true});

            }
        catch(err) {
            console.log(err);
            res.json({success: false});
        } 

    }
    
)


router.post('/loginuser', async(req, res) => {
    let email = {email: req.body.email};

        try {
            let userData = await User.findOne(email);
            if(!userData) {
                return res.status(400).json({errors: "check credentails"});
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)   //bcrypt.compare() use to compare 
            // the hash password with human readable password 1st param is hash and second is the password sent by user during logging in

            if(!pwdCompare) {
                return res.status(400).json({errors: "check credentails"});
            }

            const data = {      // data used in signature
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret);

            return res.json({success: true, authToken: authToken});
            }


        catch(err) {
            console.log(err);
            res.json({success: false});
        } 
});

module.exports = router;