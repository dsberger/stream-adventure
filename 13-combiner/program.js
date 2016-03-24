var combine = require('stream-combiner');
var split = require('split');
var through = require('through2');
var zlib = require('zlib');

module.exports = function () {

  function newGenre(name){
    return { name: name, books: [] }
  }


  var genreGrouper = through(write, end);

  var currentGenre;

  function write (buf, _, next){
    if (buf.length === 0) {
      return next();
    }

    line = JSON.parse(buf);

    if (line["type"] === "genre"){
      if(currentGenre) { this.push(JSON.stringify(currentGenre) + '\n'); }
      currentGenre = newGenre(line["name"]);
    } else if(line["type"] === "book"){
      currentGenre.books.push(line["name"]);
    }

    next();

  }

  function end (done){
    this.push(JSON.stringify(currentGenre) + '\n');
    done();
  };


  return combine( split(), genreGrouper, zlib.createGzip());

};
