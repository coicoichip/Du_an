CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR,
  name VARCHAR,
  password VARCHAR,
  phone VARCHAR,
  address VARCHAR,
  position VARCHAR,
  create_time DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS restaurants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  address VARCHAR,
  phone VARCHAR,
  manager_id INTEGER,
  status INTEGER,
  open_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  close_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  order_count INTEGER,
  email VARCHAR,
  create_time DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  restaurant_id INTEGER,
  star INTEGER,
  create_time DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  content VARCHAR,
  restaurant_id INTEGER,
  create_time DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS foods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  price INTEGER,
  restaurant_id INTEGER,
  status INTEGER,
  img_url VARCHAR,
  description VARCHAR,
  create_time DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS bills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bill_code VARCHAR,
  restaurant_id INTEGER,
  status INTEGER,
  ship_price INTEGER,
  total INTEGER,
  recipient_id INTEGER,
  recipient_name VARCHAR,
  recipient_email VARCHAR,
  recipient_phone VARCHAR,
  recipient_address VARCHAR,
  note VARCHAR,
  create_time DEFAULT CURRENT_TIMESTAMP,
  update_time DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS bill_detail (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bill_id INTEGER,
  food_id INTEGER,
  quantity INTEGER,
  amount INTEGER,
  create_time DEFAULT CURRENT_TIMESTAMP
);
