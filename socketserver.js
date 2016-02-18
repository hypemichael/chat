var socketio = require('socket.io');
var io;
var currentRoom={};
var Guest = 0;
var User ={};
exports.listen = function(server){
	io = socketio.listen(server);
     io.set('log level', 1);
	io.sockets.on ('connection',function(socket){
		Guest = Guest + 1;
		User[socket.id]=Guest;
		joinRoom(socket,'lobby',User[socket.id]);
		handleMess(socket,Guest);
		
	});
};



function handleMess(socket){
	socket.on("data",function(data){
		socket.broadcast.to('lobby').emit("data",data,User[socket.id]);
			console.log(data);
	})
}

function joinRoom(socket,room,users){
	socket.join(room);
	currentRoom[socket.id] = room;
	console.log(room);
	socket.broadcast.to('lobby').emit("users",users);
}
