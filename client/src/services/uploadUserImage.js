import axios from "axios";
import { userEmailFromLocalStorage } from "../context/contacts/contactsContext";

const { uploadFile } = require("react-s3");

const userEmail = userEmailFromLocalStorage();

const replaceUserImage = (imageUrl) => {
  try {
    axios.put(`user/${userEmail}/image`, {
      data: {
        imageUrl,
      },
    });
  } catch (err) {
    throw Error("Sorry something went wrong ", err.message);
  }
};

//upload user image to AWS S3
const uploadUserImage = async (file) => {
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
      value: userEmail + file.name,
      writable: true,
    },
  });

  await uploadFile(file, config)
    .then((data) => replaceUserImage(data.location))
    .catch((err) => console.log("ERROR ", err.message));
};

export default uploadUserImage;
