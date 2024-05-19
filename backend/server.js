const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const connnecDB = require("./config/db");
const userRouter = require("./routes/userRoute");

dotenv.config();
connnecDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("server is Running");
});
