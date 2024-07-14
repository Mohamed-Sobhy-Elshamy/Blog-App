// هنعمل import to some modules
const fs = require('fs')
const path = require('path')
const asyncHandler = require('express-async-handler')
// Posts from models
const {Post, validateCreatePost, validateUpdatePost} = require('../modules/Posts')
// cloudinary upload image
const {cloudinaryUploadImage, cloudinaryRemoveImage} = require('../utils/cloudinary') // بيعمل upload to image
const {Comment} = require("../modules/Comment")



// documentation // create new post
/**--------------------------
 *  @desc Create New Post
 *  @route /api/posts
 *  @method POST
 *  @access private (only logged in user)
------------------------------- */

// controller تاعنا
module.exports.createPostCtrl = asyncHandler(async (req, res) => {
    // 1. validation for image
        if(!req.file) {
            return res.status(400).json({message: "No Image Provided"})
        }

    // 2. validation for data
        const {error} = validateCreatePost(req.body);
            if(error) {
                return res.status(400).json({message: error.details[0].message})
            }

    // 3. upload photo 
        // ناخد الصورة from folder images & نديها الى cloudinary
        // نحتاج image path
        const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
        // upload to cloudinary
        const result = await cloudinaryUploadImage(imagePath);
        // cloudinary هيدينا ال result

    // 4. create new post and save it to DB
        // ف طريقتين
        // the first way
        // const post = new Post({
        //     title: req.body.title,
        // })
        // await post.save();

        // the second way / مش هيعمل save 
        const post = await Post.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
                // عايزين نعرف مين ال user اللي عامل ال post ده
            user: req.user.id,
            image: {
                url: result.secure_url, // بناخد ال image from cloudinary
                publicId: result.public_id
            }
        }) // كده عملنا new post in database 

    // 5. send response to the client 
        res.status(201).json(post);

    // 6. remove image from the server 
        fs.unlinkSync(imagePath)
}) // نعمل route to this post 




// *************************************
// Get Posts


// Documentation // get all posts 
/**----------------------------------------
 *  @desc Get All Posts
 *  @route /api/posts
 *  @method GET
 *  @access public
------------------------------------------- */

// controller  
module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => { // pagination => ترقيم الصفحات
    // لكل page ارسل 3 posts
    const POST_PER_PAGE = 3;
    // هنا انا عايز اعمل  pagination  & ادي post to user حسب ال category 
    // لازم ال user يرسل لل category as a Query
    const {pageNumber, category} = req.query; // Query => pageNumber & category
    let posts;
    // لو عندي query باسم page number 
    if(pageNumber) {
        // find => هيجيب لي كل ال posts 
        // لكن انا عاوز ادي لل user the post ع حسب page number 
        /*
        ## شرح ال if 
        skip => page number اللي بياخدها من ال query 
        ع حسب ال page number => يرسل البيانات 
        لكل صفحة يرسل  3 post 
        اذا كانت ال page number 1 => يرسل ال post 1,2,3
        */
        posts = await Post.find()
            .skip((pageNumber - 1) * POST_PER_PAGE)
            .limit(POST_PER_PAGE)
            .sort({createdAt: -1})
            .populate("user", ["-password"])
    } else if (category) {
        posts = await Post.find({category: category}).sort({createdAt: -1}).populate("user", ["-password"])
    } else {
        posts = await Post.find().sort({createdAt: -1})
            .populate("user", ["-password"])
    }
    res.status(200).json(posts)
}) // نعمل ال route

/*
لما نعمل req => {{DOMAIN}}/api/posts =>>> هيجيب لنا كل ال posts
*/

/*
sort => يرتب ال posts اجدد واحد هو اللي يظهر ف الاول
*/


// Documentation // get single post
/**----------------------------------------
 *  @desc Get single post
 *  @route /api/posts/:id
 *  @method GET
 *  @access public
------------------------------------------- */
module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate("user", ["-password"]).populate("comments");
    if(!post) {
        return res.status(404).json({message: "Post NOT FOUND!"})
    }
    res.status(200).json(post)
}) // نعمل ال route 


// Documentation // get count of posts 
/**----------------------------------------
 *  @desc Get Posts Count
 *  @route /api/posts/count
 *  @method GET
 *  @access public
------------------------------------------- */
module.exports.getPostsCountCtrl = asyncHandler(async (req, res) => {
    const Count = await Post.count();
    res.status(200).json(Count)
}) // نعمل ال route



// ******************************
// Delete Post 


// Documentation    // delete post 

/**-------------------------------
 *  @desc Delete Post
 *  @route /api/posts/:id
 *  @method DELETE
 *  @access private (only admin or owner of the post)
----------------------------------- */

