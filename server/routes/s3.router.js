const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    generateUploadURL,
    objectDeleter
} = require('../s3')
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');



router.get('/image', rejectUnauthenticated, async (req, res) => {
    // GET route code here
    let mediaType = '.jpeg';
    const url = await generateUploadURL(mediaType);
    res.send({url})
});

router.get('/video', rejectUnauthenticated, async (req, res) => {
    // GET route code here
    let mediaType = '.mp4';
    const url = await generateUploadURL(mediaType);
    res.send({url})
});

router.put('/', async (req, res) => {
    // let objectToDelete = req.body.image.split('.com/')[1];
    let objectToDelete = "https://spinal-stim-forum-test-bucket.s3.us-east-2.amazonaws.com/aef7d4d6cda8ad8a.jpeg"
    objectToDelete = objectToDelete.split('.com/')[1];
    const response = await objectDeleter(objectToDelete);
    res.send(response);
})

module.exports = router;
