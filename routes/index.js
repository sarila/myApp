var express = require('express');
var router = express.Router();

var Users = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to the page' });
});

router.get('/signup', function(req, res){
	res.render('signup')
});

router.post('/signup', function(req, res){
	console.log('req...', req.body);
	var user = new Users({
		username: req.body.username,
		password: req.body.password
	});
	var promise = user.save()
	promise.then((user) => {
		console.log('user signed up with values', user);
		res.redirect('/home')
	});
});

router.get('/login', function(req, res){
	res.render('login')
});

router.post('/login',function(req,res){
	if(req.body.username && req.body.password) {
		Users.find({username: req.body.username, password: req.body.password},function(err, user){
			console.log('user loged in ...', user);
			res.redirect('/home');
		})
	} else{
		console.log('reenter username and password');
	}
});

router.get('/home', function(req, res){
	res.render('home')
})


module.exports = router;
