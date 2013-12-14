var generator = require('./generator.node')
var http = require('http');
var fs = require('fs');
var mime = require('mime');


http.createServer(function (req, res) {
	var url = req.url.split("/")
	//console.log(req.url);
	if (req.url==='/') {
		routes.home(res)
	} else if (url[1] && routes[url[1]]) {
		routes[url[1]](res, req);
	} else {
		fetchFile(req.url, res);
	}
}).listen(80);



routes = {};

routes.home = function(res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(generator.html("Cool"));
}

routes.four = function (res) {
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end("Error 404");
}

function fetchFile (filename, res) {
	fs.readFile('res'+filename, function(err, data) {
		if (err) {
			console.log(err)
			routes.four(res);
		} else {
			res.writeHead(200, {'Content-Type': mime.lookup(filename)});
			res.end(data);

		}
	});
}