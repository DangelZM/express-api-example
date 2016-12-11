var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {
    Book.find((err, books) => {
      if(err){
        res.status(500).send(err);
      } else {
        res.json(books);
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

