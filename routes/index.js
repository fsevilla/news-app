const express = require('express');
const router = express.Router();

const newsController = require('./../src/controllers/news.controller');

router.get('/news', newsController.getAll);
router.get('/news/:noticiaID', newsController.getById);

router.post('/auth', function(req, res) {
  console.log('Auth: ', req.body);
  res.send('ok');
});

router.post('/auth2', function(req, res) {
  console.log('Auth2: ', req.body);
  res.send('ok');
});


module.exports = router;