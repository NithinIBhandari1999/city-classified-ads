// Imports
const express = require('express');
const Ads = require('../../models/Ads');
const auth_admin = require('../../middleware/auth_admin');
const { body , validationResult } = require('express-validator');
const mongoose = require('mongoose')

const router = express.Router();

// Routes
router.post('/', [
    auth_admin , [
        body( 'page' , 'Please enter page.' ).trim().isInt({ min:1 }),
        body( 'type' , 'Please select valid type.' ).trim().isInt({ min:1 , max:4 }).toInt(),
    ]
] , async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }

    page = req.body.page
    type = req.body.type

    limit = 25
    if( page <= 1 ){
        skip = 0
    } else {
        skip = (page-1)*limit
    }

    try{
        
        count = false

        condition = {}

        if( type === 1 ){
            // all ad
        } else if( type === 2 ){
            // only pending ad
            condition.ad_pending="1";
        } else if( type === 3 ){
            // only approved ad
            condition.ad_pending= "0"
            condition.ad_status= "1"
        } else if( type === 4 ){
            // only not approved ad
            condition.ad_pending= "0"
            condition.ad_status= "0"
        } 

        const ads = await Ads.aggregate([
            {
                "$match": condition
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
                $skip: skip
            },
            {
                $limit: (limit+1)
            },
            {
                $unset: ['userInfo_id']
            }
        ])

        if( ads.length > limit ){
            count = true
			ads.pop();
        }

        res.json({ count , data: ads });
    }catch(err){
        console.error(err);
        res.status(400).json({ 'main_error': "Error" })
    }

});

// Export
module.exports = router;