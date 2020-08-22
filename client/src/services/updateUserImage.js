import axios from "axios";

const updateUserImage = async (userEmail, imageUrl) => {
  try {
    const msg = await axios.put(`user/${userEmail}/image`, {
      data: {
        imageUrl,
      },
    });
  } catch (err) {
    throw Error("Sorry something went wrong ", err.message);
  }
};

export default updateUserImage;
