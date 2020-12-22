const mongoose = require('mongoose');

const AdSchema = mongoose.Schema({

    userInfo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo',
        required: true
    },
    ad_name: {
        type: String,
        required: true
    },
    ad_desc: {
        type: String,
        required: true
    },
    ad_price: {
        type: Number,
        required: true
    },
    ad_city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required: true
    },
    ad_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catrgory',
        required: true
    },
    ad_contact_name: {
        type: String,
        required: true
    },
    ad_contact_number: {
        type: Number,
        required: true
    },
    ad_status: {
        type: String,
        required: true,
        default: "0",
    },
    ad_pending: {
        type: String,
        required: true,
        default: "1",
    },
    ad_created_on: {
        type: Date,
        default: Date.now
    }

});

// 0 = not pending , not approved , not deleted
// 1 =     pending ,     approved ,     deleted  

module.exports = mongoose.model('ad' , AdSchema, 'ad');