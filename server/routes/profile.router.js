const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/',(req, res) => {
  // POST route code here
    const id = req.body.id

    const queryText = `INSERT INTO "profiles" (user_id)
        VALUES ($1)`;
    pool
        .query(queryText, [id])
        .then(result => {
        res.sendStatus(201)
        })
        .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
        });
});

module.exports = router;