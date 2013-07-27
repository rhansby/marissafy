/*
var express = require("express");
var app = express();
app.use(express.logger());

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
}); */

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);