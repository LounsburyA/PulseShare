const aws = require('aws-sdk')
const cryptoRandomString = require('crypto-random-string');
const dotenv = require('dotenv')
dotenv.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL(mediaType) {
    const fileName = cryptoRandomString(16); 
    const params = ({
        Bucket: bucketName,
        Key: fileName + mediaType,
        Expires: 60
    })
    console.log(params);
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL;
}

module.exports = generateUploadURL;