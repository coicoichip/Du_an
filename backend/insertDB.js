/* eslint-disable no-sync */
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./db/sample.db');
const querys = fs.readFileSync('../CreateTable.sql', { encoding: 'utf-8' }).split(';');
querys.forEach(element => {
  if (element !== '\n') {
    db.run(element, err => {
      if (err) console.log(err);
    });
  }
});

db.close();
