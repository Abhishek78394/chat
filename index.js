const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const colors = require("colors");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();

const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running..");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
    PORT,
    console.log(`Server running on PORT http://localhost:${PORT}`.yellow.bold)
);


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
      // credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
     
      socket.emit("connected");

  
    socket.on("join_chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop_typing", (room) => socket.in(room).emit("stop_typing"));
   
    socket.on("new_message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;

      if (!chat.users) return console.log("chat.users not defined");
  
        if (chat._id == newMessageRecieved.sender._id) return; 
        socket.in(chat._id).emit("message_received", newMessageRecieved);
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });

  });
