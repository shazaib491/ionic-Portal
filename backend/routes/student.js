const express = require('express');
var nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const student = require('../database/model/student');
const institute = require('../database/model/institute');
const db = require('../database/db')
const router = express.Router();
const readXlsxFile = require('read-excel-file/node');
const excelToJson = require('convert-excel-to-json');


var multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/files');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

var fs = require('fs');
var type = upload.single('data');


// Global Decleration
var rand, mailOptions, host, link, confirmstudent, globalId;
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "shazaibrehman127@gmail.com",
        pass: "ogccgorhiolnjssi"
    }
});
// Global Decleration
// var target_path = './assets/files/' + req.file.originalname;
// #####################
// const detail = [];
// let arr = [];
// let data;
// readXlsxFile(target_path).then((rows) => {
//     for (i in rows) {
//         for (j in rows[i]) {
//             detail.push({ e_roll: rows[i][j], pass: rows[i][j] });
//         }
//     }
//     detail.slice(1).forEach((value) => {
//         data = new student(value)
//         res.writeHead(200, {"Content-Type": "application/json"});   





router.post('/enroll', (req, res, next) => {
    const data = new student({
        e_roll: req.body.e_roll,
        pass: req.body.e_roll,
        teacherId: req.body.teacherId
    })
    student.enroll(data).then((response) => {
        res.json({
            response
        })
    }).catch((error) => {
        res.json({
            success: false,
            'err': 'eroll Already Exist'
        })
    })
})


router.put('/singup', (req, res, next) => {
    if (!req.body.e_roll) {
        res.json('Please Enter Enrollment no');
        return false;
    }
    else {
        globalId = req.body.e_roll;
        rand = Math.floor((Math.random() * 100) + 54);
        mailOptions = {
            to: req.body.email,
            subject: "Please confirm your Email account",
            html: `<h1>Enter OTP TO Verify Your Email </h1> </br></br>OTP is ${rand}`
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions).then((response) => {
            res.json({ response: 'Please Check your gmail' });
            confirmstudent = {
                ins_nm: req.body.ins_nm,
                ins_type: req.body.ins_type,
                s_name: req.body.s_name,
                email: req.body.email,
                m_no: req.body.m_no
            };

        }).catch((e) => {
            res.json(e)
        })
    }
})




router.get('/verify', async (req, res, next) => {
    if (req.body.otp == rand) {
        student.postStudent(globalId, confirmstudent).then((response) => {
            res.json({
                student: response
            })
        }).catch((e) => {
            res.json(e)
        })
    }
    else {
        res.end("<h1>Bad Request</h1>");
    }

})


router.post('/singin', (req, res, next) => {
    console.log(req.body);
    student.studentAuth(req.body).then((response) => {
        if (response) {
            const token = jwt.sign({ response }, db.secret, { expiresIn: 604800 })
            res.json({
                success: true,
                token: token
            })
        }
        else {
            res.json({
                error: "Wrong information"
            })
        }

    }).catch((e) => {
        console.log(e);
    })
})

module.exports = router;
