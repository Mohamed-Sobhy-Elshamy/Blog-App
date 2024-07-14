const asyncHandler = require("express-async-handler")
const {Comment, validateCreatedComment, validateUpdateComment} = require('../modules/Comment')
const {User} = require('../modules/User')

// Documentation // comment handler 
/**--------------------------
 *  @desc create new comment 
 *  @route /api/comments
 *  @method POST
 *  @access private (only logged in user)
------------------------------- */
// this is controller 
module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
    // 1. validation
    const {error} = validateCreatedComment(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message })
    }

    // 2. ناخد profile بتاع ال user => عشان محتاج ال username
    const profile = await User.findById(req.user.id)

    // 3. new comment
    const comment = await Comment.create({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id,
        username: profile.username 
    })

    // 4. send response 
    res.status(201).json(comment) // status => 201 = created 
}) // نعمل new route 




// Documentation // get all comments
/**--------------------------
 *  @desc get all comments
 *  @route /api/comments
 *  @method GET
 *  @access private (only ADMIN)
------------------------------- */

// controller
module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
    const comments = await Comment.find().populate("user")
    res.status(200).json(comments)
}) // نعمل route






// Documentation // Delete Comment
/**--------------------------
 *  @desc delete comment
 *  @route /api/comments/:id => comment id
 *  @method GET
 *  @access private (only admin or owner of the comment)
------------------------------- */

// controller 
module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
    // ناخد الكومنت from db => نشوف ال comment is exist or not
    const comment = await Comment.findById(req.params.id);

    // if no comment 
    if(!comment) {
        return res.status(404).json({message: "Comment NOT FOUND "})
    }

    // لازم نعمل authorization => لان فولنا admin or the owner of this comment 
    if(req.user.isAdmin || req.user.id === comment.user.toString()) {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({message : "Comment has been deleted !!"})
    } else {
        res.status(403).json({message: "access denied, not allowed"})        // status => 403 = forbidden
    }
}) // نعمل ال route


// Documentation // update Comment
/**--------------------------
 *  @desc update comment
 *  @route /api/comments/:id => comment id
 *  @method PUT
 *  @access private (only owner of the comment)
------------------------------- */

// controller 
module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
    // validation
    const {error} = validateUpdateComment(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }

    // get the comment from database 
    const comment = await Comment.findById(req.params.id)
    if(!comment) {
        return res.status(404).json({message: "comment NOT FOUND"})
    }

    // authorization => هل ال user اللي عاوز يعمل update to the comment بتاعه ولا لاء
    if(req.user.id !== comment.user.toString()) {
        return res.status(403).json({message: "access denied, only user himself can edit his comment !" })
    }

    // update the comment 
    const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
        $set: {
            text: req.body.text
        }
    }, {new: true})

    // send response to the client 
    res.status(200).json(updateComment)
}) // نعمل ال route















