const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

//authorizeentication

router.post("/register", async (req, res) => {
  // 1. desctructure the req.body (name, email, password)
  const { email, name, password } = req.body;

  try {
    // 2. check if user exists => throw error
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      // 401 err means Unauthenticated
      return res.status(401).json("User already exist!");
    }

    // 3. Bcrypt (hashed) user's password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. Enter new user to the Database
    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    // 5. Generating JWT token
    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  // 1. Destructure email, password from req.body
  const { email, password } = req.body;

  try {
    // 2. Check if user exists ( if not => throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    // 3. Check if incoming password is the same as DB user's password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    // 4. Generating JWT token and return it
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// router.post("/verify", (req, res) => {
//   try {
//     res.json(true);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;
