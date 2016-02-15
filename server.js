var http = require("http");
var fs= require("fs");
var url = require("url");
var path = require("path");

var server = http.createServer(function(req,res){
	var root = __dirname;
    var urlparse = url.parse(req.url).pathname;
	var joinpath = path.join(root,urlparse);
	var readfile = fs.createReadStream(joinpath);
readfile.pipe(res);
});

server.listen(8080);

var chatserver = require('./socketserver.js');
chatserver.listen(server);