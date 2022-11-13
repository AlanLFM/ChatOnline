//Crear una instancia de SocketIO, recibe como parámetro el url del servidor al que se conectará
var socket = io.connect('http://localhost:8080');

let mensaje=document.getElementById('mensaje');
let usuario=document.getElementById('usuario');
let salida=document.getElementById('salida');
let notificaciones=document.getElementById('notificaciones');
let boton=document.getElementById('enviar');
let alerta=document.getElementById('alerta');
var clientes=[];

boton.addEventListener('click', function(){
  var data={
    mensaje:mensaje.value,
    usuario:usuario.value,
  };

  if(mensaje.value===''||usuario.value===''){
    //alert('Se requiere un mensaje y un usuario para poder ingresar al chat');
    //return(console.log('<h1>Deberás poner un usuario y/o mensaje</h1>'))
    //alerta.innerHTML+=JSON.stringify("<p style='color:#FF0000';> Debes poner un usuario y/o mensaje</p>");
    function msg(){
    msg=alerta.innerHTML+=JSON.stringify("<p style='color:#FF0000';>Debes ingresar con un usuario y/o mensaje válido</p>")
    }
    function clear(){
      msg=alerta.innerHTML=("");
    }
    setTimeout(msg, 0000);
    setTimeout(clear, 5000);

    


  }else{
    mensaje.value='';
    socket.emit('chat:mensaje',data);
  }
});

mensaje.addEventListener('keydown', function(){
  socket.emit('chat:escribiendo', usuario.value);

});

socket.on('chat:mensaje', function(data){
  salida.innerHTML+=
  '<b>'+data.usuario+'</b>:'+data.mensaje+'<br>';
  avisos.innerHTML='';
});

socket.on('chat:escribiendo', function(data){
  avisos.innerHTML='<p><em>' + data + '</em> está escribiendo....</p>';
});
/*
socket.on('socket_desconectado',function(data){
  console.log(data);
  clientes=clientes.filter(function(cliente){
    console.log(cliente);
    return cliente.id !=data.id;
  });
});
*/
socket.on('socket_desconectado',function(data){
  console.log(data);
  notificaciones.innerHTML+=JSON.stringify(data);
});

socket.on('socket_conectado', function(data){
  console.log(data);
  notificaciones.innerHTML+=JSON.stringify(data);
})
/*
//Escuchar al evento 'hola' y realizar cierta accion, recibe como parámetro el id del evento y un callback con la información recibida
socket.on('conectado', function (data) {
  //Notificar al usuario el evento hola
  console.log(data);
  
  notificaciones.push(data);
  document.querySelector('#notificaciones').innerHTML = JSON.stringify(notificaciones);
});

socket.on('desconectado', function (data) {
  //Notificar al usuario el evento hola
  console.log(data);
  
  notificaciones.push(data);
  document.querySelector('#notificaciones').innerHTML = JSON.stringify(notificaciones);
});

*/