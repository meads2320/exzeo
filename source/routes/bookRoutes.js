var express = require('express');
var mongodb = require('mongodb').MongoClient;
var bookRouter = express.Router();
var ObjectId = require('mongodb').ObjectID;


var router = function(nav) {

var bookService = require('../services/goodReadsService')();

var bookController = require('../controllers/bookController')(bookService, nav);

    bookRouter.use(bookController.middleWare);

    bookRouter.route('/:id').get(bookController.getById);
    bookRouter.route('/').get(bookController.getIndex);

    return bookRouter;
};

module.exports = router;