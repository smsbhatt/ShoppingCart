// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
let mySql = require("./mysql.js")();
let Sql=require('./sql.js');
var sql=new Sql();
// load up the user model


// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
       done(null, user[0].user_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        mySql.query('SELECT * FROM Users where user_id=?', [id], function(err, user) {
            if (err) throw err;
            done(err, user);
            
        });
        
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'usn',
        passwordField : 'psw',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, usn, psw, done) {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        mySql.query('SELECT * FROM Users where username=? and psw=?', [usn, psw], function(err, user) {
            if (err) return done(err);
            if(user.length>0){
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }else{
                sql.SignUp(usn,psw,function(callback){
                    if(callback){
                        sql.Login(usn,psw,function(user){
                            console.log("Signup::",user);
                            return done(null, user);

                        })
                    }
                    
                });
               
            }
            
            
        });
        // User.findOne({ 'local.email' :  email }, function(err, user) {
        //     // if there are any errors, return the error
        //     if (err)
        //         return done(err);

        //     // check to see if theres already a user with that email
        //     if (user) {
        //         return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        //     } else {

        //         // if there is no user with that email
        //         // create the user
        //         var newUser            = new User();

        //         // set the user's local credentials
        //         newUser.local.email    = email;
        //         newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model

        //         // save the user
        //         newUser.save(function(err) {
        //             if (err)
        //                 throw err;
        //             return done(null, newUser);
        //         });
        //     }

        // });

    }));
    

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'usn',
        passwordField : 'psw',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, usn, psw, done) { // callback with email and password from our form
         console.log('signup');
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        mySql.query('SELECT * FROM Users where username=? and psw=?', [usn, psw], function(err, user) {
            if (err) return done(err);
            if(user.length>0){
                console.log('Loggingin.....',user[0].UserName);
                return done(null,user);
            }else{
               return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
 
            }
            
            
        });
        

    }));
    passport.use('admin-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'usn',
        passwordField : 'psw',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, usn, psw, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        if(usn=='smsbhatt'){
            mySql.query('SELECT * FROM Users where username=? and psw=?', [usn, psw], function(err, user) {
            if (err) return done(err);
            if(user.length>0){
                console.log('Loggingin.....',user[0].UserName);
                return done(null,user);
            }else{
               return done(null, false, req.flash('adminloginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
 
            }
            
            
        });

        }else{
             return done(null, false, req.flash('adminloginMessage', 'You dont have admin privilege'));
        }
        
        

    }));

};
