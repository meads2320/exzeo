var express = require('express'); 
var mongodb = require('mongodb').MongoClient; 
var authorRouter = express.Router(); 
var ObjectId = require('mongodb').ObjectID; 

var router = function(nav) {

    authorRouter.use(function (req, res, next) {
        if ( ! req.user) {
            res.redirect('/'); 
        }
        next(); 
    }); 

    authorRouter.route('/:id')
.get(function (req, res) {
         var url = 'mongodb://localhost:27017/libraryApp';
mongodb.connect(url, function(err, db) {
            var id = new ObjectId(req.params.id); 
            var collection = db.collection('authors'); 
            collection.findOne( {_id:id}, function(err, result) {
                res.render('author',  {
                    title:'Single author', 
                    nav:nav, 
                    author:result
                }); 
                 db.close(); 
            }); 
        }); 

    }); 


    authorRouter.route('/')
    .get(function (req, res) {
         var url = 'mongodb://localhost:27017/libraryApp';
mongodb.connect(url, function(err, db) {
            var collection = db.collection('authors'); 
            collection.find( {}).toArray(function (err, results) {
                res.render('authorList',  {
                    title:'All authors', 
                    nav:nav, 
                    authors:results
                }); 
                 db.close(); 
            }); 
        }); 

      
    }); 

    return authorRouter; 
}; 

module.exports = router; 