/* eslint-disable max-statements-per-line *//* eslint-disable no-unused-vars *//* eslint-disable global-require */
const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const { handleAPIResponse } = require('./common/handleAPIResponse');

const app = express();
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(
  cors({
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    origin: ['http://localhost:3000'],
  })
);

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
  'admin',
  'bill-details',
  'bills',
  'comment-details',
  'comments',
  'food-details',
  'foods',
  'logout',
  'me',
  'rates',
  'restaurant-details',
  'restaurants',
  'socket-token',
  'total-bills',
  'users',
];

public_apis.forEach(api => app.use(require(`./routes/public/${api}`)));
private_apis.forEach(api => app.use(require(`./routes/private/${api}`)));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Your app is listening on port ${port}`));

const io = require('socket.io')(server);
io.set('Access-Control-Allow-Origin', '*');
const { socketNotification } = require('./socket');
const { socketAuthentication } = require('./middlewares/socketMiddleware');

const notify = io.of('/notifications');
notify.use(socketAuthentication);
socketNotification(notify);

app.use((err, req, res, next) => handleAPIResponse(res, 500, 'Internal Server Error', err));
app.use((req, res, next) => handleAPIResponse(res, 404, 'Not Found'));
