var http = require('http');
var through = require('through2');

var capitalizer = through(function(buf, _, next) {
    this.push(buf.toString().toUpperCase());
    next();
});

var server = http.createServer(function(req, res){
  if (req.method === 'POST') {
    req.pipe(capitalizer).pipe(res)
  }
});


server.listen(process.argv[2]);
