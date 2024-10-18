const { log } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("location", function (data) {
    io.emit("mil-gaya-location", {id:socket.id, ...data});
  });
  socket.on("disconnect", function(){
    io.emit("user-disconnected", socket.id);
  });
});

server.listen(3000);
