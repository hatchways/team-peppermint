const { uploadFile } = require("react-s3");

//upload user image to AWS S3
const uploadUserImage = (file) => {
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: "photos" /* optional */,
    region: "us-west-2",
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY_ID,
  };

  // add user email to make user avatar unique
  Object.defineProperties(file, {
    name: {
      value: "ya@ya.ru" + file.name,
      writable: true,
    },
  });

  uploadFile(file, config)
    .then((data) => console.log("IMAGE URL", data.location))
    .catch((err) => console.log("ERROR ", err.message));
};

export default uploadUserImage;
