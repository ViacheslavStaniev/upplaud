/**
 * @param  {string}  filePath
 * @param  {string}  base64 Data
 * @return {string}  Image S3 Path
 */

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const { AWS_KEY, AWS_SECRET, AWS_REGION, S3_BUCKET, S3_BASE_URL } = process.env;

// Initialize the Amazon Cognito credentials provider
const client = new S3Client({
  region: AWS_REGION,
  credentials: { accessKeyId: AWS_KEY, secretAccessKey: AWS_SECRET },
});

const getS3Path = (key = "") => `${S3_BASE_URL}/${S3_BUCKET}/${key}`;

const uploadImage = async (base64, filePath = "") => {
  // Create an s3 instance
  // Ensure that you POST a base64 data to your server.
  // Let's assume the variable "base64" is one.
  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");

  // Getting the file type, ie: jpeg, png or gif
  const type = base64.split(";")[0].split("/")[1];
  const key = `${filePath}/${new Date().getTime()}.${type}`;

  const params = {
    Key: key,
    Body: base64Data,
    Bucket: S3_BUCKET,
    // ACL: "public-read",
    ContentEncoding: "base64", // required
    ContentType: `image/${type}`, // required. Notice the back ticks
  };

  // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
  // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property

  return new Promise(async (resolve, reject) => {
    try {
      await client.send(new PutObjectCommand(params));
      resolve(key);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteImage = async (key, imageName) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: `${S3_LOCATION}/${key}/${imageName}`, // type is not required
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) reject(err);
      if (data) resolve(imageName);
    });
  });
};

const copyImage = async (oldfile, newfile, inputfolder, targetfolder) => {
  try {
    const copyparams = {
      Bucket: S3_BUCKET,
      Key: `${targetfolder}/${newfile}`,
      CopySource: `${S3_BUCKET}/${inputfolder}/${oldfile}`,
    };

    await s3.copyObject(copyparams).promise();

    return newfile;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.getS3Path = getS3Path;
module.exports.copyImage = copyImage;
module.exports.uploadImage = uploadImage;
module.exports.deleteImage = deleteImage;
