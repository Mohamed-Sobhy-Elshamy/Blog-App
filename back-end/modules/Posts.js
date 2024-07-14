const mongoose = require('mongoose')
const joi = require('joi'); // عشان ال validation


// Post Schema 
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    category: {
        type: String,
        required: true
    }, 
    image: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    }, 
    likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        // ال user اللي يعمل like to post => store your id in likes array
    ]
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}) // عشان عايزين نضيف حاجة to schema virtually 


/*
user 
=> من نوع object id
=> ref ناخدال user from User model => نقدر نعمل relation between collections
*/


// populate comment for this post 
PostSchema.virtual("comments", {
    ref: "Comment", 
    foreignField: "postId",
    localField: "_id"
})





// post model 
const Post = mongoose.model("Post", PostSchema)


// validate create post 
function validateCreatePost(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(2).max(200).required(),
        description: joi.string().trim().min(10).required(),
        category: joi.string().trim().required()
    })
    return schema.validate(obj)
}


// validate update post 
function validateUpdatePost(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(2).max(200),
        description: joi.string().trim().min(10),
        category: joi.string().trim()
    })
    return schema.validate(obj)
}

// exports 
module.exports = {
    Post, validateCreatePost, validateUpdatePost
}