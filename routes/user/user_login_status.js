// Imports
const express = require('express');
const Ads = require('../../models/Ads');
const auth_user = require('../../middleware/auth_user');
const { body , validationResult } = require('express-validator');
const mongoose = require('mongoose')

const router = express.Router();

// Routes
router.post('/', [
    auth_user
] , async (req, res) => {
    
    return res.json({
        user_login_status: true
    });

});

// Export
module.exports = router;