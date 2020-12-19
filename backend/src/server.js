const express = require('express');
const app = express();
app.use(express.json());

app.use(session({
  store: new SQLiteStore({
    db: './db/kkm_sessions.sqlite3',
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
      }
    },
    connectionLimit: 1
  }),
  secret: 'GTu7lNCnQO',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // a day
  }
}));

const public_apis = [];

public_apis.forEach(api => app.use(require(`./routes/public/${api}`)));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Your app is listening on port ${port}`));
