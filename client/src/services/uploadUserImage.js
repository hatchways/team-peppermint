import axios from "axios";
import { userEmailFromLocalStorage } from "../context/contacts/contactsContext";

const { uploadFile, deleteFile } = require("react-s3");

const userEmail = userEmailFromLocalStorage();

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "photos",
  region: "us-west-2",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY_ID,
};

const replaceUserImage = async (newImageUrl, oldImage) => {
  try {
    axios.put(`user/${userEmail}/image`, {
      data: { newImageUrl },
    });
    await deleteFile(oldImage.split("/").pop(), config);
  } catch (err) {
    throw Error("Sorry something went wrong ", err.message);
  }
};

//upload user image to AWS S3
const uploadUserImage = async (newImage, oldImage) => {
  // add user email to make user avatar unique
  Object.defineProperties(newImage, {
    name: {
      value: userEmail + newImage.name,
      writable: true,
    },
  });
  await uploadFile(newImage, config)
    .then((data) => replaceUserImage(data.location, oldImage))
    .catch((err) => console.log("ERROR ", err.message));
};

export default uploadUserImage;
