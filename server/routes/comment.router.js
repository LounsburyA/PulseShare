const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//GET Route
router.get('/:id', (req, res) => {
  console.log('/comment GET route GOOD!');
  console.log('is authenticated?');


  const queryText = `SELECT "user".username, "profiles".profile_picture, "comments".id, to_char("comments".date, 'mm/dd/yy') as "date", 
    to_char("comments".time, 'hh12:mi AM') as "time", "comments".image,"comments".video, "comments".comment, "comments".user_id FROM "comments"
    JOIN "user" ON "comments".user_id = "user".id
    JOIN "profiles" ON "user".id = "profiles".user_id
    WHERE "comments".post_id = $1
    ORDER BY "comments".id ASC;`;

  const values = [req.params.id]

  pool.query(queryText, values).then((result) => {
    console.log('results', result.rows)
    res.send(result.rows);
    // res.sendStatus(200)// For testing only, can be removed
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });

});


//POST Route
router.post('/', (req, res) => {
  // endpoint functionality

  //req.user.id is the currently logged in user's id: 
  //this is NOT sent on params, it is on the server
  const queryValues = [req.user.id, req.body.post_id, req.body.comment, req.body.image, req.body.video]

  const queryText = `
    INSERT INTO "comments" 
    ("user_id", "post_id", "comment", "image", "video")
    VALUES ($1, $2, $3, $4, $5)`;

  console.log(req.body);

  pool
    .query(queryText, queryValues)
    .then(() => { res.sendStatus(201) })
    .catch((err) => {
      console.log('error posting item', err);
      res.sendStatus(500);
    });
});

//PUT ROUTE
router.put('/:id', rejectUnauthenticated, (req, res) => {


  const update = req.body.comment;
  console.log(update);
  const query = `UPDATE "comments" SET  "comment" = $1 WHERE "comments".user_id = $2 AND "comments".id = $3;`;

  const values = [update, req.user.id, req.params.id]
  pool.query(query, values)
    .then(result => {
      res.sendStatus(200);
    }).catch(error => {
      console.log('error', error);

    })

});

// DELETE ROUTE selected post
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality

  if (req.user.access_level >= 1) {

    const queryText = `DELETE FROM "comments" WHERE "id" = $1;`

    const values = [req.params.id];
    pool.query(queryText, values)
      .then((response) => {
        console.log('Deleted')
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error in DELETE:', error);
        res.sendStatus(500);
      });

  } else {
    const queryText = `DELETE FROM "comments"
                      WHERE id = $1 AND user_id = $2;`
    const values = [req.params.id, req.user.id];
    pool.query(queryText, values)
      .then((response) => {
        console.log('Deleted')
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error in DELETE:', error);
        res.sendStatus(500);
      });
  }});

module.exports = router;