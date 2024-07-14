// نحتاج mongoose عشان هنعمل module
const mongoose = require('mongoose')

// imports الحاجات اللي هحتاجها ف ال validation
const joi = require('joi')
// مكتبة ال token
const jwt = require('jsonwebtoken')

// For Security 
const passwordComplexity = require("joi-password-complexity")


// user schema 
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlenght: 2,
        maxlenght: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlenght: 5,
        maxlenght: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlenght: 8,
    },
    profilePhoto: {
        type: Object,
            default: {
                    url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                    publicId: null,
            }
    },
    bio: {type: String,},
    isAdmin: {
        type: Boolean,
        default: false,
    }, 
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps : true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
    })
// toJSON & toObject ده بيسمح لل virtual method ان يضيف field virtually to this schema



// يعني ازاي هيكون شكل ال user 
/*
trim =>> بيشيل الفراغات من اول و اخر ال string
unique =>> فريدة من نوعها يعني ايميل مش هيكون متكرر ف ال database
url => اي حد هيعمل حساب ف الموقع بتاعنا ال default phote بتاعته عتبقا دي 
*/

/*
هنديه second object =>> timestemps بيضيف الى ال schema => two property 
    updated at && created at
*/

/*
عايز اعمل اتصال ال User with Posts => زي ما عامل ف ال Posts
by method virtual =>>> يعمل relation 
the first parameter => name of the collection 
the second parameter =>> ref = reference 
*/

// Populate posts that belongs to this user when he/she get his/her profile
UserSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id"
})
/*
virtaul = افتراضي هيضيف post to this schema 
ref => يشير الى اي => Posts model
foreignField => the external field =>> اللي انا كاتبه ف ال Posts model = user
localField => ال field المحلي 
*/





// generate auth token // لازم نكتبها function عادية
// نعمل  import to jwt
UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET)
}
// sign => اول parameter => payLoad
// تاني parameter => secret key بتكون string
// private key => الافضل تكون ف ال .env
// this يشير الى object the schema


// User Module 
const User = mongoose.model("User", UserSchema);


// validated register user
function validateRegisterUser(obj) {
    const schema = joi.object({
        username: joi.string().trim().min(2).max(100).required(),
        email: joi.string().trim().min(5).max(100).required().email(),
        // password: joi.string().trim().min(8).required(),
        password: passwordComplexity().required(),
    }); 
    return schema.validate(obj);
    // ف هذا ال object => لازم احدد البيانات اللي ال user لازم يعطيها
}

// validated login user
function validatedLoginUser(obj){ // انا عاوز الuser يديني ال email & password
    const schema = joi.object({
        email: joi.string().trim().min(2).max(100).required().email(),
        password: joi.string().trim().min(8).required()
    })
    return schema.validate(obj)
}


// تبع password controller 
// Validate Email 
function validateEmail(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
    });
    return schema.validate(obj)
}
// Validate New Password 
function validateNewPassword(obj) {
    const schema = joi.object({
        password: passwordComplexity().required(),
    });
    return schema.validate(obj)
}



// validate update user
function validateUpdateUser(obj) {
    const schema = joi.object({
        username: joi.string().trim().min(2).max(100),
        // password: joi.string().trim().min(8),
        password: passwordComplexity(),
        bio: joi.string(),
    }) // كده ال user يقر يعدل ف ال 3 دول بس
    return schema.validate(obj)
}



// exports
module.exports = {
    User, 
    validateRegisterUser, 
    validatedLoginUser, 
    validateUpdateUser,
    validateEmail, 
    validateNewPassword
};