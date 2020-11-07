require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_HOST;

let clientConnection;

function getOptions(options, defaultOptions) {
  options = options || {};
  return Object.assign({}, defaultOptions, options);
}

function connectMongoDB() {
  
  return new Promise((resolve, reject) => {
    if(clientConnection) {
      resolve(clientConnection);
      return;
    }

    MongoClient.connect(url, {
      useUnifiedTopology: true
    }, (err, client) => {
      
      if(err) {
        console.log('Failed to connect to the database');
        reject(err);
        return;
      }
      console.log('Connected to MongoDB successfully')
      clientConnection = client;
      resolve(clientConnection);
    });

  });
}

class DBModel {

  collection;
  collectionName;

  constructor(collectionName) {
    this.collectionName = collectionName;

    connectMongoDB().then(client => {
      const db = client.db();
      this.collection = db.collection(collectionName);
      console.log('created collection ' + collectionName);
    }).catch(err => {
      console.log('Failed to connect to the database', err);
    });
  }

  getCollectionName() {
    return collectionName;
  }

  find(filters, options) {
    console.log('Will find ' + collectionName);
    filters = filters || {};
    options = getOptions(options, { limit: 100 });

    return new Promise((resolve, reject) => {
      let query = this.collection.find(filters);

      console.log('Asked to find ' + collectionName);

      if(options.limit) {
        query = query.limit(options.limit);
      }
      
      query.toArray((err, results) => {
        if(err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    });
  }

  findOne(filters, options) {
    console.log('Will find one in ' + this.collectionName);
    filters = filters || {};
    console.log('Filters: ', filters);
    return this.collection.findOne(filters);
  }

  create(data, options) {
    data = data || {};
    console.log('Will insert: ', data, this.collectionName);
    options = getOptions(options, { timestamps:true });

    if(!!options.timestamps) {
      const now = new Date().getTime();
      data.created_at = now;
      data.updated_at = now;
    }

    return this.collection.insertOne(data);
  }
}

module.exports = DBModel;