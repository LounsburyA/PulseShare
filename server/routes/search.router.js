const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:user', rejectUnauthenticated, (req, res) => {
    console.log('user is:', req.params.user);
    const user = `${req.params.user}%`;
    console.log(user);
    
    
    if (req.user.access_level === 2) {
    const query = `SELECT * FROM "user"
    WHERE LOWER ("username") LIKE $1
    ORDER BY "access_level" DESC, LOWER ("username");`;
    const values = [user];
    pool.query(query, values)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR SEARCHING FOR USER IN ROUTER', err);
            res.sendStatus(500)
        })
    }
});

module.exports = router;