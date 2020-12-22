// Imports
const express = require('express');
const Ads = require('../../models/Ads');
const { body , validationResult } = require('express-validator');
const mongoose = require('mongoose')

const router = express.Router();

// Routes
router.post('/' , [
    body( 'ad_id' , 'Ad is is empty.' ).trim().isLength({ min:24 }),
] , async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }

    ad_id = req.body.ad_id

    try{
    
        const ads = await Ads.aggregate([
            {
                "$match": { "_id": mongoose.Types.ObjectId(ad_id) }
            },
            {
                $lookup: {
                    from: "city",
                    localField: "ad_city",
                    foreignField: "_id",
                    as: "city_info"
                }
            },
            {
                $lookup: {
                    from: "category",
                    localField: "ad_category",
                    foreignField: "_id",
                    as: "category_info"
                }
            },
            {
                $unset: ['userInfo_id']
            }
        ])
        
        ads_ob = ads[0]

        if( ads_ob.ad_status === "1" && ads_ob.ad_pending == "0" ){
            return res.json(ads_ob);
        } else {
            return res.status(400).json({ 'main_error': "Ad not exist 1" });
        }
    }catch(err){
        console.error(err);
        return res.status(400).json({ 'main_error': "Ad not exist" });
    }

});

// Export
module.exports = router;