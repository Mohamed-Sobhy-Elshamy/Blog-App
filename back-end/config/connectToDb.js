// نحتاج ال mongoose
const mongoose = require('mongoose')


// ال function اللي هتعمل connection with database 
module.exports = async  () => {
    try {
        // الاتصال بقا بال database
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connected To MongoDB :)');
    } catch (error) {
        console.log("Connection Failed With Database !", error)
    }
}
