var express = require('express'); 
var adminRouter = express.Router(); 
var mongodb = require('mongodb').MongoClient; 

var books = [ {
            title:'War and Peace', 
            genre:'Historical Fiction', 
            author:'Lev Nikolayevich Tolstoy', 
            read:false, 
            bookId : 656
        },  {
            title:'ABC', 
            genre:'Fiction', 
            author:'XYZ', 
            read:true,
            bookId : 657
        },  {
            title:'Test Book 3', 
            genre:'Non-Fiction', 
            author:'Third Book Author', 
            read:false,
            bookId : 658
        }
    ]; 

var authors = [ {
            author:'Lev Nikolayevich Tolstoy', 
            booksWritten:100
        },  {
           author:'Author Books III', 
            booksWritten:4
        },  {
          author:'Book Writer jr.', 
            booksWritten:55
        }
    ]; 


var router = function(nav) {

    adminRouter.use(function (req, res, next) {
        if ( ! req.user) {
        res.redirect('/'); 
        }
        next(); 
    }); 

    adminRouter.route('/:addBooks')
    .get(function (req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
mongodb.connect(url, function(err, db) {
            var collection = db.collection('books'); 
            collection.insertMany(books, function(err, results) {
                 res.send(results); 
                 db.close(); 
            }); 
        }); 
    }); 

      adminRouter.route('/:addAuthors')
    .get(function (req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
mongodb.connect(url, function(err, db) {
            var collection = db.collection('authors'); 
            collection.insertMany(authors, function(err, results) {
                 res.send(results); 
                 db.close(); 
            }); 
        }); 
    }); 


    return adminRouter; 
}; 

module.exports = router; 