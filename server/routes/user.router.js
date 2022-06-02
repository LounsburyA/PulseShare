const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN');
    
    const queryText = `
                      INSERT INTO "user" (username, password, email)
                      VALUES ($1, $2, $3) RETURNING id;
                      `;

     // Save the result to get returning id
    const result = await connection.query (queryText, [username, password, email]);

   // Set the returned id value
    const userId = result.rows[0].id;
    const profileQuery = `INSERT INTO "profiles" (user_id) VALUES ($1);`;
    await connection.query(profileQuery, [userId]);

    await connection.query('COMMIT');
    res.sendStatus(201);
  } catch (err) {
    await connection.query('ROLLBACK');
    console.log(`Transaction error - rolling back registration`, err);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
