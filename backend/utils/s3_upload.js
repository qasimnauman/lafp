import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const bucketName = process.env.AWS_BUCKET_NAME;

export const uploadToS3 = async (filePath, key, mimetype) => {
  const fileStream = fs.createReadStream(filePath);

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
    ContentType: mimetype,
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    console.log("Successfully uploaded data to S3", data);
    console.log("File uploaded to S3:", key);

    await fs.promises.unlink(filePath);

    const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return url;
  } catch (err) {
    console.error("Error uploading data to S3", err);
    throw new Error("S3 upload failed");
  }
};
