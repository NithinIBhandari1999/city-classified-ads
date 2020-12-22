const express = require('express');
const Category = require('../../models/Category');
const auth_admin = require('../../middleware/auth_admin');
const { body , validationResult } = require('express-validator');

const router = express.Router()

router.post('/' , [
    auth_admin , [
        body('category_name' , 'Category Name is Empty').trim().escape().not().isEmpty()
    ]
] , async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ "errors" : errors.array() });
    }

    // Destructure body variable
    category_name = req.body.category_name;
    category_name = category_name.toLowerCase()

    // Perform DB insert
    try{
        const newCategory = new Category({ category_name });
        const category = await newCategory.save();
        res.json(category);
    } catch(err){
        // console.error(err.message);
        // console.error(err);
        res.status(400).json({ "main_error": "Not inserted" });
    }
    
});

module.exports = router;