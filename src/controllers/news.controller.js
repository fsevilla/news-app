const axios = require('axios');
if(process.env.NODE_ENV==='dev') {
  require('dotenv').config();
}

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

class News {
  getAll(req, res) {
    const query = req.query.q || '';
    const domains = req.query.s ? '&domains=' + req.query.s : '';
    if(query) {
      const url = `${apiUrl}everything?q=${query}&sortBy=publishedAt${domains}&apiKey=${apiKey}`;
      axios.get(url).then(response => {
        res.send(response.data.articles);
      }).catch(e => {
        res.send('Oops! Failed to retrieve news');
        res.end();
      });
    } else {
      res.send([]);
    }
  }

  getHeadlines(req, res) {
    const country = req.query.q || 'mx';
    const url = `${apiUrl}top-headlines?country=${country}&apiKey=${apiKey}`;
    axios.get(url).then(response => {
      res.send(response.data.articles);
    }).catch(e => {
      res.send('Oops! Failed to retrieve headlines');
      res.end();
    });
  }

  getSources(req, res) {
    const url = `${apiUrl}sources?apiKey=${apiKey}`;
    axios.get(url).then(response => {
      res.send(response.data.sources);
    }).catch(e => {
      res.send('Oops! Failed to retrieve the sources');
      console.log('Error', e);
      res.end();
    });
  }

  getById(req, res) {
    res.send('Traer la noticia ' + req.params.noticiaID);
  }
}

module.exports = new News();