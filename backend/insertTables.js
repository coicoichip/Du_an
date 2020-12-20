/* eslint-disable no-sync */
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./db/sample.db');
const tables = fs.readFileSync('./dbCreateTables.sql', { encoding: 'utf-8' }).split(';');
tables.forEach(element => {
  if (element !== '\n') {
    db.run(element, err => {
      console.log(element);
      if (err) {
        console.log(err);
      } else {
        console.log('sucess');
      }
    });
  }
});
db.close();
