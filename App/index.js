"use strict";

const path = require('path');
const express = require('express');
const app = express();

class App {
  constructor (PORT, db) {
    app.use(express.static(__dirname + '/../public'));

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname + '/../public/views/index.htm'));
    });

    app.get('/locations', (req, res) => {
      const start = Number(req.query.start);
      const limit = Number(req.query.limit);
      console.log(`Start: ${start}   Limit: ${limit}`);
      const locations = db.collection('locations');
      locations.find().skip(start).limit(limit).toArray((err, locationArray) => {
        res.status(200).json(locationArray);
      });
    });

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  }
}
module.exports = App;
