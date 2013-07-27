
function route(handle, pathname, response, request) {
	console.log("About to route a request for" + pathname);
	// handlers is an array of functions
	if (typeof handle[pathname] === 'function'){
		return handle[pathname](response, request);
	} else {
		console.log("no request handler found for" + pathname);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 Not Found");
		response.end();
	}
}

exports.route = route;