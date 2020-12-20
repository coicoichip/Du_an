const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./db/sample.db');
const datas = fs.readFileSync('./dbInsertData.sql', { encoding: 'utf-8' }).split(';');
datas.forEach((element, idx) => {
  if (idx !== datas.length - 1) {
    db.run(element, err => {
      console.log(element);
      if (err) console.log(err);
      else console.log('sucess');
    });
  }
});
db.close();
