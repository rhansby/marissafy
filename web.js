var express = require("express");
var app = express();

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

app.use(express.logger());

app.use(express.static(__dirname + '/public'));

var port = 8888 || process.env.PORT;
app.listen(port, function() {
    console.log("Listening on " + port);
});

app.get('/', function(request, response) {
});

app.post('/upload', function(request, response) {
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "/tmp/test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
});

app.get('/show', function(request, response) {
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } 
        else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
});
