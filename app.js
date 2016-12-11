var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {
    res.json({
      hello: 'This is my api'
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('my api !!!');
});

app.listen(port, () => {
  console.log('Running at PORT :', port);
});

