const express = require('express');
const UserInfo = require('../../models/UserInfo');
const { body , validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const router = express.Router()

// ----- ----- ----- -----
// @route   POST api/admin/login
// @desc    Admin Login
// @access  Public

router.post('/', [
    body( 'user_name' , 'User name is empty.' ).trim().not().isEmpty() ,
    body( 'user_email' , 'User email is empty.' ).trim().isEmail() ,
    body( 'user_password' , 'Invalid value. Password min length should be 8.' ).trim().isLength({ min:8 }) ,
] , async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }

    // Get variable from body
    user_name = req.body.user_name
    user_email = req.body.user_email
    user_password = req.body.user_password

    let result = await UserInfo.findOne({ user_email: user_email })
    if( result !== null ){
        return res.status(400).json({ "main_error": "Account already Exist. Please Login." })
    }
    
    // Create password hash
    const salt = await bcryptjs.genSalt(10);
    const user_password_new = await bcryptjs.hash(user_password , salt);

    // Insert into collection
    try{
        const newUserInfo = new UserInfo({ user_name , user_email , user_password: user_password_new });
        const user = await newUserInfo.save()

        var token = await jwt.sign({ 
            user_id: user._id,
        }, process.env.jwtSectetKeyValue);

        res.cookie('JWT_Auth_Token_User', token, { httpOnly: true });

        return res.json({
            user_email: user.user_email,
            user_id: user._id,
            user_login_status: true
        });

    } catch(err) {
        console.log(err)
        return res.status(400).json({ "main_error" : "Some unexpected error." })
    }

});

module.exports = router;