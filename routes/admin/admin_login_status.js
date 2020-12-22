// Imports
const express = require('express');
const Ads = require('../../models/Ads');
const auth_admin = require('../../middleware/auth_admin');
const { body , validationResult } = require('express-validator');
const mongoose = require('mongoose')

const router = express.Router();

// Routes
router.post('/', [
    auth_admin
] , async (req, res) => {
    
    return res.json({
        admin_login_status: true
    });

});

// Export
module.exports = router;