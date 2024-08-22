import axios from "axios";
import Compressor from "compressorjs";
import { CLOUDINARY_URL } from "../_redux/urls";

export const HandleMultipleImagesUpload = async (
  files: any,
  setIsLoading: any,
  images?: any,
  setFieldValue?: any,
  fieldValue?: any
) => {
  let multipleImages = images && images?.length > 0 ? [...images] : [];

  for (let index = 0; index < files.length; index++) {
    const element = files[index];

    new Compressor(element, {
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
          `${process.env.REACT_APP_CLOUDINARY_PRESET}`
        );
        setIsLoading(true);
        try {
          const { data } = await axios.post(CLOUDINARY_URL, formData);
          if (data) {
            if (fieldValue) {
              multipleImages.push(data.secure_url);
              setFieldValue(fieldValue, multipleImages);
            }
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      },
      error(err) {},
    });
  }
};
