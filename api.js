const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

router.get('/news', function(req, res) {
  const url = `${apiUrl}everything?q=bitcoin&sortBy=publishedAt&apiKey=${apiKey}`;
  axios.get(url).then(response => {
    res.send(response.data.articles);
  }).catch(e => {
    res.send('Oops! Failed!')
    res.end();
  })
})

router.get('/recientes', function(req, res) {
  const url = `${apiUrl}/top-headlines?country=mx&apiKey=${apiKey}`;
  axios.get(url).then(response => {
    res.send(response.data.articles);
  }).catch(e => {
    res.send('Oops! Failed!')
    res.end();
  })
})

module.exports = router;