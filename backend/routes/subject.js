const express = require('express');
const subject = require('../database/model/subject');
const router = express.Router();


router.post('/insertSubject', (req, res, next) => {
    let sub_nm = req.body.sub_nm;
    let subArr = [];
    for (x of JSON.parse(sub_nm)) {
        subArr.push(x)
    }
    const data = new subject({
        c_nm: req.body.c_nm,
        c_branch: req.body.c_branch,
        sub_nm:subArr
    });
    subject.insertSubject(data).then((subject) => {
        res.json(subject);
    }).catch((err) => {
        res.next(err)
    })
})

module.exports = router;