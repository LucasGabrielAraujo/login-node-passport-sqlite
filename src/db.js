const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./src/db/database.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password_hashed TEXT, salt TEXT)");
});

const createUser = (username, password, callback) => {/*Esta hasheando mal*/
  //crear hash
  bcrypt.hash(password, 10, (err, hashedPassword)=>{
    if (err) {
      console.error(err)
      return;
    }
    //almacenar usurio
    db.run("INSERT INTO users (username, password_hashed) VALUES (?, ?)", [username, hashedPassword], callback);
    return;
  })
};
  // const hashedPassword = crypto.pbkdf2Sync(password, crypto.randomBytes(16).toString('hex'), 10000, 64, 'sha512').toString('hex');

module.exports = {
  db,
  createUser
};