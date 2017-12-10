"use strict";

class LocationImport {
  constructor () {

  }

  static importLocations (db, newLocations) {
    const locations = db.collection('locations');
    console.log('Drop collection before importing new entries.');
    locations.drop();
    let bulkOperation = locations.initializeUnorderedBulkOp();
    newLocations.locations.forEach((location) => {
      bulkOperation.insert(location);
    });
    console.log(`Start importing ${newLocations.locations.length} locations ...`);
    bulkOperation.execute((err, result) => {
      if(err) {
        throw new Error(err);
      }
      console.log(`Inserted ${result.nInserted} locations into the collection successful.`);
    });
  }

}
module.exports = LocationImport;
