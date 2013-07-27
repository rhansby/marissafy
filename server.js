var http = require("http");
var url = require("url");

// called when the server starts 
function start(route, handle) { 
	// whenever a url is called, parses and routes it 
	function onRequest(request, response){ 
		var pathname = url.parse(request.url).pathname;
	    console.log("Request for" + pathname + "received.");
	    route(handle, pathname, response, request);
	}

	// creates the server
	http.createServer(onRequest).listen(8888);
	console.log("Server has started!");
}

exports.start = start;	