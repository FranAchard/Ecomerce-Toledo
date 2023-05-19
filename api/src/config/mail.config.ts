const nodemailer = require ('nodemailer')
import dotenv from "dotenv"

dotenv.config()

const EMAIL = process.env.EMAIL
const EMAIL_PSSWRD = process.env.EMAIL_PSSWRD
const SERVER = process.env.SERVER


const mail ={
  user: EMAIL,
  pass: EMAIL_PSSWRD
}

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  tls: {
      rejectUnauthorized: false
  },
  secure: true, // true for 465, false for other ports
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.pass, // generated ethereal password
  },
});


export const sendEmail = async (email: any, subject: any,html: any)=>{
  try{
      await   transporter.sendMail({
          from:`${mail.user}`,
          to:email,
          subject,
          text:"Welcome to I Brought Pop Corn",
          html,
      })
  }catch(error){
      console.log("Something went wrong with your email",error)
  }

}

export const templateSignUp = (name: any,token: any)=>{
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
          <h2>Hola ${ name }</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="${SERVER}api/user/confirm/${token}"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `};

    export const templatePasswordChange = (email: any,token: any)=>{
      return `
          <head>
              <link rel="stylesheet" href="./style.css">
          </head>
          
          <div id="email___content">
              <img src="https://www.flickr.com/photos/197399024@N05/52623616952/in/dateposted-public/" alt="">
              <h2>Hola ${ email }</h2>
              <p>Haz click en el enlace para confirmar el cambio de tu contraseña</p>
              <a
                  href="${SERVER}api/user/newPassword/${token}"
                  target="_blank"
              >Autorizar cambio de contraseña</a>
          </div>
        `};
    



    module.exports= {
      sendEmail,
      templateSignUp,
      templatePasswordChange
    }