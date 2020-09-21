const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  const context = { 
    title: 'News Application with EJS', 
    apiKey: process.env.API_KEY,
    menuItems: [
    { label: 'Home', path: '/' },
    { label: 'About us', path: '/about' },
    { label: 'Services', path: '/services '}
  ]}
  res.render('index', context);
  res.end();
});

app.listen(port, () => {
  console.log('App is running in port ' + port);
})


