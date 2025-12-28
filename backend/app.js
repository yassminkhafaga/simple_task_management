require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const app = express();
const sequelize = require("./config/db");

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Check database connection & sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    await sequelize.sync();
    console.log("Database & tables synced!");
  } catch (error) {
    console.error("Unable to connect or sync database:", error);
  }
})();

// Routes
app.use("/auth", require("./routes/auth.route"));
app.use("/tasks", require("./routes/task.route"));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;