const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('./db.controller');

const Token = require('./../models/token');

function getHashedPassword(pwd) {
  // const hashedPassword = crypto.createHash('md5').update(pwd).digest('hex');
  const hashedPassword = crypto.scryptSync(pwd,'salt', 24).toString('hex');
  // const hashedPassword = bcrypt.hashSync(pwd, 12);
  return hashedPassword;
}

class UserController {

  index(req, res) {
    db('users').then(collection => {
      collection.find().then(results => {
        res.send(results);
      });
    }).catch(err => {
      res.send(err);
    })
  }

  login(req, res) {
    db('users').then(collection => {
      const hashedPassword = getHashedPassword(req.body.password);
      collection.findOne({
        email:req.body.email,
        password:hashedPassword
      }).then(results => {
        if(results) {
          Token.create(results._id).then(result => {
            console.log('Created token: ', result);
            res.send(result.ops);
          }).catch(err => {
            console.log('Failed to create token', err);
            res.status(404).send();
          })
        } else {
          res.status(404).send();
        }
      }).catch(err => {
        console.log('Error: ', err);
        res.send(err);
      });
    }).catch(err => {
      res.send(err);
    })
  }

  signup(req, res) {
    db('users').then(collection => {
      const hashedPassword = getHashedPassword(req.body.password);
      collection.insertOne({
        email:req.body.email,
        password:hashedPassword
      }).then(result => {
        res.send(result);
      }).catch(err => {
        console.log('Error: ', err);
        res.status(400).send(err);
      });
    }).catch(err => {
      console.log('Error', err);
      res.status(400).send(err);
    })
  }

  test(req, res) {
    Token.validate(req.body.token, req.body.user).then(result => {
      res.send('ok');
    }).catch(err => {
      console.log('Error', err);
      res.status(404).send();
    })
  }
}

module.exports = new UserController();