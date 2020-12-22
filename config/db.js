const mongoose = require('mongoose');

const connectDB = async () => {
    db = process.env.mongoURI;
    try {
        await mongoose.connect( db , {
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology: true
        } );
        console.log("Mongo DB Connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;