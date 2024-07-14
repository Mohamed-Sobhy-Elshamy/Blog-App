const router = require("express").Router();
const { createCategoryCtrl, GetAllCategoriesCtrl, deleteCategoriesCtrl } = require("../controllers/categoriesController");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")
const validateObjectId = require("../middlewares/validateObjectId")

//      /api/categories 
router.route('/')
    .post(verifyTokenAndAdmin, createCategoryCtrl)
    .get(GetAllCategoriesCtrl)

//      /api/categories/:id
router.route('/:id')
    .delete(validateObjectId, verifyTokenAndAdmin, deleteCategoriesCtrl)

// export 
module.exports = router;