import {
  getRestaurantSection,
  addRestaurantSection,
  deleteRestaurantSection,
  getSubChefRestaurantSection,
  addSubChefRestaurantSection,
  deleteSubChefRestaurantSection,
} from "./sectionCrud";
import { startCall, catchError, getAddRestaurantSection } from "./sectionSlice";

export const getSections = () => (dispatch: any) => {
  dispatch(startCall());
  return getRestaurantSection()
    .then(({ data }) => {
      dispatch(getAddRestaurantSection(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchError({ error: error?.message }));
    });
};

export const addSection =
  (data: any, closeOrdersModal: any, resetForm?: any) => (dispatch: any) => {
    dispatch(startCall());
    return addRestaurantSection(data)
      .then(({ data }) => {
        dispatch(getAddRestaurantSection(data?.restaurantSection));
        resetForm();
        closeOrdersModal();
        dispatch(getSections());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const deleteSection = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteRestaurantSection(menuId)
    .then(({ data }) => {
      dispatch(getAddRestaurantSection(data?.restaurantSection));
      dispatch(getSections());
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const subChefGetSections = () => (dispatch: any) => {
  dispatch(startCall());
  return getSubChefRestaurantSection()
    .then(({ data }) => {
      dispatch(getAddRestaurantSection(data?.data));
    })
    .catch((err) => {
      const error = err?.response?.data;

      dispatch(catchError({ error: error?.message }));
    });
};

export const subChefAddSection =
  (data: any, closeOrdersModal: any, resetForm?: any) => (dispatch: any) => {
    dispatch(startCall());
    return addSubChefRestaurantSection(data)
      .then(({ data }) => {
        dispatch(getAddRestaurantSection(data?.restaurantSection));
        resetForm();
        closeOrdersModal();
        dispatch(subChefGetSections());
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      });
  };

export const subChefDeleteSection = (menuId: string) => (dispatch: any) => {
  dispatch(startCall());
  return deleteSubChefRestaurantSection(menuId)
    .then(({ data }) => {
      dispatch(getAddRestaurantSection(data?.restaurantSection));
      dispatch(subChefGetSections());
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};
