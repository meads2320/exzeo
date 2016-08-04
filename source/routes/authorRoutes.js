var express = require('express');

var authorRouter = express.Router();

var router = function(nav) {
    var authors = [
        {
            author: 'Lev Nikolayevich Tolstoy',
            booksWritten : 100
        },
        {
           author: 'Author Books III',
            booksWritten : 4
        },
        {
          author: 'Book Writer jr.',
            booksWritten : 55
        }
    ];

    authorRouter.route('/:id')
    .get(function(req,res)  {
        var id = req.params.id;
        res.render('author', { 
            title: 'Single Author',
            nav : nav,
            author : authors[id]
        });
    });

    authorRouter.route('/')
    .get(function(req,res)  {
        res.render('authorList', { 
            title: 'All Authors',
            nav : nav,
            authors : authors
        });
    });

    return authorRouter;
};

module.exports = router;