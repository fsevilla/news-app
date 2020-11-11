const express = require('express');
const router = express.Router();

const newsController = require('./../src/controllers/news.controller');
const usersController = require('./../src/controllers/users.controller');
const moviesController = require('./../src/controllers/movies.controller');

// Authentication
router.post('/auth/google', usersController.googleLogin);
router.post('/auth', usersController.login);
router.post('/signup', usersController.signup);
router.post('/token', usersController.test);

// Users
router.get('/users', usersController.index);
router.get('/users/:id', usersController.getOne);

// News
router.get('/news', newsController.getAll);
router.get('/headlines', newsController.getHeadlines);
router.get('/domains', newsController.getSources);
router.get('/news/:noticiaID', newsController.getById);

// Movies
router.get('/movies', moviesController.index);
router.get('/movies/:id', moviesController.getOne);


module.exports = router;