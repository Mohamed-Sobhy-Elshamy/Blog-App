// ناخد ال router from => express.Router
const router = require('express').Router();

const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl, profilePhotoUploadCtrl, deleteUserProfileCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyToken, verifyTokenAndAuthorization } = require('../middlewares/verifyToken');
// const { verifyToken } = require('../middlewares/verifyToken');

// لازم نعمل ال route 
//      /api/users/profile
// router.route('/profile', getAllUsersCtrl); // wrong
// router.route('/profile').get( verifyToken ,getAllUsersCtrl)
router.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl)
// نروح ع ال postman => نشوف ال route ده

// كده هنلاقيه جاب كل ال users => in the > postman


/*
بس هنا ف مشكلة ان اي حد ممكن يشوف ال  users 
واحنا قايلين انها private => يعني ال admin بس اللي يشوفها
*/

/*
لما ال user => بيعمل login يجيب له token >> بيبقا مشفر
موجود فيه ال id بتاع user & isAdmin واحنا نحتاج ال admin
this token بيبين ان ال user ده admin ولا لاء
*/

/*
يعني ال user اللي بيبعت request to this endPoint 
{{DOMAIN}}/api/users/profile => ياكد لنا ان ال this user => is admin or not
لازم يدينا token مع ال request بتاعه
****************
يعني يعمل login >> يدينا token => وف ال server نعمل verify to this tken
يعني نعمل check نشوف ال token دي صح ولا لاء =>> the user is admin or not 
****************
ناخد ال token اللي ف ال login => نحطه ف ال headers في profile = الكلام ده فال postman

#### headers خلي ف علطول معلومات عن ال req => such as >> token
Key = Authorization && Value = Bearer & token == call this (Bearer token)
*/


//      /api/users/count
router.route('/count').get(verifyTokenAndAdmin, getUsersCountCtrl)


const validateObjectId = require('../middlewares/validateObjectId');



//      /api/users/profile/:id
router.route('/profile/:id')
    .get(validateObjectId, getUserProfileCtrl)
    .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
    .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl)
// نروح ع ال postman نعمل request to this endPoint 
/*
لما تيجي تبعت request to this method => هيشغل اول middleware(validateObjectId) لو كل حاجة مظبوطة هيبعت الشغل لل
middleware اللي بعده => middleware يعمل check to token يشوف هل ال user ده هو نفسه 
وبعدين يدي الشغل لل middleware اللي بعده اللي هو  updatedUserProfileCtrl
*/
/*
كده انا لو بعت req ->> {{DOMAIN}}/api/users/profile/1
هيجيبلي كده
{
    "message": "Invalid ID"
}
*/
/*
هروح اعمل request ل =>>> {{DOMAIN}}/api/users/profile/64c9b65afa97778dc64c0bb8
هيجيب لي ال user بتاع ال id ده
*/




const photoUpload = require('../middlewares/photoProfile');
// profile photo route 
//      /api/users/profile/profile-photo-upload
router.route("/profile/profile-photo-upload") // احنا عايزين ال log in user (verify token)
.post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl)
// photoUpload.singe("image") =>> يعني اريد احمل صورة واحدة && name اللي هيجي من ال client > image


/*
نروح نجرب ف  postman =>> الاول نجيب ال token بتاع اي user => وبعدين ع ال headers >> key = Authorization 
    Value = Bearer = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2MzMmRkMzdhZTZhZDU1N2EwMTg2MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MTIwMzQ1MH0.MS3KBOgcBQ6U_bM6O_hSC21hgnGkeg1nK61VVXCTumo
    ده ال token بتاع user عاملو login
    كده لما ارسل request => هيجيب لي ال message اللي انا عاملها 
*/


// نعمل  export to this router
module.exports = router;
// نروح نضيف ال route in the app.js