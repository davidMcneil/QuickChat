var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');
var wall = "";
 
http.createServer(function (request, response)
{
    // console.log('request starting...');
    if(request.method=='POST') {
	var body='';
	request.on('data', function (data) {
		       body += data;
		   });
	request.on('end',function(){
		       if (body != "!POLLING!") {
			   wall +=  body + '\n';
			   console.log(wall);
		       }
		       response.writeHead(200, {'Content-Type': 'text/plain'});
		       response.end(wall);
		   });
    }
    
    var filePath = '.' + request.url;
    if (filePath == './')
	filePath = './chat.html';
    
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
    case '.js':
	contentType = 'text/javascript';
	break;
    case '.css':
	contentType = 'text/css';
	break;
    }
    
    path.exists(filePath, function(exists)
    {		   
	if (exists) {
	    fs.readFile(filePath, function(error, content)
	    {
		if (error) {
		    response.writeHead(500);
		    response.end();
		}
		else {
		    response.writeHead(200, { 'Content-Type': contentType });
		    response.end(content, 'utf-8');
		}
	    });
	}
	else {
	    response.writeHead(404);
	    response.end();
	}
    });
    
}).listen(8000);