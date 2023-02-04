const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = "Mynameismoniksyadavandimtryingtolearnbackend";

router.post('/loginuser', async(req, res) => {
    let email = {email: req.body.email};

        try {
            let userData = await User.findOne(email);
            if(!userData) {
                return res.status(400).json({errors: "check credentails"});
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)   

            if(!pwdCompare) {
                return res.status(400).json({errors: "check credentails"});
            }

            const data = {
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