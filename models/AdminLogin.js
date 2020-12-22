const mongoose = require('mongoose');

const AdminLoginSchema = mongoose.Schema({
    adminLogin_id: {
        type: String,
        required: true,
    },
    adminLogin_password: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('adminLogin', AdminLoginSchema , 'adminLogin' );