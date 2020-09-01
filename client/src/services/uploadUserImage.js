import axios from "axios";
import firebase from "../lib/fbConfig";

let storageRef = firebase.storage().ref();

const replaceUserImage = async (newImageData, oldImageData, userEmail) => {
  let desertRef;
  try {
    if (oldImageData !== null) {
      await axios.put(`user/${userEmail}/image`, {
        newImageData: { ...newImageData },
      });
    } else {
      console.log("USER PICTURE FOR MESSAGE FIELD UPLOADED TO FIREBASE...");
    }
    if (
      oldImageData !== null &&
      oldImageData !== undefined &&
      !!oldImageData.name
    ) {
      desertRef = storageRef.child(`photos/${oldImageData.name}`);
      await desertRef.delete();
    }
  } catch (err) {
    throw Error("Oops, something went wrong ", err.message);
  }
};

//upload user image to AWS S3
const uploadUserImage = async (newImage, oldImageData, userEmail) => {
  // add user email to make user avatar unique
  Object.defineProperties(newImage, {
    name: {
      value: userEmail + newImage.name,
      writable: true,
    },
  });

  let fileRef;

  if (oldImageData === null) {
    fileRef = storageRef.child(`user-images/${newImage.name}`);
  } else {
    fileRef = storageRef.child(`photos/${newImage.name}`);
  }

  await fileRef.put(newImage, { name: newImage.name });
  const newImageUrl = await fileRef.getDownloadURL();
  const newImageData = {
    url: newImageUrl,
    name: newImage.name,
  };
  await replaceUserImage(newImageData, oldImageData, userEmail);
  return newImageData;
};

export default uploadUserImage;
