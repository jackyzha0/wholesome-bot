const express = require('express')
const app = express()

var routes = require('./router');
app.use(express.static(__dirname));
app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server started on port ' + (process.env.PORT || 3000));
});
