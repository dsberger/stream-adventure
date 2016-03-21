var through = require('through2');

var capitalizer = through(function(buf, _, next) {
    this.push(buf.toString().toUpperCase());
    next();
});

process.stdin.pipe(capitalizer).pipe(process.stdout);
