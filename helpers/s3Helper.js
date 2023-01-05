/**
 * @param  {string}  base64 Data
 * @return {string}  Image url
 */

// You can either "yarn add aws-sdk" or "npm i aws-sdk"
const AWS = require("aws-sdk");

// Configure AWS with your access and secret key.
const { S3_POOL_ID, AWS_REGION, S3_BUCKET, S3_SAVE_LOCATION, S3_SAVE_LOCATION_CARD_SORT, S3_SAVE_LOCATION_SURVEY } = process.env;

// Configure AWS to use promise
// AWS.config.setPromisesDependency(require('bluebird'));
AWS.config.update({
  region: AWS_REGION,
  credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId: S3_POOL_ID }),
});

const s3 = new AWS.S3();

const imageUpload = async (base64, key, oldName = null, origin = null) => {
  // Create an s3 instance
  // Ensure that you POST a base64 data to your server.
  // Let's assume the variable "base64" is one.
  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
  // Getting the file type, ie: jpeg, png or gif
  const type = base64.split(";")[0].split("/")[1];
  const imageName = (oldName ? oldName : new Date().getTime()) + "." + type;
  // With this setup, each time your user uploads an image, will be overwritten.
  // To prevent this, use a different Key each time.
  // This won't be needed if they're uploading their avatar, hence the filename, userAvatar.js.
  let originData = S3_SAVE_LOCATION;
  if (origin) {
    if (origin == "card_sort") originData = S3_SAVE_LOCATION_CARD_SORT;
    else if (origin == "survey") originData = S3_SAVE_LOCATION_SURVEY;
    else if (origin == "branding_logo") originData = "account/branding";
  }

  const params = {
    Bucket: S3_BUCKET,
    Key: originData + "/" + key + "/" + imageName, // type is not required
    Body: base64Data,
    // ACL: 'public-read',
    ContentEncoding: "base64", // required
    ContentType: `image/${type}`, // required. Notice the back ticks
  };

  // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
  // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property

  try {
    //   const { Location, Key } = await s3.upload(params).promise();
    return new Promise((resolve, reject) => {
      s3.upload(params, async function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (data) {
          resolve(imageName);
        }
      });
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const imageDelete = async (key, imageName) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: S3_SAVE_LOCATION + "/" + key + "/" + imageName, // type is not required
  };

  try {
    return new Promise((resolve, reject) => {
      s3.deleteObject(params, function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (data) {
          console.log(data, "data");
          resolve(imageName);
        }
      });
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const imageCopy = async (oldfile, newfile, inputfolder, targetfolder) => {
  try {
    const copyparams = {
      Bucket: S3_BUCKET,
      CopySource: S3_BUCKET + "/" + inputfolder + "/" + oldfile,
      Key: targetfolder + "/" + newfile,
    };
    await s3.copyObject(copyparams).promise();
    return newfile;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.imageUpload = imageUpload;
module.exports.imageDelete = imageDelete;
module.exports.imageCopy = imageCopy;
