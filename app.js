var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('my api !!!');
});

app.listen(port, () => {
  console.log('Running at PORT :', port);
});

