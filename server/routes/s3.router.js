const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const s3Url = require('../s3')
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');



router.get('/image', rejectUnauthenticated, async (req, res) => {
    // GET route code here
    let mediaType = '.jpeg';
    const url = await s3Url(mediaType);
    res.send({url})
});

router.get('/video', rejectUnauthenticated, async (req, res) => {
    // GET route code here
    let mediaType = '.mp4';
    const url = await s3Url(mediaType);
    res.send({url})
});

module.exports = router;
