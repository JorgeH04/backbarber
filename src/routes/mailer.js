
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');



router.post('/email', async (req, res) => {
    const { name, email, asunto, mensaje } = req.body;
  
    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Nombres: ${name}</li>
            <li>Email: ${email}</li>
           
        </ul>
        <ul>
            <li>Asunto: ${asunto}</li>
           
        </ul>
        <p>${mensaje}</p>
    `;
  
    
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
     user: 'grossicervezas@gmail.com',
     pass: '001Grossi'
     
   }
   });
   
   
   let mailOptions = {
    from: 'grossicervezas@gmail.com',
    to: 'grossicervezas@gmail.com',
    subject: 'email website',
    html: contentHTML
   
   };
  
   
  
   
   transporter.sendMail(mailOptions, function(error, info){
    if (error) {
     console.log(error);
    }else{
     console.log('Email sent: ' + info.response);
    }
   });
   res.redirect('/contacto');
  });

  module.exports = router;

