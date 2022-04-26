var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login',function(r,s){
  s.render('login');
});

router.get('/register',function(r,s){
  s.render('register');
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
