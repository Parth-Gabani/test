const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Please add a email'],
        unique: true,
        match: [
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  ,
                  'Please add a valid email',
              ],
      },
      password: {
        type: String,
        required: [true, 'Please add a password'],
      },
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
