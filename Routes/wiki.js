const express = require('express');
const router = express.Router();
const { Page } = require('./../models');
const models = require('./../models');
const addPage = require('./../views/addPage');

router.get('/', (req, res, next) => {
  // console.log(models.db);
  // const allWikis = await models.db.Page.findAll();
  // res.send(allWikis);
  res.send('got to /wiki');
});

router.post('/', (req, res, next) => {
  res.json(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
