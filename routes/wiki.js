const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const addPage = require('../views/addPage.js');
const wikipage = require('../views/wikipage.js')
// const { generateSlug } = require('../models')

function generateSlug (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.get('/', (req, res, next) => {
  res.send('hello!');
});

router.post('/', async (req, res, next) => {
  let contentObj = req.body;
  title = contentObj.title;
  content = contentObj.content;

  const page = Page.create({
    title: title,
    content: content,

  });

  const URI = generateSlug(title)

  try {
    res.redirect(`/wiki/${URI}`);
  } catch (error) {
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
    console.log(page)
    res.send(wikipage(page.dataValues, req.params.name));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
