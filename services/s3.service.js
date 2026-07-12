const {PutObjectCommand} = require("@aws-sdk/client-s3");
const s3Client = require("../config/aws");

async function uploadPDF(buffer, fileName) {
    const key = `pdf/${fileName}`
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: "application/pdf"
    });
    await s3Client.send(command);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

module.exports = uploadPDF;