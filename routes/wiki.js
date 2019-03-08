const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { User } = require('../models');
const addPage = require('../views/addPage.js');
const wikipage = require('../views/wikipage.js');
const main = require('../views/main.js');

router.get('/', async (req, res, next) => {
  try {
    const allPosts = await Page.findAll();
    res.send(main(allPosts));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {

  try {
    let [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    console.log(`USER: ${user}`)

    const page = Page.create(req.body);
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  }
  catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(wikipage(page, author));
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
