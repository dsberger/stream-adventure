var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var through = require('through2');

var decrypter = crypto.createDecipher(process.argv[2], process.argv[3]);

var unzipper = zlib.createGunzip();

var parser = tar.Parse();

parser.on('entry', function(e){
    var hashStream = crypto.createHash('md5', {encoding: 'hex'});

    if (e.type !== 'File') { return; }

    e.pipe(hashStream)
      .pipe(through(function(buf, _, next){
          this.push(buf.toString());
          this.push(" " + e.path + '\n');
          next();
      })).pipe(process.stdout);
})

process.stdin
    .pipe(decrypter)
    .pipe(unzipper)
    .pipe(parser)
  ;
