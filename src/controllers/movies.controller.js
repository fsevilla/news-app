const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('./db.controller');

const Token = require('./../models/token');
const Movie = require('./../models/movie');

function getHashedPassword(pwd) {
  // const hashedPassword = crypto.createHash('md5').update(pwd).digest('hex');
  const hashedPassword = crypto.scryptSync(pwd,'salt', 24).toString('hex');
  // const hashedPassword = bcrypt.hashSync(pwd, 12);
  return hashedPassword;
}

class MovieController {

  index(req, res) {
    Movie.find({}).then(results => {
      res.send(results);
    }).catch(err => {
      console.log('Error movies: ', err);
      res.status(400).send(err);
    });
  }

  getOne(req, res) {
    Movie.findById(req.params.id).then(result => {
      res.send(result);
    }).catch(err => {
      res.status(400).send(err);
    })
  }
}

module.exports = new MovieController();