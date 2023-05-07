const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Login = require('../models/login')

const login = async (req, res) => {
    try {
      console.log('User registered successfully');
      res.status(201).json({ message: 'User Login successfully' });
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'Failed to register user' });
    }
  };


  module.exports = login  
