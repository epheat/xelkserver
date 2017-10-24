// Evan Heaton & Robert Cala
// CS316 Program 3: nodejs

var http = require("http");
var url = require("url");

const STARTPORT = 2000;
const ENDPORT = 30000;

const hostname = 'iris.cs.uky.edu'; // TODO: do we need this?
const port = 2000; // TODO: randomly select the port or whatever

var server = http.createServer(function(request, response) {

  // serve the requested url
  serveURL(request.url, request, response);




});

server.listen(port, function(err) {
  if (err) {
    console.log("error occurred");
  } else {
  	console.log('Server running on port ' + port);
  }
});


function serveURL(url, request, response) {
  console.log("attempting to serve the file at url " + url);

  // check if this file is an mp3 or jpg
  var fileType = "jpg";
  // then check whether or not it exists
  var fileExists = true;

  if (fileExists) {
    response.statusCode = 200;
    if (fileType == "jpg") {
      response.setHeader('Content-Type', 'image/jpeg');
      response.end(); // TODO
    } else if (fileType == "mp3") {
      response.setHeader('Content-Type', 'audio/mpeg3');
      response.end(); // TODO
    } else {
      response.setHeader('Content-Type', 'text/plain');
      response.end('Invalid file type.');
    }

  } else {
    response.statusCode = 403;
    response.setHeader('Content-Type', 'text/plain');
    response.end('That file does not exist!');
  }

}
