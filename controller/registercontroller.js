const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Register = require('../models/register');
const Like = require('../models/like')

const register = async (req, res) => {
  try {
    const {username, email, password } = await req.body;

    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newUser = new Register({
      username,
      email,
      password,
    });

    await newUser.save();

    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

module.exports = register
