const {PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const s3Client = require("../config/aws");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


async function uploadPDF(buffer, fileName) {
    const key = `pdf/${fileName}`
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: "application/pdf"
    });
    await s3Client.send(command);

      const command_n = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command_n, {
    expiresIn: 36000,
  });

  return signedUrl;
    // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

module.exports = uploadPDF;