const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// if Admin, get a list of all the users
router.get('/', rejectUnauthenticated, (req, res) => {

    if (req.user.access_level === 2) {
        const query = `SELECT "id", "username", "access_level" FROM "user"
    ORDER BY "access_level" DESC, LOWER ("username");`;
        pool.query(query)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log('ERROR GETTING ROSTER IN ROUTER', err);
                res.sendStatus(500)
            })
    }
});

// if Admin, set user access level to 1 to grant Moderator status
router.put('/promote', rejectUnauthenticated, (req, res) => {

    if (req.user.access_level === 2) {
        const query = `UPDATE "user" SET "access_level" = 1
    WHERE "id" = $1;`;
        const values = [req.body.id];
        pool.query(query, values)
            .then(result => {
                res.sendStatus(201);
            })
            .catch(err => {
                console.log('ERROR PROMOTING USER IN ROUTER', err);
                res.sendStatus(500)
            })
    }
});

// if Admin, set user access level to 0 to remove Moderator status
router.put('/demote', rejectUnauthenticated, (req, res) => {

    if (req.user.access_level === 2) {
        const query = `UPDATE "user" SET "access_level" = 0
    WHERE "id" = $1;`;
        const values = [req.body.id];
        pool.query(query, values)
            .then(result => {
                res.sendStatus(201);
            })
            .catch(err => {
                console.log('ERROR DEMOTING USER IN ROUTER', err);
                res.sendStatus(500)
            })
    }
});

// if Admin, delete user account
router.delete('/:id', rejectUnauthenticated, (req, res) => {

    if (req.user.access_level === 2) {
        const query = `DELETE FROM "user" 
    WHERE "id" = $1 AND "access_level" < 2;`;
        const values = [req.params.id];
        pool.query(query, values)
            .then(result => {
                res.sendStatus(201);
            })
            .catch(err => {
                console.log('ERROR DELETING USER IN ROUTER', err);
                res.sendStatus(500)
            })
    }
});

module.exports = router;