import axios from "axios";
import ISO6391 from 'iso-639-1';
export const translateText = async (text, language) => {
  try {
    const languageCode = ISO6391.getCode(language)
    console.log(languageCode)
    const res = await axios.post(
      `${process.env.REACT_APP_TRANSLATE_URL}/v2?target=${languageCode}&key=${process.env.REACT_APP_API_KEY}&q=${text}`
    );

    return res.data.data.translations[0].translatedText;
  } catch (err) {
    console.log(err)
  }
};
