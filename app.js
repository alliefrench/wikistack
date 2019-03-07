const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout.js')
const models = require('./models/index')

// db.authenticate().
//   then(() => {
//     console.log('connected to the database')
//   })

const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res,) => {
  res.send(layout(''))
})

const PORT = 3000

const init = async () => {
  try {
    await models.User.sync()
    await models.Page.sync()

    app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`)
    })
  }
  catch(err) {
    console.error(err)
  }
}

init()

