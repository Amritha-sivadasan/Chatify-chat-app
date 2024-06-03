const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
const connnetDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messgeRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connnetDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/user", userRouter);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);
app.use(cors());
const server = app.listen(process.env.PORT, () => {
  console.log("server is Running");
});
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user join room " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    if (newMessageRecieved) {
      console.log("new messages", newMessageRecieved);
    }
    if (!newMessageRecieved || !newMessageRecieved.chat) {
      socket.emit("error", "Invalid message format");
      return;
    }
    var chat = newMessageRecieved.chat;
    if (!chat.users) {
      console.log("Chat users are not defined");
      return;
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });

  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userData._id);
  });
});
