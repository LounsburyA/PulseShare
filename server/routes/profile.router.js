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
// get specific users profile information for profile page
router.get('/:id', (req, res) => {
  const query = `SELECT * FROM "profiles" WHERE "user_id" =$1;`

  pool.query(query, [req.params.id])
    .then((results) => res.send(results.rows))
    .catch((err) => {
      console.log('Error in PROFILE GET', err);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
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

router.put('/:id', rejectUnauthenticated, (req, res) => {


  const update = req.body
  const query = `UPDATE "profiles" SET  "profile_picture" = $1, "device" = $2, "device_settings" = $3,
  "injury_level" = $4, "aisa_level" = $5, "time_since_injury" = $6, "baseline" = $7,
  "improvements" = $8,"location" = $9,"job_title" = $10,"company" = $11,"about_me" = $12,
  "contact" = $13,"biological_gender" = $14,"age" = $15,"pronouns" = $16,"height" = $17,
  "weight" = $18,  "medical_conditions" = $19, "public" = $20 WHERE "id" = $21;`;

  const values = [update.profile_picture, update.device, update.device_settings, update.injury_level, update.aisa_level,
  update.time_since_injury, update.baseline, update.improvements, update.location, update.job_title, update.company, update.about_me,
  update.contact, update.biological_gender, update.age, update.pronouns, update.height, update.weight, update.medical_conditions,update.public, req.user.id]
  pool.query(query, values)
    .then(result => {
      res.sendStatus(200);
    }).catch(error => {
      console.log('error', error);

    })

});

module.exports = router;