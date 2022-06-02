const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get specific post details
router.get('/:id', (req, res) => {
  query = `
          SELECT "user".username, "profiles".profile_picture, "posts".id, to_char("posts".date, 'mm/dd/yy') as "date", 
          to_char("posts".time, 'hh12:mi AM') as "time", "posts".title, "posts".image,"posts".video, "posts".post, 
          "posts".outcome_id, "posts".user_id FROM "posts"
          JOIN "user" ON "posts".user_id = "user".id
          JOIN "profiles" ON "user".id = "profiles".user_id
          WHERE "posts".id = $1;
          `;

  pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    }).catch(err => {
      console.log('Error in getting post', err);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;