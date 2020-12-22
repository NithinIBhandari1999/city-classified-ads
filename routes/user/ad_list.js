// Imports
const express = require('express');
const Ads = require('../../models/Ads');
const auth_user = require('../../middleware/auth_user');
const mongoose = require('mongoose')
const router = express.Router();

// Routes
router.post('/', [ auth_user ] , async (req, res) => {
    userInfo_id = req.authData.user_id
    try{
        // const ads = await Ads.find({ userInfo_id }).sort({ ad_name: -1 }).select(["-userInfo_id"]);   
        
        let condition = {
            userInfo_id: mongoose.Types.ObjectId(userInfo_id)
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
            }
        ])

        // console.log(ads);
        res.json(ads);
    }catch(err){
        console.error(err);
        res.status(400).json({ "main_error": "Error" });
    }
});

// Export
module.exports = router;