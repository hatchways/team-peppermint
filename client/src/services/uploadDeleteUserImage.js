import axios from "axios";
import firebase from "../lib/fbConfig";
import { keepTrying } from "./getResizedImageUrl";
const cryptoRandomString = require("crypto-random-string");

let storageRef = firebase.storage().ref();

const replaceUserImage = async (newImageData, oldImageData, userEmail) => {
  let desertRef;
  try {
    if (oldImageData !== null) {
      await axios.put(`user/${userEmail}/image`, {
        newImageData: { ...newImageData },
      });
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

//upload user image to Firebase Storage
export const uploadUserImage = async (newImage, oldImageData, userEmail) => {
  let addedImageUrl = "";
  let resizedImageName = "";
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

  const resizedImageNameArray = newImage.name.split(".");
  resizedImageNameArray.splice(
    resizedImageNameArray.length - 1,
    0,
    "_200x200."
  );
  resizedImageName = resizedImageNameArray.join("");
  let resizedImageStorageRef;
  if (oldImageData === null) {
    resizedImageStorageRef = storageRef.child(
      `user-images/${resizedImageName}`
    );
    const resizedImageUrl = await keepTrying(10, resizedImageStorageRef);

    addedImageUrl = resizedImageUrl;
  } else {
    resizedImageStorageRef = storageRef.child(`photos/${resizedImageName}`);
    const resizedImageUrl = await keepTrying(10, resizedImageStorageRef);

    addedImageUrl = resizedImageUrl;
  }

  const newImageData = {
    url: addedImageUrl,
    name: resizedImageName,
  };
  await replaceUserImage(newImageData, oldImageData, userEmail);
  return newImageData;
};

export const deleteUserImage = async (imageName) => {
  let fileRef = storageRef.child(`user-images/${imageName}`);
  await fileRef.delete().catch(function (err) {
    console.log("Oops, image failed to be deleted ", err.message);
    new Error(err.message);
  });
};
