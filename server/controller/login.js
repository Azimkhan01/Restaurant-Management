const { userModel } = require('../database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;
    console.log(email,password)
  if (!email)
    return res.status(422).json({ message: "Email is required", flag: false });

  if (!password)
    return res.status(422).json({ message: "Password is required", flag: false });

  const user = await userModel.findOne({ email: email });

  if (!user)
    return res.status(404).json({ message: "The email or password is incorrect", flag: false });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(401).json({ message: "The email or password is incorrect", flag: false });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // set to false if not using HTTPS locally
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return res.status(200).json({
    message: "The user is verified",
    flag: true
  });
};

module.exports = login;
