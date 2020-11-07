const crypto = require('crypto');
const db = require('./../controllers/db.controller');
const DBModel = require('./db');

class Token extends DBModel {

  constructor() {
    super('tokens');
  }

  validate(token, userId) {
    return this.findOne({
      userId:userId,
      token:token
    });
  }

  create(userId) {
    const date = new Date();
    const expire_date = date.setHours(date.getHours()+1);
    const token = crypto.scryptSync(userId + new Date().getTime(),'salt', 48).toString('hex');

    return super.create({
      userId: userId,
      token: token,
      expire_date: expire_date
    }, {timestamps:false});
  }
}

module.exports = new Token();