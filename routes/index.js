const express = require('express');
const router = express.Router();

const newsController = require('./../src/controllers/news.controller');

router.get('/news', newsController.getAll);
router.get('/news/:noticiaID', newsController.getById);

module.exports = router;