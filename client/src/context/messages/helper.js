import axios from "axios";

export const translateText = async (text, language) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_TRANSLATE_URL}/v2?target=${language}&key=${process.env.REACT_APP_API_KEY}&q=${text}`
    );

    console.log(
      "TRANSLATED TEXT ",
      res.data.data.translations[0].translatedText
    );
  } catch (err) {
    console.log("FAILED TO TRANSLATE ", err);
  }
};
