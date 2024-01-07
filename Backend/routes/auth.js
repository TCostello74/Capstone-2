const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ExpressError = require("../expressError");
const db = require("../db");
const {ensureLoggedIn, ensureAdmin} = require("../middleware/auth");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");


// Register user

router.post("/register", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(
      password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users (username, password)
             VALUES ($1, $2)
             RETURNING username`,
      [username, hashedPassword]);

    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


// Login: returns JWT on success

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      "SELECT password FROM users WHERE username = $1",
      [username]);
    let user = result.rows[0];

    if (user) {
      if (await bcrypt.compare(password, user.password) === true) {
        let token = jwt.sign({ username }, SECRET_KEY);
        return res.json({ token });
      }
    }
    throw new ExpressError("Invalid user/password", 400);
  } catch (err) {
    return next(err);
  }
});



module.exports = router;