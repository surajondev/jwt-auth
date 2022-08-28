const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')

    if(!token){
        return res.json({msg:"No token found, authorization denied"})
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.username = decoded.username
        next()
    } catch (error) {
        console.log(error)
        res.json({msg:"Token is not valid"})
    }
}