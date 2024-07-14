const asyncHandler = require("express-async-handler")
const {Category, validateCreateCategory} = require("../modules/Category")

// Documentation
/**-------------------------
 *  @desc Create New Category
 *  @route /api/categories
 *  @method POST
 *  @access private (only admin)
----------------------------- */
// Controller
module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
    // valdiation
    const {error} = validateCreateCategory(req.body)
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }

    // create category
    const category = await Category.create({
        title: req.body.title,
        user: req.user.id
    })

    // send response to client 
    res.status(200).json(category)
}) // new route



// Documetation 
/**-------------------------
 *  @desc Get All Categories
 *  @route /api/categories
 *  @method GET
 *  @access public
----------------------------- */
// Controller
module.exports.GetAllCategoriesCtrl = asyncHandler(async (req, res) => {
    // get all categories
    const categories = await Category.find();

    // send response to client
    res.status(200).json(categories)
}) // new route


// Documetation 
/**-------------------------
 *  @desc Delete Categories
 *  @route /api/categories/:id
 *  @method DELETE
 *  @access private (only admin)
----------------------------- */
// Controller
module.exports.deleteCategoriesCtrl = asyncHandler(async (req, res) => {
    // get category by id from database 
    const category = await Category.findByIdAndDelete(req.params.id);

    // validation if category not exist 
    if(!category) {
        return res.status(404).json({message: "Category NOT FOUND"})
    }

    // delete a category
    await Category.findByIdAndUpdate(req.params.id);

    // send response to the client 
    res.status(200).json({
        message: "Category Has Been DELEDED successfully :)",
        categoryId: category._id
    })
}) // new route