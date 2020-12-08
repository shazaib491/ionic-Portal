const express = require('express');
const course = require('../database/model/course');
const router = express.Router();

router.post('/addCourse', (req, res, next) => {
    let c_nm = req.body.c_nm;
    let duration = req.body.duration;
    let year = req.body.year;
    let sem = req.body.sem;
    let branch = req.body.branch;
    let b_arr = [];
    if (year) {
        year *= duration;
    }
    else if (sem) {
        sem *= duration;
    }
    for (x of JSON.parse(branch)) {
        arr.push(x)
    }
    const data = new course({
        c_nm: c_nm,
        duration: duration,
        year: year,
        sem: sem,
        branch: b_arr
    })
    course.insertCourse(data).then((response) => {
        res.json(response)
    }).catch(err => console.log(err))
})




module.exports = router;