// نحناج ال router 
const router = require("express").Router();

const { createPostCtrl, getAllPostsCtrl, getSinglePostCtrl, getPostsCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl } = require("../controllers/postController");
// نحتاج ال photo upload =>> photo upload middleware
// name this middleware = (photoProfile)
const photoUpload = require('../middlewares/photoProfile')
// عايزين  verifyToken
const {verifyToken} = require("../middlewares/verifyToken")

// المسار
//      /api/posts
router.route("/") 
    .post(verifyToken, photoUpload.single("image"), createPostCtrl)
    .get(getAllPostsCtrl)
// لازم ال verifyToken عشان لازم ال user يكون عامل log in && photoUpload
// the controller 

//          /api/posts/count
router.route("/count").get(getPostsCountCtrl)


const validateObjectId = require("../middlewares/validateObjectId")

    //      /api/posts/:id
router.route('/:id')
    .get(validateObjectId, getSinglePostCtrl)
    .delete(validateObjectId, verifyToken, deletePostCtrl)
    .put(validateObjectId, verifyToken, updatePostCtrl)



    //      /api/posts/update-image/:id
    router.route('/update-image/:id')
        .put(validateObjectId, verifyToken, photoUpload.single("image"), updatePostImageCtrl)



    //     /api/posts/like/:id=> id بتاع ال post
router.route('/like/:id')
    .put(validateObjectId, verifyToken, toggleLikeCtrl)



// export
module.exports = router;
// نروح بقا ع app.js