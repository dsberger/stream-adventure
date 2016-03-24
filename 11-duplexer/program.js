var spawn = require('child_process').spawn
var duplexer = require('duplexer2')

module.exports = function (cmd, args) {
  var stream = spawn(cmd, args);
  return duplexer(stream.stdin, stream.stdout);
};
