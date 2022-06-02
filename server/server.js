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
const s3Router = require('./routes/s3.router');
const keywordRouter = require('./routes/keyword.router');


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
app.use('/api/profile', profileRouter);
app.use('/api/comment', commentRouter);
app.use('/api/roster', rosterRouter);
app.use('/api/post', postRouter);
app.use('/api/history', historyRouter);
app.use('/api/search', searchRouter);
app.use('/api/s3Url', s3Router);
app.use('/api/keyword', keywordRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
