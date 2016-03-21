var concat = require('concat-stream');

var reverser = concat(function(buffer){
    var str = buffer.toString().split('').reverse().join('');
    process.stdout.write(str);
})

process.stdin.pipe(reverser);
