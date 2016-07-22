var express = require('express');
var router = express.Router();
var sql=require('./sql.js');
var Sql=new sql();
var passport = require('passport');
var http = require('http').Server(express);
var io = require('socket.io')(http);



/* GET home page. */
    // router.get('/', function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    // });

    router.get('/', function(req, res) {
        if(req.isAuthenticated()){
            res.redirect('/home');
        }
        Sql.Fetch_All_Products(function(response){
            console.log('products:::',response);
           res.render('index',{rs:response});

        })
        
    });
    router.get('/login',function(req, res) {
        if(req.isAuthenticated()){
            res.redirect('/home');
        }
        res.render('Login',{ message: req.flash('loginMessage') });

    });
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    
    router.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
       
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    router.post('/order-list',function(req,res){
        res.render('order_list.ejs');
    })
    router.post('/shipping',function(req,res){
        console.log("ship");
      

        res.render('shipping.ejs');
    });
    
   
    // router.post('/login', function(req, res) {
    // 	// console.log(req.body.user.usn);
    	
    //     // io.on('connection', function(socket) {
    //     //     socket.on('validate', function(data) {
    //     //         console.log('data:::', data)
    //     //         usn = data.uname;
    //     //         psw = data.pass;
    //     //         console.log(usn + "," + psw);
    //                Sql.Login(req.body.user.usn, req.body.user.psw, function(response) {
    //                 console.log('resp:::', response);
    //                 if (response.length>0) {
    //                 	user=response;
    //                     res.redirect('/home');
    //                 } else {
    //                     res.redirect('/login');
    //                 }
    //                 //socket.emit('Success', response);
    //             });
    //     //         //console.log('Sql::::',require("./sql.js")(usn,psw).toString());
    //     //     });
    //     // });
    //     //res.redirect('/home');
    // });
    router.get('/home',isLoggedIn, function(req, res) {
        Sql.Fetch_All_Products(function(response){
            console.log('products:::',response);
            res.render('home.ejs',{message: {FName:req.user[0].FName,LName:req.user[0].LName},rs:response});

        })
        
    });
    router.get('/logout',isLoggedIn, function(req, res) {
        req.session.destroy();
        res.redirect('/home');
    });
    router.get('/view_cart', function(req, res) {
        res.render('view_cart.ejs');
    });
    router.get('/checkout', function(req, res) {
        res.render('checkout.ejs');
    });
    router.get('/view_products', function(req, res) {
             Sql.Fetch_All_Products(function(response){
            console.log('products:::',response);
            res.render('View_products.ejs',{rs:response});

        })
        
    });

    router.get('/view_product_details', function(req, res) {
             Sql.Fetch_One_Products(req.query.pid,function(response){

            console.log('products:::',response);
            res.render('view_product_details.ejs',{rs:response});
            
        })
        
    });
    function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
    }
    router.get('/ping', function(req, res){
        res.status(200).send("pong!");
    });

module.exports = router;
