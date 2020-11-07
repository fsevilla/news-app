const express = require('express');
const router = express.Router();

const newsController = require('./../src/controllers/news.controller');
const testController = require('./../src/controllers/test.controller');
const usersController = require('./../src/controllers/users.controller');

router.get('/news', newsController.getAll);
router.get('/headlines', newsController.getHeadlines);
router.get('/domains', newsController.getSources);
router.get('/news/:noticiaID', newsController.getById);

router.get('/users', usersController.index);
router.get('/users/:id', usersController.getOne);

// Authentication
router.post('/auth', usersController.login);
router.post('/signup', usersController.signup);
router.post('/token', usersController.test);


module.exports = router;