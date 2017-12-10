'use strict';

const MongoClient = require('mongodb').MongoClient;

const DB_NAME = 'heatmap';
const URL = 'mongodb://aperture:27017';

class Db {
  constructor () {
    this._connected = false;
  }

  connect(url, db, callback) {
    MongoClient.connect(URL, (err, client) => {
      if(err) {
        return callback(err);
      } else {
        console.log('Connected successfully to server');
        this._client = client;
        this._db = client.db(DB_NAME);
        this._db.on('close', () => {
          console.log('Connection to database closed.');
          this._connected = false;
        });
        this._connected = true;

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

  get connected () {
    return this._connected;
  }
}
module.exports = Db;
