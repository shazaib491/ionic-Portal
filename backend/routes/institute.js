const express = require('express');
const router = express.Router();
const institute = require('../database/model/institute');


router.post('/detail', (req, res, next) => {
  const ins = new institute(req.body);
  institute.insertInstitute(ins).then((data) => {
    res.json(data)
  }).catch((e) => {
    res.json(e)
  })
})

module.exports = router;
