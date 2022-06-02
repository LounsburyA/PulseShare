const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:keyword', (req, res) => {
    const keyword = `%${req.params.keyword}%`;
    
    const query = `SELECT "user".username, "profiles".profile_picture, 
    "posts".id, to_char("posts".date, 'mm/dd/yy') as "date", 
    to_char("posts".time, 'hh12:mi AM') as "time", "posts".title, 
    "posts".image,"posts".video, "posts".post, 
    "posts".outcome_id, "posts".user_id FROM "posts"
    JOIN "user" ON "posts".user_id = "user".id
    JOIN "profiles" ON "user".id = "profiles".user_id
    JOIN "outcomes" ON "outcomes"."id"="posts"."outcome_id"
    WHERE "posts"."title" ILIKE $1
    OR "posts"."post" ILIKE $1
    OR "outcomes"."outcome" ILIKE $1
    ORDER BY "posts".id DESC;`;
    const values = [keyword];
    pool.query(query, values)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR SEARCHING FOR KEYWORD IN ROUTER', err);
            res.sendStatus(500)
        })
    
});

module.exports = router;