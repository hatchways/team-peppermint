import axios from "axios";
import firebase from "../lib/fbConfig";
import { keepTrying } from "./getResizedImageUrl";
const cryptoRandomString = require("crypto-random-string");

let storageRef = firebase.storage().ref();

const replaceUserImage = async (newImageData, oldImageData, userEmail) => {
  let desertRef;
  try {
    await axios.put(`user/${userEmail}/image`, {
      newImageData: { ...newImageData },
    });

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

//upload user image to Firebase Storage
const uploadUserImage = async (newImage, oldImageData, userEmail) => {
  let addedImageUrl = "";
  let fileRef;

  const randomString = cryptoRandomString({ length: 10 });
  // add random string to make user avatar unique
  Object.defineProperties(newImage, {
    name: {
      value: randomString + newImage.name,
      writable: true,
    },
  });

  if (oldImageData === null) {
    fileRef = storageRef.child(`user-images/${newImage.name}`);
  } else {
    fileRef = storageRef.child(`photos/${newImage.name}`);
  }

  await fileRef.put(newImage, { name: newImage.name });
  const newImageUrl = await fileRef.getDownloadURL();

  const resizedImageNameArray = newImage.name.split(".");
  resizedImageNameArray.splice(
    resizedImageNameArray.length - 1,
    0,
    "_200x200."
  );
  const resizedImageName = resizedImageNameArray.join("");
  const resizedImageStorageRef = storageRef.child(`photos/${resizedImageName}`);

  const resizedImageUrl = await keepTrying(10, resizedImageStorageRef);

  if (resizedImageUrl) {
    addedImageUrl = resizedImageUrl;
  } else {
    addedImageUrl = newImageUrl;
  }

  const newImageData = {
    url: addedImageUrl,
    name: resizedImageName,
  };
  await replaceUserImage(newImageData, oldImageData, userEmail);
  return newImageData;
};

export default uploadUserImage;
