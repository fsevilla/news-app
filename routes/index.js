const express = require('express');
const router = express.Router();

const newsController = require('./../src/controllers/news.controller');
const testController = require('./../src/controllers/test.controller');

router.get('/news', newsController.getAll);
router.get('/headlines', newsController.getHeadlines);
router.get('/domains', newsController.getSources);
router.get('/news/:noticiaID', newsController.getById);


module.exports = router;