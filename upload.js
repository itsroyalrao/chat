require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");
const { join } = require("path");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

const putObject = (filename, contentType) => {
  const fileContent = fs.readFileSync(join(__dirname, "uploads", filename));
  const params = {
    Bucket: bucketName,
    Key: `uploads/${filename}`,
    Body: fileContent,
    ContentType: contentType,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File uploaded successfully", data.Location);
    }
  });
};

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

async function getObject(key) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

module.exports = { putObject, getObject };
