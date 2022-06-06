const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const scoketio = require("socket.io");
const fromatMessage = require("./utils/messages");
const { userJoin, getCurrentUser } = require("./utils/users");

const server = http.createServer(app);
const port = 5000 || process.env.PORT;

const io = scoketio(server);

const bot = "chat bot";

app.use(express.static(path.join(__dirname, "./public")));

//run when clinet connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    //for single client
    const user= userJoin(socket.id,username,room);
    socket.join(user.room);
    
    //only to single user
    socket.emit("message", fromatMessage(bot, "wellcome to the chat room"));
    // send to all users except itself
    socket.broadcast.to(user.room).emit(
      "message",
      fromatMessage(bot, `${user.username} has joined the chat`)
    );

    socket.on("disconnect", () => {
      io.to(user.room).emit("message", fromatMessage(bot, `${user.username} left the chat `));
    });
    //send to all
    // io.emit()
  });

  //listen for chatMessages
  socket.on("chatMessage", (msg) => {
    const user=getCurrentUser(socket.id);
    //    console.log(msg);
    io.to(user.room).emit("message", fromatMessage(user.username, msg));
  });
});

server.listen(port, () => {
  console.log("server is started");
});
