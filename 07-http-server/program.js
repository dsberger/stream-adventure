var http = require('http');
var through = require('through2');

var server = http.createServer(function(req, res){
  if (req.method === 'POST') {
    res.end(
        through(function(buf, _, next){
          line = buf.toString.toUpperCase();
          console.log(line);
          this.push(line);
          next();
        })
    )
  }

});

server.listen(process.argv[2]);
