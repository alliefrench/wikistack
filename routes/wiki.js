const express = require("express");
const router = express.Router();
//const addPage = require('../views/addPage.js')
//console.log(addPage)
const { Page } = require("../models")
// const { addPage } = require("../views");
// console.log(addPage)
const addPage = require("../views/addPage.js");
//console.log(addPage)

router.get('/', (req, res, next) => {
    res.send('hello!')
})

router.post('/', async (req, res, next) => {
    //console.log(req.body)
    let contentObj = req.body
    title = contentObj.title
    content = contentObj.content
    console.log(content)
    // console.log(contentObj)

    const page = new Page({
        title: title,
        content: content
      });


      try {
        await page.save();
        console.log(page)
        const newWiki = contentObj.slug
        res.redirect(`/${newWiki}`);
      } catch (error) { next(error) }
})


router.get('/add', (req, res, next) => {
    res.send(
        addPage()
    )
})


router.get('/:slug', (req, res, next) => {
    res.send(`hit dynamic route at ${req.params.slug}`)
})

module.exports = router
