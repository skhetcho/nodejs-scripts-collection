var http = require('http');
var qs = require('querystring');

http.createServer(function (req, res) {
  var body = '';
  req.setEncoding('utf8');

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    var data = qs.parse(body);
    var jsonString = JSON.stringify(data);
    var jsonDataObject = JSON.parse(jsonString);

    // log the received message
    console.log(jsonDataObject.Body);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end("");
  });

}).listen(1337, '127.0.0.1');

console.log('TwiML servin\' server running at http://127.0.0.1:1337/');