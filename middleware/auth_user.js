var jwt = require('jsonwebtoken');

const auth_user = async (req, res, next) => {

    if( req.cookies.JWT_Auth_Token_User ){

        try {
            var decoded = await jwt.verify(req.cookies.JWT_Auth_Token_User, process.env.jwtSectetKeyValue);
            req.authData = decoded
            next()
        } catch(err) {
            // console.log(err)
            res.clearCookie("JWT_Auth_Token_User")
            res.status(401).json({
                "user_login_status": false
            })
        }

    } else {
        res.clearCookie("JWT_Auth_Token_User")
        res.status(401).json({
            "user_login_status": false
        })
    }

}

module.exports = auth_user;