const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const apiRoutes = require('./routes');

const news = require('./news');

const apiNews = require('./api');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use('/assets', express.static(path.join(__dirname, 'public')));

news(app);

// app.use('/api/v1', apiNews);
app.use('/api', apiRoutes);


app.listen(port, () => {
  console.log('App is running in port ' + port);
})


