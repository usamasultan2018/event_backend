const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async({to,subject,text})=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from:process.env.EMAIL_USER,
        to,
        subject,
        text
    };
    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;