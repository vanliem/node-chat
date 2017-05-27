var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'chat'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.session.user ? req.session.user : '';

  	res.render('index', { user: user});
});

router.get('/session-user/:user', function(req, res, next) {
  if (!req.session.user) {
  	req.session.user = req.params.user;
  		res.json({user: req.session.user, status: true});
  }
});

router.post('/insert-message', function(req, res, next) {
  	var user = req.session.user;
  	var message = req.body.message;
  	connection.query('INSERT INTO `message` (name, messages) VALUES("'+ user +'", "'+ message +'")');

  	res.json({status: true});
});


module.exports = router;
