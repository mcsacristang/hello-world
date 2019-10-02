const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const cameraRoutes = require('./routes/camera-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const matrixRoutes = require('./routes/matrix-routes');
const videoRoutes = require('./routes/video-routes');
const soniaRoutes = require('./routes/sonia-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const port = process.env.PORT || 3001;
const appInsights = require("applicationinsights");

const app = express();

mongoose.connect(keys.cosmodb.host+"?ssl=true&replicaSet=globaldb", {
  auth: {
  user: keys.cosmodb.user,
  password: keys.cosmodb.psk
  }
})
.then(() => {console.log('Connection to CosmosDB successful');})
.catch((err) => console.error(err));

appInsights.setup(keys.insight.key);
appInsights.start();

app.set('view engine','ejs');

app.use(cookieSession({
  maxAge: 1 * 10 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/camera', cameraRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/matrix', matrixRoutes);
app.use('/video', videoRoutes);
app.use('/sonia', soniaRoutes);

app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

app.get('/error', (req, res) => {
  res.render('error');
});

app.listen(port, () => {
  console.log('App listening on port 3001.');
});