// controller 
module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
    // ناخد ال post from db 
    const post = await Post.findById(req.params.id);

    // لو ال post not exist 
    if(!post) {
        return res.status(404).json({message: "post NOT FOUND"})
    }

    // حنا قولنا لازم يكون ال admin or owner the post =>>> middlewares

    // اللي عامل log in هو اللي يقدر يوصل ل هنا
    if(req.user.isAdmin || req.user.id === post.user.toString()) {
        // delete the post
        await Post.findByIdAndDelete(req.params.id);
        // delete image in cloudinary
        await cloudinaryRemoveImage(post.image.publicId);

    // Delete all comments that belong to this post 
        // نجيب comment model
        await Comment.deleteMany({ postId: post._id })
        // هيروح to database يشوف كل comment اللي ال postId بتاعه يساوي id بتاع ال post ده هيمسحها


        // send response to client
        res.status(200).json(
            {message: "Post has been deleted successfully", postId: post._id}
        )
    } else { // يعني ولا  admin || post بتاعه
        res.status(403).json({message: "access denied, forbidden"})
    }
})




// *************************
// Update Post & Update Post Image 


// Documentation // update post 
/**----------------------------
 *  @desc update post 
 *  @route /api/posts/:id
 *  @method PUT 
 *  @access private (only owner of the post)
------------------------------- */

// controller 
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
    // 1. validation => معمولة ف file => Post => in folder modules
    const {error} = validateUpdatePost(req.body);
    if(error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    // 2. ناخد ال post from db => نشوف ال post موجود ولا لاء
    const post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json({message: "post NOT FOUND"})
    }

    // 3. check if this post belong to logged in user
    // لو البوست مش للمستخدم ده
    if(req.user.id !== post.user.toString()) {
        return res.status(403).json({message: "access denied, you are not allowed!"})
    }

    // 4. update post 
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        }
    }, {new: true}).populate("user", ["-password"])

    // 5. send response to the client
    res.status(200).json(updatedPost)
})


// update post image 
// Documentation
/**-----------------------
 *  @desc update post image 
 *  @route /api/posts/update-image/:id
 *  @method PUT
 *  @access private (only owner of the post)
-------------------------- */
module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
    // 1. validation to image
    if(!req.file) {
        return res.status(400).json({message: "no image provided!!"})
    }

    // 2. get the post from db and check if post exist 
    const post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json({message: "post NOT FOUND"})
    }

    // 3. check if this post belong to logged in user 
    if(req.user.id !== post.user.toString()) {
        return res.status(403).json({message: "access denied, you are not allowed"})
    }

    // 4. delete the old iamge 
    // نمسح الصورة القديمة ونحط الجديدة
    await cloudinaryRemoveImage(post.image.publicId)

    // 5. upload new image => i need the path
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    // نقدر نعمل upload
    const result = await cloudinaryUploadImage(imagePath)

    // 6. نعمل update to data field in database 
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        }
    })

    // 7. send response t client
    res.status(200).json(updatedPost)

    // 8. remove image from the server 
    fs.unlinkSync(imagePath)
}) // نعمل route to this controller 




// **************************
// Toggle Like => ال user يعمل like ع post معين


// Documentation 
/**-----------------------
 *  @desc toggle like 
 *  @route /api/posts/like/:id
 *  @method PUT
 *  @access private (only logged in user)
-------------------------- */

// controller 
module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
    const loggedInUser = req.user.id;
    const {id: postId} = req.params;
    // ناخد ال post from db
        let post = await Post.findById(postId);
        // نعمل check
        if(!post) {
            return res.status(404).json({message : "Post NOT FOUND :("})
        }

        // عايزين نضيف ال user ID to =>> likes array
        // كل post have likes array in database 
        // likes Array (empty) => ف ال  Database 

        /*
        يعني مثلا لو ال user عمل like ع post =>> cars لازم ينضاف to likes array 
        ولو طبعا عامل ممكن يشيلها عشان كده اسمها toggle
        نعمل check => هل ال user موجود ف likes array
        */
            // user لان كل value من likes تعتبر user
            const isPostAlreadyLiked = post.likes.find(
                (user) => user.toString() === loggedInUser);

            // نعمل check the user عامل like || not
                if(isPostAlreadyLiked) {
                    post = await Post.findByIdAndUpdate(postId, {
                        // pull in mongoose =>> يقدر يشيل value from array
                        $pull: {likes: loggedInUser}
                    }, {new: true})
                } else { // مش عامل like & عايز يعمل
                    post = await Post.findByIdAndUpdate(postId, {
                        $push: {likes: loggedInUser} // push بيضيف to array 
                    }, {new: true})
                }

            // send response to client 
                res.status(200).json(post)
}) // نعمل ال route