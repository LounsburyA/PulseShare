const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// import for s3.js - creates url route for aws bucket
const s3 = require('./s3');

// Route includes
const userRouter = require('./routes/user.router');
const profileRouter = require('./routes/profile.router');
const rosterRouter = require('./routes/roster.router');
const postRouter = require('./routes/post.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/profile', profileRouter);
app.use('/api/roster', rosterRouter);
app.use('/post', postRouter);


// GET route for aws bucket url
app.get('/s3Url/image', async (req, res) => {
  const url = await s3();
  res.send({url})
})

app.get('/s3Url/video', async (req, res) => {
  const url = await s3();
  res.send({url})
})

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
