const express = require('express')
const app = express()
const { User } = require('./config/db');
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.use(express.json());
const session = require('express-session')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
const test = require('./routes/routes')
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    secure : false,
  }));

  app.use('/test',test);

  app.listen(port , (req,res) => {
    console.log(`Running on port ${port}`);
})