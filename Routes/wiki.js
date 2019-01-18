const express = require('express');
const router = express.Router();
const { Page } = require('./../models');
const models = require('./../models');
const addPage = require('./../views/addPage');

router.get('/', async (req, res, next) => {
  // console.log(models.db);
  // const allWikis = await models.db.Page.findAll();
  // res.send(allWikis);
  res.send('got to GET')
})

router.post('/', (req, res, next) => {
  res.send('got to POST')
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = router;
