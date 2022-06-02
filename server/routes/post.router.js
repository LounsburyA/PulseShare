const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route for outcomesList 
router.get('/outcomesList', (req, res) => {
  const queryText = `
        SELECT * FROM "outcomes";
    `;
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('Outcomes GET failed ', err);
      res.sendStatus(500);
    });
});

// GET route for postList using outcome
router.get('/postListByOutcome/:id', (req, res) => {
  const outcomeId = req.params.id
  const queryText = `
    SELECT "user".username, "profiles".profile_picture, "posts".id, to_char("posts".date, 'mm/dd/yy') as "date", 
    to_char("posts".time, 'hh12:mi AM') as "time", "posts".title, "posts".image,"posts".video, "posts".post, 
    "posts".outcome_id, "posts".user_id FROM "posts"
    JOIN "user" ON "posts".user_id = "user".id
    JOIN "profiles" ON "user".id = "profiles".user_id
    WHERE "posts".outcome_id = $1
    ORDER BY "posts".id DESC;
  `;

  const values = [outcomeId];
  pool
    .query(queryText, values)
    .then(result => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('Entire postList GET failed ', err);
      res.sendStatus(500);
    });
});

// GET route for Entire postList 
router.get('/postList', (req, res) => {
  const queryText = `
    SELECT "user".username, "profiles".profile_picture, "posts".id, to_char("posts".date, 'mm/dd/yy') as "date", 
    to_char("posts".time, 'hh12:mi AM') as "time", "posts".title, "posts".image,"posts".video, "posts".post, 
    "posts".outcome_id, "posts".user_id FROM "posts"
    JOIN "user" ON "posts".user_id = "user".id
    JOIN "profiles" ON "user".id = "profiles".user_id
    ORDER BY "posts".id DESC;
  `;
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('Entire postList GET failed ', err);
      res.sendStatus(500);
    });
});

// Get specific post details
router.get('/:id', (req, res) => {
  const query = `
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

// POST route for making a post
router.post('/', rejectUnauthenticated, (req, res) => {

  const queryText = `
    INSERT INTO "posts" ("title", "post", "image", "video", "user_id", "outcome_id")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
  `;

  const values = [
    req.body.postTitle,
    req.body.postBody,
    req.body.postImage,
    req.body.postVideo,
    req.user.id,
    req.body.postTag
  ]

  pool
    .query(queryText, values)
    .then(result => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('Create new post failed: ', err);
      res.sendStatus(500);
    });
});

// Delete selected post
// Can only delete if proper access level or if user id and post id are correct
router.delete('/:id', rejectUnauthenticated, (req, res) => {

  if (req.user.access_level >= 1) {
    const query = `DELETE FROM "posts" WHERE "id" = $1;`

    pool.query(query, [req.params.id])
      .then(result => {
        res.sendStatus(204);
      }).catch(err => {
        console.log('Error in deleting post', err);
      })
  } else {
    const query = `DELETE FROM "posts" WHERE "id" = $1 AND "user_id" = $2;`

    pool.query(query, [req.params.id, req.user.id])
      .then(result => {
        res.sendStatus(204);
      }).catch(err => {
        console.log('Error in deleting post', err);
      })
  }
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
  
  const update = req.body;
  const query = `
    UPDATE "posts"
    SET "title" = $1, "post" = $2, "image" = $3, "video" = $4, outcome_id = $5
    WHERE "id" = $6;
    `;

  const values = [update.title, update.post, update.image, update.video, update.outcome_id, req.params.id];

  pool.query(query, values)
    .then(result => {
      res.sendStatus(200);
    }).catch(err => {
      console.log('Error in updating post', err);
    })
})

module.exports = router;
