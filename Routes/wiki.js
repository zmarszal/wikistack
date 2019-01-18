const express = require('express');
const router = express.Router();
const { Page } = require('./../models');
const { User } = require('./../models');
const addPage = require('./../views/addPage');
const wikiPage = require('./../views/wikipage');
const homePage = require('./../views/main');

router.get('/', async (req, res, next) => {
  const allWikis = await Page.findAll();
  res.send(homePage(allWikis));
});

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const user = User.build({
    name: req.body.name,
    email: req.body.email
  })

  const page = Page.build({
    title: req.body.title,
    content: req.body.content,
    // slug: slug(req.body.title),
    // status: req.body.status
    authorId: user.id
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    const newPage = await page.save();

    res.redirect(`/wiki/${newPage.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  //res.send(`hit dynamic route at ${req.params.slug}`);
  const page = await Page.findOne({
    where: {
      slug: req.params.slug
    }
  });
  res.send(wikiPage(page));
});

module.exports = router;
