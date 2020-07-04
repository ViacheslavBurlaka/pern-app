const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

// get all todos and user name
router.get("/", authorize, async (req, res) => {
  try {
    // get u.user_name, t.todo_id, t.description
    const user = await pool.query(
      "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create
router.post("/todos", authorize, async (req, res) => {
  try {
    // console.log(req.body)
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, description) VALUES($1, $2) RETURNING *",
      [req.user.id, description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update
router.put("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3",
      [description, id, req.user.id]
    );
    res.json(`Todo has been updated!`);
  } catch (err) {
    console.error(err.message);
  }
});

//delete
router.delete("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2",
      [id, req.user.id]
    );
    res.json("Todo has been deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
