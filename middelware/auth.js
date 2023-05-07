const bcrypt = require('bcrypt');

const Register = require('../models/register');

const authenticateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid Email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid Password' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Error authenticating user:', err);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
};

module.exports = authenticateUser;