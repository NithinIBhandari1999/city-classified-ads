// Imports
const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
require('dotenv').config()
const path = require('path');

// Connect Database
connectDB();

// Initialize App
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// allow CORS:
if (process.env.NODE_ENV === 'testing') {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
}

// Routes
app.use('/api/admin/admin_login', require('./routes/admin/admin_login'))
app.use('/api/admin/category_add', require('./routes/admin/category_add'))
app.use('/api/admin/city_add', require('./routes/admin/city_add'))
app.use('/api/admin/ad_list', require('./routes/admin/ad_list'))
app.use('/api/admin/ad_status_update', require('./routes/admin/ad_status_update'))
app.use('/api/admin/admin_login_status', require('./routes/admin/admin_login_status'))

app.use('/api/user/user_login', require('./routes/user/user_login'));
app.use('/api/user/user_signup', require('./routes/user/user_signup'));
app.use('/api/user/user_login_status', require('./routes/user/user_login_status'));
app.use('/api/user/ad_add', require('./routes/user/ad_add'));
app.use('/api/user/ad_list', require('./routes/user/ad_list'));
app.use('/api/user/ad_delete', require('./routes/user/ad_delete'));

app.use('/api/page/ad_view', require('./routes/page/ad_view'));
app.use('/api/page/ad_all', require('./routes/page/ad_all'));
app.use('/api/page/search', require('./routes/page/search'));

app.use('/api/other/city_list', require('./routes/other/city_list'));
app.use('/api/other/category_list', require('./routes/other/category_list'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

// Listen
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`City Classified Ad app listerning at http://localhost:${port}`)
});