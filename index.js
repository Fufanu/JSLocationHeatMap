"use strict";

const fs = require('fs');
const App = require('./App');
const Db = require('./Db');
const LocationImport = require('./db/LocationImport');

const DB_NAME = 'heatmap';
const URL = 'mongodb://aperture:27017';

let db = new Db();

console.log('Starting ...');

const locationsFilePath = process.argv[2];

db.connect(URL, DB_NAME, (err, db) => {
  if(err) {
    throw new Error(err);
  } else {
    if(locationsFilePath) {
      fs.readFile(locationsFilePath, 'utf8', (err, locations) => {
        locations = JSON.parse(locations);
        LocationImport.importLocations(db, locations);
      });
    } else {
      console.log('No takeout selected. If you want to import locations please add the path to json file as argument.');
    }
    const app = new App(3000, db);
  }
});
