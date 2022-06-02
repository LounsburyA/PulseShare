const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const profileRouter = require('./routes/profile.router');
const commentRouter = require('./routes/comment.router')
const rosterRouter = require('./routes/roster.router');
const postRouter = require('./routes/post.router');
const historyRouter = require('./routes/history.router');
const searchRouter = require('./routes/search.router');
const s3Router = require('./routes/s3.router')


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
app.use('/comment', commentRouter);
app.use('/api/roster', rosterRouter);
app.use('/post', postRouter);
app.use('/history', historyRouter);
app.use('/search', searchRouter);
app.use('/s3Url', s3Router);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
