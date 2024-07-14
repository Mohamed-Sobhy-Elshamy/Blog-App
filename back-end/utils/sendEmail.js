// هكتب sending email function in this file 
// ف ال back لو احتاجنا نبعت email => هنستدعي this fuction

const nodemailer = require('nodemailer')

/*
this function عاوزه 
    userEmail, subject, htmlTemplate
    لو احتاجنا ال function دي ف اي مكان لازم نديله التالت حاجات دولy
*/


module.exports = async (userEmail, subject, htmlTemplate) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                // user: "your gamil address", // sender 
                user: process.env.APP_EMAIL_ADDRESS, // sender 
                // pass: "app password" // get from google 
                pass: process.env.APP_EMAIL_PASSWORD, // get from google 
            }
        })

        /*
        لازم نحدد ال main options 
        يعني كل email بيبعته بيكون له subject العنوان
        html template 
        from = sender 
        to = لمين ترسل 
        */

        const mailOptions = {
            // from: "your gmail address", // sender 
            from: process.env.APP_EMAIL_ADDRESS, // sender
            to: userEmail,
            subject: subject,
            html: htmlTemplate,
        }

        // نقدر نبعت email 
        const info = await transporter.sendMail(mailOptions);
        console.log("Email Sent: " + info.response)

    } catch (error) {
        console.log(error);
        throw new Error("Internal server Error (nodemailer)")
    }
}
// كده نبعت email in node js 

/*
هنكتب your gmail address & app password =>> .env 
*/