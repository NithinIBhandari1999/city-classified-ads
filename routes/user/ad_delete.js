// Imports
const express = require('express');
const Ads = require('../../models/Ads');
const { body , validationResult } = require('express-validator');
const auth_user = require('../../middleware/auth_user');

const router = express.Router();

// Routes
router.post('/', [
    auth_user , [
        body( 'ad_id' , 'Please enter valid Ad Id.' ).custom( value => {
            if( value == null ){
                throw new Error('Please enter Ad Id')
            } else if(value.match(/^[a-z0-9A-Z]{24}$/)){
                return true
            } else {
                throw new Error('Invalid Ad Id')
            }
        } ),
    ]
] , async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }

    ad_id = req.body.ad_id;
    userInfo_id = req.authData.user_id;

    try{
        const ads = await Ads.findOneAndRemove({ _id: ad_id , userInfo_id }).sort({ ad_name: -1 }).select(["_id"]);
        // console.log(ads);
        if( ads ){
            return res.json({ _id: ads._id });
        } else {
            return res.status(400).json({ main_error: "Unexpected error. Not deleted." });
        }
    }catch(err){
        console.error(err);
        return res.status(400).json({ main_error: "Unexpected error." });
    }

});

// Export
module.exports = router;