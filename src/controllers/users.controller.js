const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('./db.controller');

const Token = require('./../models/token');
const User = require('./../models/user');

function getHashedPassword(pwd) {
  // const hashedPassword = crypto.createHash('md5').update(pwd).digest('hex');
  const hashedPassword = crypto.scryptSync(pwd,'salt', 24).toString('hex');
  // const hashedPassword = bcrypt.hashSync(pwd, 12);
  return hashedPassword;
}

class UserController {

  index(req, res) {
    User.find().then(results => {
      res.send(results);
    }).catch(err => {
      console.log('Error usuarios: ', err);
      res.status(400).send(err);
    });
  }

  getOne(req, res) {
    User.findOne({
      email: req.query.email
    }).then(result => {
      res.send(result);
    }).catch(err => {
      res.status(400).send(err);
    })
  }

  login(req, res) {
    const hashedPassword = getHashedPassword(req.body.password);
    
    User.validate(req.body.email, hashedPassword).then(result => {
      console.log('Result usuario', result);
      Token.create(result._id).then(tokenResult => {
        console.log('Created token: ', tokenResult);
        res.send(tokenResult.ops[0]);
      }).catch(err => {
        console.log('Failed to create token', err);
        res.status(400).send();
      })
    }).catch(err => {
      res.status(400).send(err);
    })
  }

  login2(req, res) {
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
        name: req.body.name,
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