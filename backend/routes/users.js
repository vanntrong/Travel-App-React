const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const existingUserWithEmail = await User.findOne({ email: req.body.email });
    if (existingUserWithEmail) {
      return res.status(400).json("Email already exists");
    }
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      res.status(400).json("Username already exists");
    }
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      });

      await newUser.save();
      res.status(200).json("Successfully registered");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("Wrong username or password!");
    } else {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (!isValidPassword) {
        res.status(400).json("Wrong username or password!");
      } else {
        res.status(200).json({ _id: user._id, username: user.username });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
