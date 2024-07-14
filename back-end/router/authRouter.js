// نحتاج ال router
const router = require('express').Router();

// نحتاج ال registerUserCtrl
const {registerUserCtrl, loginUserCtrl, verifyUserAccountCtrl} = require('../controllers/authController') 

//      /api/auth/register
router.post("/register", registerUserCtrl);
/*
كده لما نروح ع postman =>> http://localhost:8000/api/auth/register
هيجيب لنا =>> "message": "\"username"\ is required" =>> بتيجي من ال joi => bad request 
عشان احنا محددين ف ال validated => username = is required & email & password =>> solution 
    نروح ع  ال postman =>>>> raw > json > وبعدين نعمل ال json
    **************************
    دلوقتي لما املا ال json => هيجيب لي ال message اللي انا عاملها لما ال client يبعت request 
    You register successfully, please log in
*/



//      /api/auth/login
router.post("/login", loginUserCtrl)
/*
هنيجي ع الpostman نعمل =>> {{DOMAIN}}/api/auth/login
هيقولنا email is required =>> هنروح نعمل body > raw > josn > نملا ال json
*/

//      /api/auth/:userId/verify/:token
router.get("/:userId/verify/:token", verifyUserAccountCtrl);
// هنبعت req from front to this مسار


// لازم نعمل  export to router
module.exports = router;

