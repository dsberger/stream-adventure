var duplexer = require('duplexer2');
var through = require('through2').obj;

module.exports = function (counter) {
  var counts = {};

  var capturer = through(function(buf, _, next){
      counts[buf.country] = (counts[buf.country] || 0) + 1;
      next();
  }, function(done){
      counter.setCounts(counts);
      done();
  });

  return duplexer({objectMode: true}, capturer, counter);
};
