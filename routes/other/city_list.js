// Imports
const express = require('express');
const City = require('../../models/City');

const router = express.Router();

// Routes
router.get('/', async (req, res) => {
    try{
        const city = await City.find().sort({ city_name: 1 });        
        res.json(city);
    }catch(err){
        // console.error(err.messsage);
        res.status(400).json({ "main_error": "Error" });
    }
});

// Export
module.exports = router;