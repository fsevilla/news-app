const DBModel = require('./db');

class Movie extends DBModel {

  constructor() {
    super('movies');
  }

  validate(username, password) {
    return this.findOne({
      email: username,
      password: password
    })
  }

}

module.exports = new Movie();