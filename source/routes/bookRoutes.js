var express = require('express');
var mongodb = require('mongodb').MongoClient;
var bookRouter = express.Router();
var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {


    bookRouter.route('/:id')
.get(function(req,res)  {
         var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db) {
            var id = new ObjectId(req.params.id);
            var collection = db.collection('books');
            collection.findOne({ _id : id}, function(err, result) {
                res.render('book', { 
                    title: 'Single book',
                    nav : nav,
                    book : result
                });
                 db.close();
            });    
        });

    });


    bookRouter.route('/')
    .get(function(req,res)  {
         var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results) {
                res.render('bookList', { 
                    title: 'All books',
                    nav : nav,
                    books : results
                });
                 db.close();
            });    
        });

      
    });

    return bookRouter;
};

module.exports = router;