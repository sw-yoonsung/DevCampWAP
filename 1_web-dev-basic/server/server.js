// var http = require('http');

// http.createServer(function(req, resp){
//     resp.write('Hello ');
//     resp.end();
    
// }).listen(8080);


// 2. Express Code
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World! from Express');
});

app.listen(3000, function () {
  console.log('Simple web app listening on port 3000!');
});