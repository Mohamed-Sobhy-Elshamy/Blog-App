const mongoose = require("mongoose")
const joi = require("joi")

// Comment Schema 
const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true 
    },
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

// Comment Model
const Comment = mongoose.model("Comment", CommentSchema);


// validate create comment 
function validateCreatedComment(obj) {
    const schema = joi.object({
        postId: joi.string().required().label("Post ID"),
        text: joi.string().trim().required(),
    })
    return schema.validate(obj);
}


// validate updata comment 
function validateUpdateComment(obj) {
    const schema = joi.object({
        text: joi.string().required()
    })
    return schema.validate(obj)
}

// exports 
module.exports = {
    Comment,
    validateCreatedComment,
    validateUpdateComment
}
