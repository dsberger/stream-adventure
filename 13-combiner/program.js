var combine = require('stream-combiner');
var split = require('split');
var through = require('through2');
var zlib = require('zlib');

module.exports = function () {

  function newGenre(name){
      return { name: name, books: [] }
  }

  var currentGenre;

  function write (line, _, next){
      line = JSON.parse(line);

      if (line["type"] === "genre"){
          if(currentGenre) { this.push(JSON.stringify(genre) + '\n'); }
          currentGenre = newGenre(line["name"]);
      } else {
        console.log(line["name"]);
          currentGenre.books.push(line["name"]);
      }

      next();
  }

  function end (done){
      this.push(JSON.stringify(genre) + '\n');
      done();
  };

  return combine(
      split(),
      through(write, end),
      process.stdout
      // zlib.createGzip()
      );
};
