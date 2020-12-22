const express = require('express');
const Ads = require('../../models/Ads');
const { body , validationResult } = require('express-validator');
const auth_user = require('../../middleware/auth_user');

const router = express.Router()

// ----- ----- ----- -----
// @route   POST api/admin/login
// @desc    Add Post by user
// @access  Public

router.post('/', [
    auth_user , [
        body( 'ad_name' , 'Ad name is empty.' ).trim().not().isEmpty() ,
        body( 'ad_desc' , 'Ad description is empty.' ).trim().not().isEmpty() ,
        body( 'ad_contact_name' , 'Ad contact name is empty.' ).trim().not().isEmpty() ,
        body( 'ad_contact_number' , 'Ad contact number is empty.' ).trim().isInt(),
        body( 'ad_price' , 'Ad price is empty.' ).trim().isInt().toInt(),
        body( 'ad_category' , 'Please select valid category.' ).custom( value => {
            if( value == null ){
                throw new Error('Please enter Category Id')
            } else if(value.match(/^[a-z0-9A-Z]{24}$/)){
                return true
            } else {
                throw new Error('Invalid Category Id')
            }
        } ),
        body( 'ad_city' , 'Please select valid city.' ).custom( value => {
            if( value == null ){
                throw new Error('Please enter city Id')
            } else if(value.match(/^[a-z0-9A-Z]{24}$/)){
                return true
            } else {
                throw new Error('Invalid City Id')
            }
        } )
    ]
] , async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }

    // Get variable from body
    ad_name= req.body.ad_name
    ad_desc= req.body.ad_desc
    ad_contact_name= req.body.ad_contact_name
    ad_contact_number= req.body.ad_contact_number
    ad_price= req.body.ad_price
    ad_city = req.body.ad_city
    ad_category = req.body.ad_category
    userInfo_id = req.authData.user_id

    // Insert into a collection
    try{
        const newAds = new Ads({ userInfo_id , ad_name , ad_desc,  ad_price , ad_contact_name , ad_contact_number , ad_city , ad_category });
        const ads = await newAds.save()

        json_ads = JSON.parse( JSON.stringify(ads) );
        delete json_ads.userInfo_id
        
        return res.json(json_ads);
    } catch(err) {
        return res.status(400).json({ "main_error" : "Some unexpected error." })
    }

});

module.exports = router;