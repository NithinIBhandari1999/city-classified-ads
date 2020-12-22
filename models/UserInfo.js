const mongoose = require('mongoose');

const UserInfoSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_created_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('userInfo', UserInfoSchema , 'userInfo' );