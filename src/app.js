// app.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path')
const logger = require('morgan')
const {db,createUser} = require('./db');
require('./routes/auth');

const app = express();

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/login', (req, res)=>{
  res.render('login');
});
app.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/failure'
}));


app.get('/success', (req, res) => {
  res.render('success');
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
    return res.render('signup', { error: 'Both username and password are required.' });
  }
  
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.render('signup', { error: 'An error occurred. Please try again later.' });
    }
    
    if (user) {
      return res.render('signup', { error: 'Username is already taken.' });
    }
    
    createUser(username, password, (err) => {
      if (err) {
        console.log(err)
        return res.render('signup', { error: 'An error occurred. Please try again later.' });
      }
      
      return res.redirect('/success');
    });
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
