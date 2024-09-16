import axios from "axios";
import Compressor from "compressorjs";
import { CLOUDINARY_URL } from "../_redux/urls";

export const HandleImageUpload = async (
  file: any,
  setIsLoading: any,
  setFieldValue?: any,
  fieldValue?: any
) => {
  new Compressor(file, {
    quality: 0.8,
    convertSize: 1,
    // convertTypes: "image/png",

    // The compression process is asynchronous,
    // which means you have to access the `result` in the `success` hook function.
    async success(result: any) {
      const formData = new FormData();
      formData.append("file", result);
      formData.append(
        "upload_preset",
        `${import.meta.env.VITE_CLOUDINARY_PRESET}`
      );
      setIsLoading(true);
      try {
        const { data } = await axios.post(CLOUDINARY_URL, formData);
        if (data) {
          if (fieldValue) {
            setFieldValue(fieldValue, data.secure_url);
          }
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    error(err) {},
  });
};
