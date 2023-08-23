const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const {db} = require('../db');

passport.use(new LocalStrategy(
  (username, password, done) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      
      const hashedPassword = crypto.pbkdf2(password, user.id.toString(), 10000, 64, 'sha512').toString('hex');
      if (hashedPassword !== user.hashed_password) {
        return done(null, false);
      }
      
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
    done(err, user);
  });
});