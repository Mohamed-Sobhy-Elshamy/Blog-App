// نستدعي ال express
const express = require('express')
// نجيب file ال database 
const connectToDb = require('./config/connectToDb')
require("dotenv").config(); // عشان يقرا ال constants from .env 
// بيسمح لل application انه يقرا المتغيرات من ال .env file

// For API Security 
const xss = require("xss-clean")
const rateLimiting = require("express-rate-limit")
const helmet = require("helmet")
const hpp = require("hpp")

// ده لما اجي اربط ال front with a back
const cors = require("cors");
// عشان ال front بتاعنا يشتغل ع domain خارجي 



// connection to DB
connectToDb(); //ال function دي تعمل اتصال بال database اللي موجودة ف ال folder => config

// Initial App 
const app = express(); // كده عملنا run to express

// Middlewares
app.use(express.json());
// ال middleware من ال express يخلي ال express يعرف ال json file اللي بتيجي من ال client 


// ### API Security ###
// Security headers (helmet)
app.use(helmet());

// Prevent HTTP param pollution
app.use(hpp())

// Prevent XSS (Cross Site Scripting) Attacks
app.use(xss())

//  Rate limiting 
app.use(rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 Minutes
    max: 230, 
})) // كل 10 Minutes يعمل 200 request 


// cors policy
app.use(cors({
    origin: "http://localhost:3000"
}))
// يعني ادي serviceفقط لل domain ده


// Routes
const route = require('./router/authRouter');
app.use('/api/auth', route);
// كده لو روحنا ع ال postman => ونبعت  req to =>> /api/auth/register
// هيعمل run =>> registerUserCtrl
app.use('/api/users', require('./router/usersRoute'))
app.use('/api/posts', require('./router/postsRouter'))
app.use('/api/comments', require('./router/commentsRoute'))
app.use('/api/categories', require('./router/categoriesRouter'))
app.use('/api/password', require("./router/passwordRoute"))



const { errorHandler, notFound } = require('./middlewares/error');
// error route handler => لازم بعد ال routes 
app.use(notFound);
app.use(errorHandler);

// Running The Server 
const PORT = process.env.PORT || 8000 
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT} `)
})
// NODE.ENV =>> باخد بيئة التطوير من ال NODE.ENV =>> البيئة بتاعتنا development 