// function ال upoload to cloudinary

// نحتاج ال cloudinary
const cloudinary = require('cloudinary')

// اول حاجة لازم نعمل config => يعني نديله 
// cloud name, api key & api secret => to cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
/*
1. cloud name => يعني اخده منين => from .env 
2. api key => from .env
3. api secret => from .env
*/


// upload function
    // cloudinary upload function 

    const cloudinaryUploadImage = async (fileToUpload) => {
        // نكتبها في try, catch => ممكن تحدث أخطاء
        try {
            const data = await cloudinary.uploader.upload(fileToUpload, {
                resource_type: 'auto'
            });
            return data; 
            // upload => يجب أن يأخذ ملف الرفع الذي تمرره من المعامل (parameter)
            // الباراميتر الثاني => ككائن (object)
            // نرجع هذه البيانات (data)
        } catch (error) {
            // return error;
            console.log(error)
            throw new Error("Internal Server ERROR (Cloudinary) :(")
        }
    } // this function ->> make upload to image 



// remove image 
    // cloudinary remove image

const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
        // destory method => تعمل remove to images 
    } catch (error) {
        // return error;
        console.log(error)
        throw new Error("Internal Server ERROR (Cloudinary) :(")
    }
}


// cloudinary remove mutliple image
const cloudinaryRemoveMultipleImage = async (publicIds) => { // ده نديه array 
    try {
        const result = await cloudinary.v2.api.delete_resources(publicIds); // this code from cloudinary api
        return result;
    } catch (error) {
        // return error;
        console.log(error)
        throw new Error("Internal Server ERROR (Cloudinary) :(")
    }
}




// exports to functions 
module.exports = {
    cloudinaryUploadImage, 
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImage
}  // نحتاجهم ف usersController