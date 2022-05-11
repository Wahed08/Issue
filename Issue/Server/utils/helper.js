const nodemailer = require("nodemailer");

exports.generateOTP = () =>{
    let otp = '';
    for(let i=0; i<4; i++){
        const randVal = Math.round(Math.random() * 4);
        otp += randVal;
    }
    return otp;
}

exports.mailTransPort = () => {
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth:{
            user: process.env.Auth_Email,
            pass: process.env.Auth_pass
        }
    });
    return transport;
}