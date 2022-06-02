const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { user } = require('pg/lib/defaults');




// get specific users profile information for profile page profiles table joined to user table

router.get('/:id', (req, res) => {
  const query = `SELECT "user".username,
  "profiles".id,
  "profiles".profile_picture,
  "profiles".device, 
  "profiles".device_settings,
  "profiles".injury_level,
  "profiles".aisa_level,
  "profiles".time_since_injury,
  "profiles".baseline,
  "profiles".improvements,
  "profiles".location,
  "profiles".job_title,
  "profiles".company,
  "profiles".about_me,
  "profiles".contact,
  "profiles".biological_gender,
  "profiles".age,
  "profiles".pronouns,
  "profiles".height,
  "profiles".weight,
  "profiles".medical_conditions,
  "profiles".public, 
  "profiles".user_id
  FROM "profiles"
  JOIN "user" ON "profiles".user_id = "user".id
  WHERE "profiles".user_id = $1;`
  
  pool.query(query, [req.params.id])
// security check here for user profile information 2 is private, 1 only logged in users can see, 0 public
    .then((results) => {
      if (results.rows[0].public === 0) {
        res.send(results.rows)
      } else if (results.rows[0].public === 1 && req.user.id) {
        res.send(results.rows)
      } else if (results.rows[0].public === 2 && req.user.id === results.rows[0].user_id) {
        res.send(results.rows)
      } else { res.sendStatus(403) }
    })


    .catch((err) => {
      console.log('Error in PROFILE GET', err)
    })

});

router.put('/:id', rejectUnauthenticated, (req, res) => {


  const update = req.body
  const query = `UPDATE "profiles" SET  "profile_picture" = $1, "device" = $2, "device_settings" = $3,
  "injury_level" = $4, "aisa_level" = $5, "time_since_injury" = $6, "baseline" = $7,
  "improvements" = $8,"location" = $9,"job_title" = $10,"company" = $11,"about_me" = $12,
  "contact" = $13,"biological_gender" = $14,"age" = $15,"pronouns" = $16,"height" = $17,
  "weight" = $18,  "medical_conditions" = $19, "public" = $20 WHERE "user_id" = $21;`;

  const values = [update.profile_picture, update.device, update.device_settings, update.injury_level, update.aisa_level,
  update.time_since_injury, update.baseline, update.improvements, update.location, update.job_title, update.company, update.about_me,
  update.contact, update.biological_gender, update.age, update.pronouns, update.height, update.weight, update.medical_conditions, update.public, req.user.id]
  pool.query(query, values)
    .then(result => {
      res.sendStatus(200);
    }).catch(error => {
      console.log('error', error);

    })

});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.user.id;
  console.log('DELETE id:', id);

  const query = `DELETE FROM "user" WHERE id = $1`;
  values = [id];
  pool.query(query, values)
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error in Profile(user) DELETE', err);
      res.sendStatus(500);
    });
});

module.exports = router;