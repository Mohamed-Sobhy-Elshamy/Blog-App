// نحتاج ال mongoose 
const mongoose = require('mongoose')

// هنعمل ال middleware
module.exports = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({message : "Invalid ID"})
    }
    next()
}


/*
mongoose => بيعمل اتصال بال database with express
عايزين نعمل check لل id اللي بيجي من ال client => هذا ال id من نوع objectId ولا لاء
*/