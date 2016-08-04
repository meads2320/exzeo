var express = require('express');

var bookRouter = express.Router();

var router = function(nav) {
    var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read : false
        },
        {
            title: 'ABC',
            genre: 'Fiction',
            author: 'XYZ',
            read : true
        },
        {
            title: 'Test Book 3',
            genre: 'Non-Fiction',
            author: 'Third Book Author',
            read : false
        }
    ];

    bookRouter.route('/:id')
    .get(function(req,res)  {
        var id = req.params.id;
        res.render('book', { 
            title: 'Single Book',
            nav : nav,
            book : books[id]
        });
    });


    bookRouter.route('/')
    .get(function(req,res)  {
        res.render('bookList', { 
            title: 'All books',
            nav : nav,
            books : books
        });
    });

    return bookRouter;
};

module.exports = router;