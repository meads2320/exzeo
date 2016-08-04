//revealing module pattern 
var mongodb = require('mongodb').MongoClient; 
var ObjectId = require('mongodb').ObjectID; 

var bookController = function(bookService, nav) {

     var url = 'mongodb://localhost:27017/libraryApp';

     var middleWare = function(req, res, next) {
        // if ( ! req.user) {
        //     res.redirect('/'); 
        // }
        next(); 
    }; 

    var getIndex = function(req, res) {
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books'); 
            collection.find( {}).toArray(function (err, results) {
                res.render('bookList',  {
                    title:'All books', 
                    nav:nav, 
                    books:results
                }); 
                 db.close(); 
            }); 
        }); 
    }; 

      var getById = function(req, res) {
        mongodb.connect(url, function(err, db) {
            var id = new ObjectId(req.params.id); 
            var collection = db.collection('books'); 
            collection.findOne( {_id:id}, function(err, result) {

                bookService.getBookById(result.bookId, function(err, book) {

                    result.book = book;

                    res.render('book',  {
                    title:'Single book', 
                    nav:nav, 
                    book:result
                });
                
                }); 
            }); 
        }); 
    }; 

    return {
        getIndex:getIndex, 
        getById:getById, 
        middleWare:middleWare
     }; 
}; 

module.exports = bookController; 