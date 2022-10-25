const Joi = require("joi");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signup_get = (req, res) => {
  res.send("signUp.....");
};

module.exports.signup_post = (req, res) => {
  // Joi Validation
  const schema = Joi.object({
    name: Joi.string().max(20).required(),
    email: Joi.string().max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    // check if user already exists in database
    User.findOne({ email: value.email }).then((result) => {
      if (result) {
        res.status(400).json("User already exists");
      }
    });
  }

  const { name, email, password } = req.body;

  User.create({ name, email, password })
    .then((user) => {
      const token = createToken(user._id); // send the user Id after create
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // place token inside cookies and send as response
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.login_get = (req, res) => {
  res.send("Login..");
};
module.exports.login_post = (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  // Joi Validation
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    User.findOne({ email: value.email }).then((user) => {
      if (user) {
        // compare Hash Password
        bcrypt.compare(value.password, user.password).then((validPassword) => {
          if (!validPassword) {
            res
              .status(400)
              .send("The password that you've entered is incorrect.");
          } else {
            // Create Token and send it to the Browser
            const token = createToken(user._id);
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).send({ user: user._id });
          }
        });
      } else {
        res.send("The email address you entered isn't connected to an account");
      }
    });
  }
};

module.exports.signout_get = (req, res) => {
  res.clearCookie("jwt");
  res.send("User signOUT");
};

module.exports.Hello_get = (req, res) => {
  res.send("Hello !!!!");
};
// create json web token
// Signing a token with 3 Days of expiration:

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};
