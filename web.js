var express = require('express');
var app = express();
var fb = require('./api/fb.js');

var querystring = require('querystring'),
    fs = require('fs'),
    http = require('http');

app.use(express.logger());

app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8888;
app.listen(port, function() {
    console.log('Listening on ' + port);
});

app.get('/', function(request, response) {
});

app.get('/auth_facebook', function(request, response) {
  fb.login(request, response);
});

app.post('/upload', function(request, response) {
    var base64img = fs.readFileSync(request.files.upload.path).toString('base64');

    var data = querystring.stringify({
        base64: base64img
    });

    var options = {
        host: 'ec2-54-213-83-185.us-west-2.compute.amazonaws.com',
        port: 80,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            var obj = JSON.parse(chunk)

            // for-in to get a single key... barf.
            for (filename in obj) {
                console.log(obj[filename])

                if ( obj.hasOwnProperty(filename) ) {
                    response.write(JSON.stringify(obj[filename]));
                }
            }
            response.end();
        });
    });

    req.write(data);
    req.end();
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
