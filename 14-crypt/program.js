var crypto = require('crypto');

var passphrase = process.argv[2];
var decrypter = crypto.createDecipher('aes256', passphrase);

process.stdin.pipe(decrypter).pipe(process.stdout);
