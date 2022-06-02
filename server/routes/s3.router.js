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


// creates URL for images
router.get('/image', rejectUnauthenticated, async (req, res) => {
    let mediaType = '.jpeg';
    const url = await generateUploadURL(mediaType);
    res.send({url})
});

// creates URL for videos
router.get('/video', rejectUnauthenticated, async (req, res) => {
    let mediaType = '.mp4';
    const url = await generateUploadURL(mediaType);
    res.send({url})
});

// not currently being used, needs to by front end
router.put('/', async (req, res) => {
    // url path that is stored on database can be assigned to objectToDelete and should delete object from AWS
    // example below
    let objectToDelete = "https://spinal-stim-forum-test-bucket.s3.us-east-2.amazonaws.com/aef7d4d6cda8ad8a.jpeg"
    objectToDelete = objectToDelete.split('.com/')[1];
    const response = await objectDeleter(objectToDelete);
    res.send(response);
})

module.exports = router;
