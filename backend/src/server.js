/* eslint-disable no-unused-vars *//* eslint-disable global-require */
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const { handleAPIResponse } = require('./common/handleAPIResponse');

const app = express();
app.use(express.json());
const whitelist = ['*'];
app.use(cors({
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(session({
  store: new SQLiteStore({
    db: './db/sessions.sqlite3',
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
    connectionLimit: 1,
  }),
  secret: 'GTu7lNCnQO',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // a day
  },
}));

const public_apis = [
  'login',
  'register',
];
const private_apis = [
  'foods',
  'restaurants',
  'restaurant-details',
];

public_apis.forEach(api => app.use(require(`./routes/public/${api}`)));
private_apis.forEach(api => app.use(require(`./routes/private/${api}`)));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Your app is listening on port ${port}`));

app.use((err, req, res, next) => handleAPIResponse(res, 500, 'Internal Server Error', err));
app.use((req, res, next) => handleAPIResponse(res, 404, 'Not Found'));
