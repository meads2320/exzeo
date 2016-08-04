var express = require('express');

var app = express();

var port = process.env.PORT || 1987;


//middleware
app.use(express.static('public'));
app.set('views', 'source/views');
//app.set('view engine', 'jade');

// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({ extname: '.hbs'}));

//app.set('view engine', '.hbs');
app.set('view engine', 'ejs');

app.get('/', function(req, res) { 
    res.render('main', { 
        title: "Hello from EJS",
        list : ['1','2','3' ,'4']
    });
});

app.get('/books', function(req, res) { 
    res.send('hello books');
});

app.listen(1987, function(err)  {
    console.log('running server on port: ' + port);
});
