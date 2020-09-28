const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const axios = require('axios');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use('/assets', express.static(path.join(__dirname, 'public')));

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

app.get('/recientes', function(req, res) {
  const url = `${apiUrl}/top-headlines?country=mx&apiKey=${apiKey}`;
  axios.get(url).then(response => {
    res.render('index', {
      noticias: response.data.articles
    });
  }).catch(err => {
    res.send('Failure');
  });
});

app.get('/', function(req, res) {
  const url = `${apiUrl}everything?q=bitcoin&sortBy=publishedAt&apiKey=${apiKey}`;
  axios.get(url).then(response => {
    res.render('news', {
      noticias: response.data.articles
    });
  }).catch(err => {
    res.send('Failure');
  });
});

app.listen(port, () => {
  console.log('App is running in port ' + port);
})


