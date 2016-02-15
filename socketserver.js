var socketio = require('socket.io');
var io;
var currentRoom={};
exports.listen = function(server){
	io = socketio.listen(server);
     io.set('log level', 1);
	io.sockets.on ('connection',function(socket){
		joinRoom(socket,'lobby');
		handleMess(socket);
	});
};



function handleMess(socket){
	socket.on("data",function(data){
		socket.broadcast.to('lobby').emit("data",data);
			console.log(data);
	})
}

function joinRoom(socket,room){
	socket.join(room);
	currentRoom[socket.id] = room;
	console.log(room);
}