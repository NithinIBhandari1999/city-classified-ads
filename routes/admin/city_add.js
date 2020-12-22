const express = require('express');
const City = require('../../models/City');
const auth_admin = require('../../middleware/auth_admin');
const { body , validationResult } = require('express-validator');

const router = express.Router()

router.post('/' , [
    auth_admin , [
        body('city_name' , 'City Name is Empty').trim().escape().not().isEmpty()
    ]
] , async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ "errors" : errors.array() });
    }

    // Destructure body variable
    city_name = req.body.city_name;
    city_name = city_name.toLowerCase()

    // Perform DB insert
    try{
        const newCity = new City({ city_name });
        const city = await newCity.save();
        res.json(city);
    } catch(err){
        // console.error(err.message);
        // console.error(err);
        res.status(400).json({ "main_error": "Not inserted" });
    }
    
});

module.exports = router;