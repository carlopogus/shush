var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static('audio'));

app.use("/audio", express.static(__dirname + "/audio"));
app.use("/styles", express.static(__dirname + "/styles"));

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/shush', function (req, res) {
  res.sendFile(__dirname + '/shush.html');
});

var controllerData = {
  volume: 1,
  playing: false
};

io.on('connection', function (socket) {
  socket.emit('connected', controllerData);

  socket.on('controller data', function (data) {
    controllerData = data;
    socket.broadcast.emit('controller data', controllerData);
  });
});
