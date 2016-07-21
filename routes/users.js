var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
	if(req.isAuthenticated()){
		res.redirect('/users/profile');
	}
    res.render('admin_Login', {
        message: req.flash('adminloginMessage')
    });
});
router.post('/login', passport.authenticate('admin-login', {
    successRedirect: '/users/profile', // redirect to the secure profile section
    failureRedirect: '/users/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
router.get('/profile', isLoggedIn, function(req, res) {
    if (req.user[0].user_id == 4) {
        res.render('profile.ejs', {
            user: req.user
        });
    }else{
    	res.redirect('/home');
    	// res.render('home.ejs',{message: {FName:req.user[0].FName,LName:req.user[0].LName}});
    }
});

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
    // if they aren't redirect them to the home page
    res.redirect('/users/');
}
router.get('/logout', isLoggedIn, function(req, res) {
    req.session.destroy();
    res.redirect('/users/profile');
});
module.exports = router;