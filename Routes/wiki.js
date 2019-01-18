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

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = Page.build({
    title: req.body.title,
    content: req.body.content,
    // slug: slug(req.body.title),
    // status: req.body.status
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    console.log(page);
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});



module.exports = router;
