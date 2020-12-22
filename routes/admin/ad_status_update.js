// Imports
const express = require('express');
const Ads = require('../../models/Ads');
const auth_admin = require('../../middleware/auth_admin');
const { body , validationResult } = require('express-validator');

const router = express.Router();

// Routes
router.post('/', [
    auth_admin , [
        body( 'ad_id' , 'Ad is is empty.' ).trim().isLength({ min:24 }),
        body( 'ad_status' , 'Ad status Invalid').trim().isInt({ min:0 , max:1 }).toInt(),
    ]
] , async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }
    
    ad_id = req.body.ad_id
    ad_status = req.body.ad_status

    update = {
        ad_status,
        ad_pending: 0
    }

    try{
        ads = await Ads.findByIdAndUpdate( ad_id , update , {new:true})
        json_ads = {
            "ad_status": ads.ad_status,
            "ad_pending": ads.ad_pending,
            "_id": ads._id
        }
        return res.json( json_ads );
    } catch(err){
        console.error(err);
        return res.status(400).json({ 'main_error': "Error" })
    }

});

// Export
module.exports = router;