const nodemailer = require('nodemailer')

exports.nodemailer = data=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS:true, 
        auth: {
          user: 'shivamup4545@gmail.com', 
          pass: 'Shivam@up12', 
        }
      });
      return(
          transporter.sendMail(data)
          .then(info=>
              console.log('mail send')
          ).catch((err)=>{`send ${err}`})
      )
}