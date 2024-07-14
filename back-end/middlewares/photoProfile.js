// هنحتاج two modules there 
const path = require('path') ; // from node.js عادي
const multer = require('multer'); // بيعمل upload to photos 
// هعمل folder => name this folder images => store photo inside this folder


// Photo Storage 
const photoStorage = multer.diskStorage({
    // احدد ال destination && file name
    // destination لازم تديه function as a value => فيها three parameters >> req, file, cb
    //cb تاخد two parameters هل عندك error message & حددلي ال destination يعني فين تخزن الصور
    // path.join =>> dirname بيجيب المسار الكامل بتاع المشروع بتاعي
    // && اعمل combaine with images folder 
    // لازم نحدد ال file name => بتاخد function as a value 
    //function => req, file, cb 
    // cb بتكتب جواها شرط 
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../images'))
    },
    filename: function(req, file, cb) {
        // لو ال file is exist => اعمل كذا 
        if(file) {
            cb(null, new Date().toISOString().replace(/:/g,"-") + file.originalname) // null لا يوجد error message && second parameter => name of the photo بتيجي من ال client 
            // لازم تكون unique name 
            // new date from js يعمل  new date 
            // يحولها toISOString => replace "-" مكان ده /:/
            // originalname تيجي مع ال client with the file   
            // note:: windows مش بيعمل : ف الصور   
        } else { // يعني مش مدينا file 
            cb(null, false)
        }
    }
})


// photo upload middleware 
const photoUpload = multer({
    // لازم نحدد ال storage 
    storage: photoStorage,
    // نعمل filter to files 
    // لان ال multer يحمل upload لل files 
    // احنا عايزين ال user يعمل upload to only photo
    fileFilter: function(req, file , cb) {
        // the file بييجي من client && mimetype => نوع ال file 
        // true => يعني اعمل upload 
        // false => يعني متحملش الصورة
        if(file.mimetype.startsWith("image")) { // لو عاوز ال user يحمل صورة png بس هعمل => image/png
            cb(null, true)
        } else {
            cb({message: "Unsupported this file format !"}, false)
        }
    },
    limits: {fileSize: 1024 * 1024} // يعني 1 megabyte 
    // كده ال user مش هيدينا صورة اكبر من 1 megabyte 
    // لو عاوز ازود حجمها 1024*1024*2 => كده يقت 2 ميجا بايت
})

// export this middleware
module.exports = photoUpload; // نجتاجها فال route 