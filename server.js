var http = require("http");
var fs= require("fs");
var url = require("url");
var path = require("path");
var page = "./htmlpage.html";
var port = process.env.PORT || 3000;

var server = http.createServer(function(req,res){
	var root = __dirname;
    var urlparse = url.parse(req.url).pathname;
	var joinpath = path.join(root,urlparse);
	var readfile = fs.createReadStream(page);
readfile.pipe(res);
});

server.listen(port);

var chatserver = require('./socketserver.js');
chatserver.listen(server);
