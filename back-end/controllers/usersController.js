// نحتاج ال async handler
const asyncHandler = require('express-async-handler')
// هنحتاج ال User from modules
const {User, validateUpdateUser} = require('../modules/User');
const { json } = require('express');
const bctypt = require('bcryptjs')
const path = require("path"); // import from node
const {cloudinaryUploadImage, cloudinaryRemoveImage, cloudinaryRemoveMultipleImage} = require('../utils/cloudinary')
const fs = require('fs')
const {Comment} = require("../modules/Comment")
const {Post} = require("../modules/Posts")



// documentation
/** -------------------------------
 *  @desc get all users profile
 *  @route /api/users/profile
 *  @method GET 
 *  @access private  (only admin)
------------------------------------ */
// ال admin بس اللي يقدر ياخد كل ال users

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
        // *** كل ده يتكتب ف ال middleware ***
        // نعمل folder => middlewares > verifyToken.js
    // console.log(req.headers.authorization.split(" ")[1]);
    // كده هيبعت لي ال token اللي انا عامله
    // احنا محتاجين ال token in the server 
    // لازم نحول ال string to array =>> by method > split
    // split =>> هيخلي ال Bearer ف ال index 0 && token index 1
        /*
        [
            'Bearer',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzliN2Y0ODkwYjRjMmFhM2RlMTJkMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTEwOTc2NDN9.9N7lr113eX4XpuzNjRCj-s-mDbqibinRLMynOPvyE4M'
        ]   
        واحنا عايزين ال token => index [1]
        كده هيدينا ال token بس
        */


        // if(!req.user.isAdmin) {
        //     return res.status(403).json({message : "not allowed, only admin"})
        // } // مينفعش تبقا كده عشان هستخدمها كذا مرة هحطها فال middleware


        /*
        دلوقتي لو عملت send => ف /api/users/profile هيجيب لي ال message دي
        {
            "message": "not allowed, only admin"
        }
        */
        // هنروح بقا ف ال database اخلي اي حد admin 
        // دلوقتي لو عملت login with admin && روحت ع ال profile وعملت token => هيجيب لي كل ال users & admin 

    const users = await User.find().select("-password").populate("posts");
    // method => find هيجيب لي كل ال users اللي ف ال database

    // ندي الجواب لل مستخدم
    res.status(200).json(users) 
}) // لازم نعمل route to this controller in the file > usersRoute.js



// ***************************************
// Get single user & update user profile 






// Documentation 
/** ----------------------------------------
 *  @desc Get user profile
 *  @route /api/users/profile/:id   // لان الclient عايز يعمل get to user معين
 *  @method GET 
 *  @access public
------------------------------------------ */
module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password").populate("posts"); // هناخد ال id from params => اللي هيكتبو ف ال url
                            // .select يعني ميجبليش ال pass وهو بيجيب ال user 
    // لو ال user مش موجود 
    if(!user) {
        return res.status(400).json({message : "User NOT FOUND" })
    }
    // لو ال user موجود
    res.status(200).json(user);
}) // نروح نعمل route بقا

/*
هنا لو عملت ف ال postman =>>> id > مثلا 1 => send me error => الايرور ده بيجي من ال DB
عشان ل id => يعتبر objectId 
يعني لو كتبت id 1 || 100 => ده ميعتبرش id

express => بيبعت query to database => بيقوله اديني ال user اللي ال id بتاعه 1 
انا عايز اعمل middleware قبل ما يبعت express query to database يديني رد
*/



// عايزين نكتب route handler to Update user profile
// Documetation 
/**-----------------------------------
 *  @desc Update User Profile
 *  @route /api/users/profile/:id
 *  @method PUT
 *  @access private (only user himself)
------------------------------------- */


// نكتب ال  controller
module.exports.updateUserProfileCtrl = asyncHandler(async (req,res) => {
    // اول حاجة نعمل validation 
    // نعملها ف file =>> User in the folder modules 
    const {error} = validateUpdateUser(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }

    // تاني حاجة لازم نعمل تشفير to password
    if(req.body.password){
        const salt = await bctypt.genSalt(10);
        req.body.password = await bctypt.hash(req.body.password, salt)
    } // لو ال user عاوز يعمل تعديل ع الباص الشرط ده هيشتغل

    // لازم نعمل updata to user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }  //set ده يروح ع ال database يعمل تعديل ع كل اللي انا كاتبه ده
    }, 
    {new: true}
    ).select("-password")
    .populate("posts") // عشان يظهر ال posts in profile page 

    // ندي الرد  to user 
    res.status(200).json(updatedUser)
}) // دي خطوات updated user 

/*
new: true => رجع لي new object ما عدا ال password
*/


// *************************
// هنعمل route handler تانية => to count 
// عايز عدد ال users

/**--------------------------
 *  @desc Get users count
 *  @route /api/users/count
 *  @method GET
 *  @access private (only admin)
---------------------------*/
// عايزو يقولي عنده كام user in the database
module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
    const count = await User.count(); // ده method in the mongoose يشوف كام user عندنا
    res.status(200).json(count)
}) // عاشن هنستخدمها ف ال dashboard بتاع ال admin 


// ***************************************
// Upload Profile Photo 




// Documentation 
/**-------------------------------
 *  @desc Profile Photo Upload 
 *  @route /api/users/profile/profile-photo-upload
 *  @method POST
 *  @access private (only logged in user)
----------------------------------- */

