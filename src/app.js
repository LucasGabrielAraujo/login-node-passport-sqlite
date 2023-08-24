// app.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path')
const logger = require('morgan')
const {db,createUser} = require('./db');
require('./routes/auth.js');
const app = express();

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
  let nombreusuario = require('./routes/auth.js')
  if (req.isAuthenticated()) {
    res.render(__dirname + '/public/index.ejs', { nombreusuario })
  }else{
    nombreusuario="Bienvenido"
    res.render(__dirname + '/public/index.ejs', {nombreusuario});
  }
  
})
//nombre de usuario

app.get("/logout", (req, res)=>{
  nombreusuario=null;
    req.logout((err)=>{
      console.error(err);
    });
  res.redirect('/')
})
app.get('/login', (req, res)=>{
  res.render('login');
});
app.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure'
}));


app.get('/success', (req, res) => {
    res.render('success')
});

app.get('/failure', (req, res) => {
  res.render('failure');
});

app.get('/signup', (req, res)=>{
  res.render('signup');
})
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.error('Both username and password are required.')
    return res.render('signup');
  }
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      console.error(err, 'An error occurred. Please try again later.' )
      return res.render('signup');
    }
    
    if (user) {
      console.error('Username is already taken.')
      return res.render('signup');
    }
    
    createUser(username, password, (err) => {
      if (err) {
        console.log(err)
        return res.render('signup');
      }
      
      return res.redirect('/success');
    });
  });
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
