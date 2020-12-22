var jwt = require('jsonwebtoken');

const auth_admin = async (req, res, next) => {
    
    if( req.cookies.JWT_Auth_Token_Admin ){
        
        try {
            var decoded = await jwt.verify(req.cookies.JWT_Auth_Token_Admin, process.env.jwtSectetKeyValue);
            req.authData = decoded
            next()
        } catch(err) {
            // console.log(err)
            res.clearCookie("JWT_Auth_Token_Admin")
            res.status(401).json({
                "admin_login_status": false
            })
        }

    } else {
        res.clearCookie("JWT_Auth_Token_Admin")
        res.status(401).json({
            "admin_login_status": false
        })
    }
}

module.exports = auth_admin;