// هنكتب ال controller
module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
    // console.log(req.file); // اي ملف ييجي من ال client => ع هيئة req.file 

    // 1.validation if user not send file
        if(!req.file){
            return res.status(400).json({message: 'No File Provided'})
        }

    // 2.Get the path the image
        // نحتاج path module from node.js
        // لازم ناخد اسم الصورة => req.file.filename
        const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
            // ده بياخد الصورة from image folder 

    // 3.Upload to cloudinary
        // تحتاج function = logic مش هنكتبها هنا
        // new folder = utils =>>> new file = cloudinary.js
        const result = await cloudinaryUploadImage(imagePath);
        // يعوز ال file to upload
        // console.log(result); // بتيجي من ال cloudinary لما يعمل upload to image
        // هيجيبلي لنا ال  properties in the terminal  
        // انا محتاج =>> public_id عشان لما نحذف الصورة
        // && secure_url => لو خدت ال url copy past in browser اقدر شوفها
        // هيضيف الصورة ف  folder ->> images

    // 4.Get the user from DB
        // هاخد ال user from db => i need id
        const user = await User.findById(req.user.id);

    // 5.Delete the old profile photo if exist
        // لو مش null => يعني ال user عنده صورة
        if(user.profilePhoto.publicId !== null) {
            await cloudinaryRemoveImage(user.profilePhoto.publicId)
        } // كده بقوله لو عنده صورة احذفها

/*
احنا عملنا new photo to profile => بتاع ال user 
لازم ال url بتاعته نغيرها to new url & public id
*/

    // 6.Change the profile photo field in the DB
        user.profilePhoto = {
            url: result.secure_url, // ال url الاصلي للصورة
            publicId: result.public_id // عشان نحذف الصورة
        }
        // عايزينو يعمل save to new changes
        await user.save();

    // 7.Send response to client
    // مجرد نبعت رسالة  to user & اديلو new profile photo 
    res.status(200).json({
        message: "Your Profile Photo Uploaded Successfully !",
        profilePhoto: {url: result.secure_url, publicId: result.public_id}
    })

    // 8.Remove image from the server => لازم نحذفها from images folder 
        // هنروح نجيب from node => fs = file system
        // نقدر نحذف من ال module ده
        fs.unlinkSync(imagePath)

})// نروح نعمل ال router بتاعنا

/*
###########cloudinary 
كده لما اروح ع ال postman => send req to this end point =>>{{DOMAIN}}/api/users/profile/profile-photo-upload
هيجيبلي ال message & profile photo اللي انا عاملهم
{
    "message": "Your Profile Photo Uploaded Successfully !",
    "profilePhoto": {
        "url": "https://res.cloudinary.com/dqgsptayf/image/upload/v1691470746/ryeda3egj9yax9fbhskp.jpg",
        "publicId": "ryeda3egj9yax9fbhskp"
    }
}
هنلاقي ضاف الصورة ف ال cloudinary serever ومسح الصورة من ال image folder 
لو روحنا ع ال database => هنلاقي ف ال user اللي عامله login عمل ال url بتاع الصورة 
وكمان ال public id => اللي ال cloudinary يحطه 
مهو كل صورة لها unique id =>> from cloudinary
*/

/*
عشان ابعت file => ف ال postman >> body>form-data >> key=image عشان ف ال route انا عامله image 
type of image = file
select files =>> اختار file from my PC
*/

/*
- جاب لي ال upload profile photo
        {
    fieldname: 'image',
    originalname: 'WhatsApp Image 2023-06-07 at 7.45.21 PM.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'D:\\Blog-App\\back-end\\images',
    filename: '2023-08-05T03-44-47.340ZWhatsApp Image 2023-06-07 at 7.45.21 PM.jpeg',
    path: 'D:\\Blog-App\\back-end\\images\\2023-08-05T03-44-47.340ZWhatsApp Image 2023-06-07 at 7.45.21 PM.jpeg',
    size: 780225
        }
*/
// هنلاقيه عمل upload to image in folder =>>> images


/*
طبعا مش حتجة عملية انو يخزن الصور داخل  folder in my server => مهو مشروع blog يعني ممكن
يكون ف صور كتير جدا و دهغلط انو يتخزن ف ال server بتاعنا
هنستخدم services مثل cloudinary => يعني بعد ما ال multer يخزن الصور ف ال images folder 
the cloudinary هيجي ياخد الصورة ويخزنها ف cloudinary server 
*/


// ***************************************
// delete user profile


// Documentation
/**------------------------------
 *  @desc Delete User Profile (account)
 *  @route /api/users/profile/:id
 *  @method DELETE
 *  @access private (only admin or user himself) // لازم نكتب middleware in this file =>> verifyToken.js
------------------------------- */

// controller 
module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
    // 1. get the user from db
    const user = await User.findById(req.params.id);
    // validation 
    if(!user) {
        return res.status(400).json({message: "user not found !!"})
    }

    // @TODO - 2. get all posts from db // دي بعدين   => complete 
    const posts = await Post.find({user: user._id})

    // @TODO - 3. get the public ids from the post     => complete
    const publicIds = posts?.map((post) => post.image.publicId)

    // @TODO - 4. delete all posts image from cloudinary that belong to this user => لازم اكتب function ل ده    => complete
    if(publicIds?.length > 0) {
        await cloudinaryRemoveMultipleImage(publicIds)
    }

    // 5. delete the profile picture from cloudinary
    if(user.profilePhoto.publicId !== null) {
        await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }
        // ده بيحذف ال photo بتاع ال user in the cloudinary 

    // @TODO - 6. delete user posts&comments => complete
        await Post.deleteMany({user: user._id})
        await Comment.deleteMany({user: user._id})

    // 7. delete the user himself
    await User.findByIdAndDelete(req.params.id);

    // 8. send a response to the client
    res.status(200).json({message: "your profile has been deleted"})
}) 
// هنروح ع ال route بقا =>> profile/:id

/*
كده تمام ال user has been deleted successfully
*/
// لما نعمل ال posts && comments هنرجع نعمل اللي فووق دول
