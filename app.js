const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout.js')
//const models = require('./models/index')
const {db} = require('./models')

// db.authenticate().
//   then(() => {
//     console.log('connected to the database')
//   })

const app = express();
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res,next) => {
  res.redirect('/wiki')
})

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)



const PORT = 3000

const init = async () => {
  try {
    await db.sync({force: true})

    app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`)
    })
  }
  catch(err) {
    console.error(err)
  }
}

init()

