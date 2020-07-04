const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); //req.body

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  // server static content (access to client/build folder from root)
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Routes
app.use("/auth", require("./server/routes/auth"));

app.use("/dashboard", require("./server/routes/dashboard"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
