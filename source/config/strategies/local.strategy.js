var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function() { 

    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, function(username, password, done) {
        //database to get username and password
         var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('users');
    
            collection.findOne({username : username}, function(err, result) {
                    if(result.password === password) { 
                    var user = result;
                        done(null, user);
                    }
                    else { 
                        done(null, false, { message : 'Bad Password'});  
                     }  
            });    
        });
    }));
};