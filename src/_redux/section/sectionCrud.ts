import { RESTAURANT_SECTION_URL, SUB_CHEF_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getRestaurantSection = () => {
  return SERVER.get(RESTAURANT_SECTION_URL);
};

export const addRestaurantSection = (data: any) => {
  return SERVER.post(RESTAURANT_SECTION_URL, { ...data });
};

export const deleteRestaurantSection = (sectionId: string) => {
  return SERVER.delete(`${RESTAURANT_SECTION_URL}/${sectionId}`);
};

export const getSubChefRestaurantSection = () => {
  return SERVER.get(`${SUB_CHEF_URL}/restaurant-section`);
};

export const addSubChefRestaurantSection = (data: any) => {
  return SERVER.post(`${SUB_CHEF_URL}/restaurant-section`, { ...data });
};

export const deleteSubChefRestaurantSection = (sectionId: string) => {
  return SERVER.delete(`${SUB_CHEF_URL}/restaurant-section/${sectionId}`);
};
