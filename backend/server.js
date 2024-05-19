const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.listen(process.env.PORT, () => {
  console.log("server is Running");
});
