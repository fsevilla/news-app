const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cors = require('cors');

const apiRoutes = require('./routes');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const news = require('./news');

const apiNews = require('./api');

if(process.env.NODE_ENV==='dev') {
  require('dotenv').config();
}

require('./src/controllers/db.controller');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use(cors());


news(app);

// app.use('/api/v1', apiNews);
app.use('/api', jsonParser);

app.use('/api', apiRoutes);


const server = app.listen(port, () => {
  console.log('App is running in port ' + port);
});

const socketIo = require('socket.io');

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true
  }
});

io.on('connection', socket => {
  const authToken = socket.handshake.headers['authorization'];

  const Token = require('./src/models/token');

  let userName = '';

  Token.findUserByToken(authToken).then(user => {
    userName = user.name;
    console.log('User name: ', userName);
  });

  console.log('Client connected', authToken);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('likedNews', data => {
    console.log('User liked news: ', data);

    // io.emit('likedNews', data);
    socket.broadcast.emit('likedNews', {...data, user: userName});
  })

});


