var express = require('express');

var app = express();

var port = process.env.PORT || 1987;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var nav = [
            { Link : '/Books', Text: 'Books'}, 
            { Link : '/Authors', Text: 'Authors'}
          ];

var bookRouter = require('./source/routes/bookRoutes')(nav);
var authorRouter = require('./source/routes/authorRoutes')(nav);
var adminRouter = require('./source/routes/adminRoutes')(nav);
var authRouter = require('./source/routes/authRoutes')(nav);

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
    secret : 'library',
    resave: true,
    saveUninitialized: true
}));

// pull config passport
require('./source/config/passport')(app);

app.set('views', 'source/views');
//app.set('view engine', 'jade');

// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({ extname: '.hbs'}));

//app.set('view engine', '.hbs');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Authors', authorRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) { 
    res.render('main', { 
        title: 'Hello from EJS',
        nav : nav
    });
});

app.listen(1987, function(err)  {
    console.log('running server on port: ' + port);
});

