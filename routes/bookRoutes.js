var express = require('express');

var routes = (Book) => {
  var bookRouter = express.Router();

  bookRouter.route('/')
    .post((req, res) => {

      var book = new Book(req.body);
      book.save();

      res.status(201).send(book);

    })
    .get((req, res) => {

      var query = {};
      if(req.query.genre) {
        query.genre = req.query.genre;
      }

      Book.find(query, (err, books) => {
        if(err){
          res.status(500).send(err);
        } else {
          res.json(books);
        }
      });

    });

  bookRouter.route('/books/:bookId')
    .get((req, res) => {

      Book.findById(req.params.bookId, (err, book) => {
        if(err){
          res.status(500).send(err);
        } else {
          res.json(book);
        }
      });

    });

  return bookRouter;
};

module.exports = routes;
