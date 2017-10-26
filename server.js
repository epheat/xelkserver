// Evan Heaton & Robert Cala
// CS316 Program 3: nodejs

var http = require("http");
var url = require("url");
var fs = require("fs");

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

  // 33% chance to give advertisement
  if (getRandomInt(0, 2) == 0) {
    giveAdvert(request, response);
  } else {

    // check if this file is an mp3 or jpg
    var type = fileType(url);

    var filename = "." + url;

    if (type == "jpg") {
      response.setHeader('Content-Type', 'image/jpeg');
      fs.readFile(filename, function(err, data) {
        if (err) {
          error404(response);
        } else {
          response.write(data);
          response.end();
        }
      });
    } else if (type == "mp3") {
      response.setHeader('Content-Type', 'audio/mpeg3');
      fs.readFile(filename, function(err, data) {
        if (err) {
          error404(response);
        } else {
          response.write(data);
          response.end();
        }
      });
    } else {
      response.setHeader('Content-Type', 'text/plain');
      response.end('Invalid file type.');
    }
  }
}

function giveAdvert(request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'image/jpeg');
  fs.readFile("./advert.jpg", function(err, data) {
    if (err) {
      console.log("advert image missing.");
      error404(response);
    } else {
      response.write(data);
      response.end();
    }
  })
}

function fileType(url) {
  var jpgReg = /[a-zA-Z0-9_]+.jpg$/;
  var mp3Reg = /[a-zA-Z0-9_]+.mp3$/;

  if (url.match(jpgReg)) {
    return "jpg";
  } else if (url.match(mp3Reg)) {
    return "mp3";
  } else {
    return "other";
  }
}

function error404(response) {
  response.setHeader('Content-Type', 'text/plain');
  response.end('File not found.');
}

function getRandomInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
