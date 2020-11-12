const express = require('express');
const router = express.Router();

const Token = require('./../src/models/token');

const newsController = require('./../src/controllers/news.controller');
const usersController = require('./../src/controllers/users.controller');
const moviesController = require('./../src/controllers/movies.controller');

function authMiddleware(req, res, next) {

  Token.findByToken(req.headers.authorization).then(response => {
    if(response) {
      next();
    } else {
      res.status(401).send();
    }
  }).catch(err => {
    res.status(401).send();
  });
}

// Authentication
router.post('/auth/google', usersController.googleLogin);
router.post('/auth', usersController.login);
router.post('/signup', usersController.signup);
router.post('/token', usersController.test);

// Users
router.get('/users', usersController.index);
router.get('/users/:id', usersController.getOne);

// News
router.get('/news', authMiddleware, newsController.getAll);
router.get('/headlines', authMiddleware, newsController.getHeadlines);
router.get('/domains', authMiddleware, newsController.getSources);
router.get('/news/:noticiaID', newsController.getById);

// Movies
router.get('/movies', moviesController.index);
router.get('/movies/:id', moviesController.getOne);


module.exports = router;