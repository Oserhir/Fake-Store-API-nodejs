const Joi = require("joi");
const User = require("../models/userSchema");

module.exports.signUp_get = (req, res) => {
  res.send("Hello");
};

module.exports.signup_post = (req, res) => {
  /*
  const schema = Joi.object({
    name: Joi.string().max(20).required(),
    email: Joi.string().max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
  });

  const { error, value } = schema.validate(req.body);

  // Joi Validation
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    // check if user already exists in database
    User.findOne({ email: value.email }).then((result) => {
      if (result) {
        res.status(400).json("User already exists");
      }
    });
  } */

  const { name, email, password } = req.body;

  User.create({ name, email, password })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
