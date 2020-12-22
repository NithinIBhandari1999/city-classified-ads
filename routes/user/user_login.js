const express = require('express');
const UserInfo = require('../../models/UserInfo');
const validator = require('validator');
const { body , validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');

const router = express.Router()

// ----- ----- ----- -----
// @route   POST api/user/login
// @desc    User Login
// @access  Public

router.post('/', [
    body( 'user_email' , 'User email is empty.' ).trim().isEmail() ,
    body( 'user_password' , 'Invalid value. Password min length should be 8.' ).trim().isLength({ min:8 })
] , async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }

    user_email = req.body.user_email
    user_password = req.body.user_password

    try {
        let result = await UserInfo.findOne({ user_email: user_email })
        if( result == null ){
            return res.status(400).json({ "main_error": "Account does not exist." })
        } else {
            const isMatch = await bcryptjs.compare( user_password , result.user_password );

            if (user_email == result.user_email && isMatch ) {

                var token = await jwt.sign({ 
                    user_id: result._id,
                }, process.env.jwtSectetKeyValue);

                res.cookie(
                    'JWT_Auth_Token_User',
                    token, 
                    {
                        expires: new Date(Date.now() + 365 * 24 * 3600000),
                        httpOnly: true 
                    }
                )

                return res.json({
                    user_email: result.user_email,
                    user_id: result._id,
                    user_login_status: true
                });

            } else {
                return res.status(400).json({
                    "main_error": "Password is not correct. Please enter correct Password."
                })
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ "main_error": "Account does not exist." })
    }

});

module.exports = router;