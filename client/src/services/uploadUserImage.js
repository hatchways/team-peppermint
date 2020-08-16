import { uploadFile } from "react-s3";

//upload user image to AWS S3
const uploadUserImage = (files) => {
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: "photos" /* optional */,
    region: "us-east-2",
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY_ID,
  };

  uploadFile(files, config)
    .then((data) => console.log("IMAGE URL", data.location))
    .catch((err) => console.log("ERROR ", err.message));
};

export default uploadUserImage;