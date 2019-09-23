const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OutlookStrategy = require('passport-outlook').Strategy;
const keys = require('./keys');
const users = require('./users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let currentUser = users.users.find(dbUser => dbUser.id === id);
  if(currentUser){
    done(null, currentUser);
  }
});

//Google strategy
passport.use(
  new GoogleStrategy({
    callbackURL: 'https://sensin.azurewebsites.net/auth/google/redirect',
    //callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    let email = profile.emails[0].value;
    let currentUser = users.users.find(dbUser => dbUser.email === email);
    console.log(email);

    if(currentUser){
      done(null, currentUser);
    }else{
      done(null, false);
    }
  })
);

//Outlook strategy
passport.use(
  new OutlookStrategy({
    callbackURL: 'https://sensin.azurewebsites.net/auth/outlook/redirect',
    //callbackURL: '/auth/outlook/redirect',
    clientID: keys.outlook.clientID,
    clientSecret: keys.outlook.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    let email = profile.emails[0].value;
    let currentUser = users.users.find(dbUser => dbUser.email === email);
    console.log(email);

    if(currentUser){
      done(null, currentUser);
    }else{
      done(null, false);
    }
  })
);
