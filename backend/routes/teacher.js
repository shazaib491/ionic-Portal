const express = require('express');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const teacher = require('../database/model/teacher');
const institute = require('../database/model/institute');
const db = require('../database/db')
const { check, oneOf, validationResult, matchedData } = require('express-validator');


const router = express.Router();

// validation error function
router.get('/', (req, res, next) => {
  res.json({
    title: "Form Validation",
    success: false,
    errors: req.session.errors
  })
  req.session.errors = null;
})



// Global Decleration
var rand, mailOptions, host, link, confirmTeach, insId;
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "shazaibrehman127@gmail.com",
    pass: "ogccgorhiolnjssi"
  }
});
// Global Decleration


var ssn;
const message = "mismathing";
router.post('/singup', (req, res, next) => {
  if (req.body.password !== req.body.cpassword) {
    res.json('andhe password shi dal');
  }
  else {
    rand = Math.floor((Math.random() * 100) + 54);

    // host = req.get('host');
    // link = "http://" + req.get('host') + "/teacher/verify?id=" + rand;
    mailOptions = {
      to: req.body.email,
      subject: "Please confirm your Email account",
      html: `<h1>Enter OTP TO Verify Your Email </h1> </br></br>OTP is ${rand}`
    }
    smtpTransport.sendMail(mailOptions).then((response) => {
      // res.json({ response: 'Please Check your gmail' });
      confirmTeach = new teacher({
        uname: req.body.uname,
        email: req.body.email,
        password: req.body.password,
        m_no: req.body.m_no
      });
      res.status(201).json({
        otp: rand
      });
      insId = req.body.insId;
    }).catch((e) => {
      res.json(e)
    })
  }
})


router.post('/verify', async (req, res, next) => {
  if (req.body.otp == rand) {
    try {
      const data = await teacher.teacherInfo(confirmTeach);
      const inst = await institute.UpdateUserId(insId, data._id);
      res.status(201).json({
        success:true,
        teacher: data,
        institute: inst
      })
    } catch (e) {
      res.status(401).json({
        success:false
      })
    }
  }
  else {
    res.end("<h1>Bad Request</h1>");
  }
})


router.post('/singin', (req, res, next) => {
  teacher.teachAuth(req.body).then((response) => {
    if (response) {
      const token = jwt.sign({ response },
        db.secret, {
        expiresIn: 604800
      })
      res.json({
        success: true,
        token: token,
        user:response
      })
    } else {
      res.json({
        error: "chlo miya ustad ho bapp mat bano"
      })
    }

  }).catch((e) => {
    console.log(e);
  })
})

module.exports = router;
