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
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const EMAIL_SECRET = randomstring.generate();

  router.post('/create', function(req, res){
        emailVer.createUser([req.body.email, req.body.pass], function(result){
            //Sending some data back to validate
            res.json({ id: result.insertId });
            //Logic sending the email after the account is created

        })
  })

