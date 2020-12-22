const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('category', CategorySchema , 'category' )