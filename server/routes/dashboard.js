const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.id]
    );

    // const user = await pool.query(
    //   "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
    //   [req.user.id]
    // );

    // return user's public information { user_name}
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//TODO: rewrite todos

//create
router.post("/todos", async (req, res) => {
  try {
    // console.log(req.body)
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all
router.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get one
router.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update
router.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json(`Todo has been updated!`);
  } catch (err) {
    console.error(err.message);
  }
});

//delete
router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo has been deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
