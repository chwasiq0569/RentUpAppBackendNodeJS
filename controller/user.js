const User = require("../model/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const { throughError } = require("../util");
var jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .trim()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .error((errors) => throughError(errors, "Username")),
    email: Joi.string()
      .trim()
      .email()
      .required()
      .error((errors) => throughError(errors, "Email")),
    password: Joi.string()
      .min(5)
      .max(30)
      .required()
      .error((errors) => throughError(errors, "Password")),
  });

  console.log(req.body);

  try {
    const userExists = await User.findOne({ email: req.body.email });

    await schema.validateAsync(req.body);

    if (userExists) {
      return res.json({
        status: 0,
        message: "User Already Exists!",
      });
    } else {
      const user = new User(req.body);

      await user.save();

      return res.json({
        status: 0,
        user: user,
      });
    }
  } catch (err) {
    return res.json({
      status: 0,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists) return res.json({ status: 0, message: "User Not Exists" });

  const { username, email } = userExists;

  let token = jwt.sign({ username, email }, process.env.JWT_PRIVATE_KEY);

  try {
    const { password } = req.body;
    const userLoggedIn = await bcrypt.compare(password, userExists.password);
    if (userLoggedIn) {
      res.json({
        status: 1,
        data: {
          id: userExists._id,
          username,
          email,
          token,
        },
      });
    } else {
      res.json({ status: 0, message: "Invalid Email or Password!" });
    }
  } catch (err) {
    res.json({ status: 0, message: err.message });
  }
};

module.exports = { login, createUser };
