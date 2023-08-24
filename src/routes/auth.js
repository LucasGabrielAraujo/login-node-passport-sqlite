const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {db} = require('../db');
let nombreusuario;
passport.use(new LocalStrategy(
  (username, password, done) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
      if (err) {console.error(err); return done(err);};
      if (!user){console.error("usuario no encontrado"); return done(null, false);}
      
      bcrypt.compare(password, user.password_hashed, (err, res)=>{
        if (err) {
          console.error(err)
          return done(null, false);
        }
        if(res){
          console.log(user.username)
          module.exports = user.username;
          
          return done(null, user);
        }
        if (!res) {
          console.error("contraseña incorrecta");
          return done(null, false);
        }
      })
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