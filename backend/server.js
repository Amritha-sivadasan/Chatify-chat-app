const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const connnecDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const chatRoutes =require('./routes/chatRoutes')
const { notFound, errorHandler } =require('./middlewares/errorMiddleware')

dotenv.config();
connnecDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/user", userRouter);
app.use('/api/chat',chatRoutes)
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server is Running");
});
