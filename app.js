var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var bookRouter = express.Router();

bookRouter.route('/books')
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

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('my api !!!');
});

app.listen(port, () => {
  console.log('Running at PORT :', port);
});

