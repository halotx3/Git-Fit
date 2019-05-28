const express = require('express');
//Packages for email verifcation
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");

const router = express.Router();
//Importing the emailVer model which has the specific ORM code
const emailVer = require('../models/emailVer.js');

//Creates the transporter for email verification
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });

  const EMAIL_SECRET = randomstring.generate();

  router.post('/create', function(req, res){
    console.log(req.body.email);
    console.log(req.body.password);
    emailVer.createUser([req.body.email, req.body.password], function(result){
            //Sending some data back to validate
            res.json({ id: result.insertId });
            //Logic sending the email after the account is created
            const emailToken = jwt.sign(
              {
                id: result.insertId
              },
              EMAIL_SECRET,
              {
                expiresIn:'2h'
              },
            );

            const verURL = `http://localhost:3000/confirm/${emailToken}`;

             transporter.sendMail({
              to: req.body.email,
              subject: 'Please Verify Your email to Complete Your Git Fit Registration',
              html: `Hello,<br>
              Please use the following link to complete your registration and activate your account:<a href="${verURL}">${verURL}</a>`,
            },(error, result) => {
              if (error) return console.error(error);
              return console.log(result);
            });
             
            res.status(201).end;
        })
  });

  router.get('/confirm/:token',function(req, res){
    let id = jwt.verify(req.params.token, EMAIL_SECRET);
    console.log(id)
    console.log(id.id)
    emailVer.eVerUpdate(id.id, function(result){
      console.log('Account has been updated');
      res.redirect(`/profile/${id.id}`);
    });
  })
  module.exports = router;