const options = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/sample.db',
      timezone: 'UTC',
    },
    useNullAsDefault: true,
  },
};

const environment = process.env.NODE_ENV || 'development';
module.exports = options[environment];
