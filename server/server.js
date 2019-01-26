const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname , "../public");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' , (socket) => {
  console.log("New user connected");

  socket.on('disconnect' , (socket) => {
    console.log("User disconnected");
  });

  socket.on('createMessage' , (message , callback) => {
    console.log("New message received on server " , message);
    io.emit('newMessage' , {message , createdAt:new Date()});
    callback("Dinesh");
  });


});


server.listen(3000,  () => {
  console.log("server is up on port 3000");
});
