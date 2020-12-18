const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findUser(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).json({ msg: "you are successfully logged out" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/searches", auth, async (req, res) => {
  try {
    req.user.searches = req.user.searches.concat(req.body.item);
    await req.user.save();
    res.status(201).json({ msg: "process is successful" });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
