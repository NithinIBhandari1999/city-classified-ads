const express = require('express');
const AdminLogin = require('../../models/AdminLogin');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const { body , validationResult } = require('express-validator');
const e = require('express');

const router = express.Router()

// ----- ----- ----- -----
// @route   POST api/admin/login
// @desc    Admin Login
// @access  Public

router.post('/', [
    body( 'adminLogin_id' , 'Admin name is empty.' ).trim().not().isEmpty() ,
    body( 'adminLogin_password' , 'Admin password is empty.' ).trim().not().isEmpty()
] , async (req, res) => {
	
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }

    adminLogin_id = req.body.adminLogin_id
    adminLogin_password = req.body.adminLogin_password

    try {
        let result = await AdminLogin.findOne({ adminLogin_id: adminLogin_id })
        if( result == null ){
            return res.status(400).json({ "main_error": "Account does not exist." })
        } else {
            if (adminLogin_id == result.adminLogin_id && adminLogin_password == result.adminLogin_password) {
                var token = await jwt.sign({ admin_id: result.adminLogin_id, }, process.env.jwtSectetKeyValue)
                res.cookie('JWT_Auth_Token_Admin', token, { expires: new Date(Date.now() + 365 * 24 * 3600000), httpOnly: true } )
                return res.json({ admin_id: result.adminLogin_id, admin_login_status: true });
            } else {
                return res.status(400).json({ "main_error": "Wrong Password. Please enter the correct password" })
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ "main_error": "Account does not exist." })
    }

});

module.exports = router;