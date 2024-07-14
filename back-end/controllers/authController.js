// هنا هنكتب ال register controller && login controller

// the first =>> Register controller
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs') // اللي بيعمل hash to password
// نحتاج ال User اللي ف folder =>> modules
const {User, validateRegisterUser, validatedLoginUser} = require('../modules/User'); // عشان نعمله  register
const VerificationToken = require('../modules/VerificationToken');

const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail")


// اول حاجة نعمل ال documentation 
/** -------------------------------
 *  @desc register new user انشاء حساب جديد => sing up
 *  @route /api/auth/register 
 *  @method POST 
 *  @access public 
------------------------------------ */
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
    // validation  لازم نشوف البيانات اللي بيديها ال user => يعني منقبلش اي حاجة ال user بيبعتها
    // افضل نكتب ال validation function بتاعتي ف ال module => User  
    // عشان هتكون  validation to new user
        const {error} = validateRegisterUser(req.body); // البيانات هناخدها من ال req.body
            if(error) {
                return res.status(400).json({message: error.details[0].message})
            }


    // is user already exists هل ال user موجود
    // لازم نعمل check in database نشوف ال user موجود ولا لاء
    let user = await User.findOne({email: req.body.email }) // ع حسب ال email هيجيب لي ال user
    // لو ال user موجود بقا
    if(user) {
        return res.status(400).json({message: "user already exists !!"})
    }


    // لو ال user مش موجود يقدر يعمل register => تشفير to pass => hash the password
        const salt = await bcrypt.genSalt(10); 
        // تشفير الباص
        const hashedPassword = await bcrypt.hash(req.body.password, salt)


    // new user and save it to db
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })
    // save to user
    await user.save();

    //  @TODO - sending email (verify account)
        // 1- Creating new verification token & save it to DB => يعني نعمل new object from model (VerificationToken)
        const verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")  // لازم تكون كتابة عشوائية import crypto
        })
        await verificationToken.save(); 

        // 2- Making the link   // لازم يكون له مسار in front end
        const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`; // Domain بتاعي
        // this link هنبعتها to email بتاع ال user => user يدوس ع ال link ده open => verifyEmail.jsx page
        // لازم نخلي ال link in html Template 

        // 3- Putting the link into an html template
        const htmlTemplate = `
        <div>
            <h3> Click on the link below to verify your email </h3>
            <a href="${link}">Verify</a>
        </div> `;

        // 4- Sending email to the user
        // import from utils => sendEmail
        await sendEmail(user.email,"Verify Your Email",htmlTemplate)

    // send response to client 
    // نبعت رد to user
    res.status(201).json({message: "We sent to you an email, please verify your email address"})
})



// يعني ال  controller بتاعتي هتكون اسمها كده 
// register يعني هنعمل new object in the database 

// ************************************************
// Login User 
/** ---------------------------------------------
 *  @desc login user
 *  @route /api/auth/login
 *  @method POST
 *  @access public
--------------------------------------------------*/

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
    // 1. validation => لان ف ال loginبتيجي بيانات من ال client =>> هنعملها ف ال user module
    const {error} = validatedLoginUser(req.body)
    if(error) {
        return res.status(401).json({message: error.details[0].message})
    }


    // 2. is user exist
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        res.status(401).json({message: "Invalid email or password !!"})
    }


    // 3. check the password 
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordMatch){
        res.status(401).json({message: "Invalid email or password !!"})
    }
    // بيقارن الباص اللي بيجي من ال client & اللي موجود ف ال database
    // لو الباص اللي ال client مش هو اللي ف ال database => هيجيب لي => Invalid ...

    // @TODO - sending email (verify account if not verified)
    if(!user.isAccountVerified) { // لازم نعمل controller يعملها true 
            let verificationToken = await VerificationToken.findOne({
                userId: user._id,
            })

        if(!verificationToken) {
            verificationToken = new VerificationToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            });
            await verificationToken.save()
        }

        const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`; // Domain بتاعي

        const htmlTemplate = `
        <div>
            <p> Click on the link below to verify your email </p>
            <a href="${link}">Verify</a>
        </div>
        `;

        await sendEmail(user.email, "Verify Your Email", htmlTemplate)

        return res
        .status(400)
        .json({message: "We sent to you an email, please verify your email address"})
    }
/*
لو ال user مش عامل verification to your email 
مش هنخليه يعمل login 
يعني مش هنديله token & user 
*/

    // 4. generate token (jwt)
    // const token = null; 
    const token = user.generateAuthToken(); // بيعمل new token
    // ال generate هخليها ف ال user
    // هنروح ع ال authRouter => نعمل route 

    // 5. response to client 
    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
        username: user.username
    }) // هنحتاج الى مكتبة  jsonwebtoken 
})


/*
لما ال user يدوس ع link => لازم نغير isAccountVerified =>>> to true 
لما يكون true هنخلي ال user يعمل login 
لازم نكتب controller يغير ال isAccountVerified =>> to true 
*/


/** ---------------------------------------------
 *  @desc Verify user account
 *  @route /api/auth/:userId/verify/:token
 *  @method GET
 *  @access public
--------------------------------------------------*/
// لازم نعمل check to userId & token 
// user id موجود ولا لاء وكمان ال token 
module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if(!user) {
        return res.status(400).json({message: "Invalid link"})
    }

    // check token
    const verificationToken = await VerificationToken.findOne({
        userId: user._id,
        token: req.params.token,
    })
    if(!verificationToken) {
        return res.status(400).json({message: "Invalid Link"})
    }
    user.isAccountVerified = true;
    await user.save();

    // وكمان نمسحها from DB
    // await verificationToken.remove();
    // await verificationToken.remove();

        // const tokenToRemove = 1;
        //     VerificationToken.remove({ token: tokenToRemove }, (err) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log("done");
        //     }
        // });



    // send res to user 
    res.status(200).json({message: "Your account verified"})
}) // نعمل route to this controller 



