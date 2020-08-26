import axios from "axios";
import firebase from "../lib/fbConfig";
import { userEmailFromLocalStorage } from "../context/contacts/contactsContext";

let storageRef = firebase.storage().ref();

const userEmail = userEmailFromLocalStorage();

const replaceUserImage = async (newImageData, oldImageData) => {
  let desertRef;
  try {
    await axios.put(`user/${userEmail}/image`, {
      newImageData: { ...newImageData },
    });
    if (oldImageData !== undefined && !!oldImageData.name) {
      desertRef = storageRef.child(`photos/${oldImageData.name}`);
      await desertRef.delete();
    }
  } catch (err) {
    throw Error("Sorry something went wrong ", err.message);
  }
};

//upload user image to AWS S3
const uploadUserImage = async (newImage, oldImageData) => {
  // add user email to make user avatar unique
  Object.defineProperties(newImage, {
    name: {
      value: userEmail + newImage.name,
      writable: true,
    },
  });
  const fileRef = storageRef.child(`photos/${newImage.name}`);
  await fileRef.put(newImage, { name: newImage.name });
  const newImageUrl = await fileRef.getDownloadURL();
  const newImageData = {
    url: newImageUrl,
    name: newImage.name,
  };
  await replaceUserImage(newImageData, oldImageData);
};

export default uploadUserImage;
