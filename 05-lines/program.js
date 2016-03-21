var split = require('split');
var through = require('through2');

var lineCount = 0;

var alternator = through(function(buf, _, next) {
    var line = buf.toString();
    if(lineCount % 2 ===0){
        var output = line.toLowerCase() + '\n';
    } else {
        var output = line.toUpperCase() + '\n';
    }
    this.push(output);
    lineCount++;
    next();
})

process.stdin
    .pipe(split())
    .pipe(alternator)
    .pipe(process.stdout)
;
