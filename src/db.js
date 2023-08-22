const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');

const db = new sqlite3.Database('./src/db/database.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
});

const createUser = (username, password, callback) => {
  const hashedPassword = crypto.pbkdf2Sync(password, crypto.randomBytes(16).toString('hex'), 10000, 64, 'sha512').toString('hex');
  
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], callback);
};

module.exports = {
  db,
  createUser
};