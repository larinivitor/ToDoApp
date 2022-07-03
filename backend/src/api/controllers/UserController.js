const { authSecret } = require("../../config");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");

module.exports = {
  async create(req, res) {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    const existentUser = await User.findOne({ email });

    if (!!existentUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Email already registered!" });
    }

    const user = await User.create({
      email,
      password: hash,
    });

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      email: user.email,
    });
  },

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Email and Password are necessary to log in",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid Email or Password" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid Email or Password" });
    }
    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      email: user.email,
      iat: now,
    };

    return res.json({
      email: user.email,
      token: jwt.encode(payload, authSecret),
    });
  },
};
