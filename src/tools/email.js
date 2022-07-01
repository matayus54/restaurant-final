const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
          user: "alejandroalivier20@gmail.com",
          pass: "vbqyckvxjlloonpb"
        }
});

module.exports ={
    transporter
}