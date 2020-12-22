const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
    city_name: {
        type:String,
        required: true,
        unique:true
    }
});

module.exports = mongoose.model('city', CitySchema , 'city' );