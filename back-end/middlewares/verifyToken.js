const jwt = require('jsonwebtoken')

// Verify Token 
function verifyToken(req, res, next) {
    // هناخد ال token from headers
    const authToken = req.headers.authorization;
    // لو ال authToken موجود
    if(authToken) {
        const token = authToken.split(" ")[1];
        // نعمل try,catch ممكن يكون error 
        try {
            // لازم نفتح تشفير ال token
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); // this method from jwt
            // يفتح تشفير ال token && يدينا ال payload 
            // هعمل new object in the request
            req.user = decodedPayload;
            next(); // يعني ادي الشغل لل middleware اللي بعده
        } catch (error) {
            return res.status(401).json({message: "Invalid Token, access denied"})
        }
    } else {
        return res.status(401).json({message : "no token provided, access denied"})
    }
}


// verify token && admin 
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req,res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({message : "not allowed, only admin"})
        }
    })
}


// verify token & only user himself
function verifyTokenAndOnlyUser(req, res, next)  {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id) {
            next();
        } else {
            return res.status(403).json({message : "Not allowed, only user himself"})
        }
    })
}


// middleware (only admin or user himself) => delete user profile
// verify token & authorization 
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res ,() => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({message: "not allowed, only himself or user!"})
        }
    })
}




// نعمل export 
module.exports = {verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyTokenAndAuthorization}