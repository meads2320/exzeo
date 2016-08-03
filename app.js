var express = require('express');

var app = express();

var port = 1987;

//middleware
app.use(express.static('public'));
app.use(express.static('source/views'));

app.get('/', function(req, res) { 
    res.send('hello world');
});

app.get('/books', function(req, res) { 
    res.send('hello books');
});


app.listen(1987, function(err)  {
    console.log('running server on port: ' + port);
});
