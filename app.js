const express = require('express');
var app = require('express')();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 8080);
server.listen(app.get('port'), () => console.log('Servidor iniciado en 8080'));

app.use(express.static(__dirname +'/public/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + 'public');
});

io.on('connection', (socket) => {
  console.log('socket conectado', socket.id);
  io.emit('socket_conectado','<p style=color:#32CD32;>Nuevo usuario conectado: '
    +socket.id +'</p>');

  /*socket.on('disconnect', () => {
    console.log('socket desconectado', socket.id);
    io.emit('socket_desconectado', {
      texto: 'Socket desconectado:',
      id: socket.id
    });*/
    socket.on('disconnect', () => {
      console.log('socket desconectado', socket.id);
      io.emit('socket_desconectado','<p style=color:red;>Socket desconectado: '+socket.id + '</p>');  
  });

  socket.on('chat:mensaje', (data) => {
    io.emit('chat:mensaje', data);
  });

  socket.on('chat:escribiendo', (usuario) => {
    socket.broadcast.emit('chat:escribiendo', usuario);
  });
});