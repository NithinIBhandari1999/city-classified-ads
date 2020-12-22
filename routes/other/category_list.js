// Imports
const express = require('express');
const Category = require('../../models/Category');

const router = express.Router();

// Routes
router.get('/', async (req, res) => {
    try{
        const category = await Category.find().sort({ category_name: 1 });        
        res.json(category);
    }catch(err){
        // console.error(err.messsage);
        res.status(400).json({ "main_error": "Error" });
    }
});

// Export
module.exports = router;