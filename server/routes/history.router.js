const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route to get user's post history
router.get('/', rejectUnauthenticated, (req, res) => {
    const id = req.user.id;
    const queryText = `
    SELECT "id", to_char("posts".date, 'mm/dd/yy') as "date", 
    to_char("posts".time, 'hh12:mi AM') as "time", 
    "title", "post", "image", "video", "user_id", "outcome_id" FROM "posts" 
    WHERE "user_id" = $1
    ORDER BY "id" DESC;
    `;
    const values = [id];
    pool
        .query(queryText, values)
        .then(result => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log('ERROR GETTING POST HISTORY IN ROUTER', err);
            res.sendStatus(500);
        });
});

module.exports = router;