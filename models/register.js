const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    username:{
      type: String,
      required: [true,'Please add a email'],
    },
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
  },
  {
    collection: 'user',
  }
);

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

const Register = mongoose.model('User', userSchema);

module.exports = Register;
