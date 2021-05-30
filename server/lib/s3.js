const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const { cropImage, resizeImage, blurImage } = require("./file");
require("dotenv").config();

const {
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY
} = process.env;

const s3 = new S3({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
});

// uploads a file to s3
async function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: AWS_BUCKET_NAME
  }

  return s3.getObject(downloadParams).createReadStream()
}

exports.getFileStream = getFileStream


function deleteObject(key) {
  const Params = {
    Bucket: AWS_BUCKET_NAME,
    Key: key
  }

  return s3.deleteObject(Params).promise();
}

exports.deleteObject = deleteObject