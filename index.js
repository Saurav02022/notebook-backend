const express = require("express");

const app = express();

const cors = require("cors");

app.use(express.json());

require("dotenv").config();

const { config } = require("./configs/db");

app.use(express.json());

app.use(cors());

const { postRouter } = require("./routes/auth.route");
const { noteBook } = require("./routes/noteBook.router");

app.use("/users", postRouter);
app.use("/notes", noteBook);

app.listen(process.env.port, async () => {
  try {
    await config;
    console.log(`Server started on port ${process.env.port}`);
    console.log("Connect to mongoose server");
  } catch (e) {
    console.error(e);
  }
});
