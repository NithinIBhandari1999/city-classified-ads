// Imports
const express = require('express');
const Ads = require('../../models/Ads');
const { body , validationResult } = require('express-validator');
const mongoose = require('mongoose')
const router = express.Router();

// Routes
router.post('/', [
    body( 'search' , 'Search field empty.' ).trim().not().isEmpty(),
    body( 'page' , 'Please enter page.' ).trim().isInt({ min:1 }),
    body( 'ad_category' , 'Please select valid category.' ).custom( value => {
        if (value == "0"){
            return true;
        } else if(value.match(/^[a-z0-9A-Z]{24}$/)){
            return true;
        } else {
            throw new Error('Invalid City Id')
        }
    } ),
    body( 'ad_city' , 'Please select valid city.' ).custom( value => {
        if (value == "0"){
            return true
        } else if(value.match(/^[a-z0-9A-Z]{24}$/)){
            return true
        } else {
            throw new Error('Invalid City Id')
        }
    } )
] , async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() });
    }
    
    // return res.send('a');

    page = req.body.page
    ad_city = req.body.ad_city
    ad_category = req.body.ad_category
    search = req.body.search

    limit = 25
    if( page <= 1 ){
        skip = 0
    } else {
        skip = (page-1)*limit
    }

    try{
        
        count = false

        condition = {
            ad_pending: "0" ,
            ad_status: "1"
        }
        condition.$or = [
            {
                ad_name : new RegExp(search, 'i')
            },
            {
                ad_desc : new RegExp(search, 'i')
            }
        ]
        if ( ad_city !=0 ){
            condition.ad_city = mongoose.Types.ObjectId(ad_city)
        }
        if ( ad_category !=0 ){
            condition.ad_category = mongoose.Types.ObjectId(ad_category)
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