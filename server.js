// Evan Heaton & Robert Cala
// CS316 Program 3: nodejs

var http = require("http");
var url = require("url");

const hostname = 'iris.cs.uky.edu'; // TODO: do we need this?
const port = 2000; // TODO: randomly select the port or whatever

var server = http.createServer(function(request, response) {
	var xurl = request.url;
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	response.end('Hello, World!  You requested the following URL: '+xurl+'\n');
});

server.listen(port, function(err) {
  if (err) {
    console.log("error occurred");
  } else {
  	console.log('Server running on port ' + port);
  }
});
