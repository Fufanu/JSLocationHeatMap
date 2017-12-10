'use strict';

const MongoClient = require('mongodb').MongoClient;

const DB_NAME = 'heatmap';
const URL = 'mongodb://aperture:27017';

class Db {
  constructor () {

  }

  connect(url, db, callback) {
    MongoClient.connect(URL, (err, client) => {
      if(err) {
        return callback(err);
      } else {
        console.log('Connected successfully to server');
        this._client = client;
        this._db = client.db(DB_NAME);
        return callback(null, this._db);
      }
    });
  }

  close() {
    this.client.close();
  }

  get client () {
    return this._cient;
  }

  get db () {
    return this._db;
  }
}
module.exports = Db;
