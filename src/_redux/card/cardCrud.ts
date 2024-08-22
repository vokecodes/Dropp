import { CARD_URL, COMPANY_URL } from "../urls";
import { SERVER } from "../../config/axios";

export const getCards = () => {
  return SERVER.get(CARD_URL);
};

export const addCard = (data: any) => {
  return SERVER.post(CARD_URL, { ...data });
};

export const deleteCard = (cardId: string) => {
  return SERVER.delete(`${CARD_URL}/${cardId}`);
};

export const defaultCard = (cardId: string) => {
  return SERVER.patch(`${CARD_URL}/default/${cardId}`, { defaultCard: true });
};

export const addCardCompany = (data: any) => {
  return SERVER.post(`${COMPANY_URL}/card`, { ...data });
};

export const getCardsCompany = () => {
  return SERVER.get(`${COMPANY_URL}/card`);
};

export const deleteCardCompany = (cardId: string) => {
  return SERVER.delete(`${COMPANY_URL}/${cardId}/card`);
};

export const defaultCardCompany = (cardId: string) => {
  return SERVER.patch(`${COMPANY_URL}/${cardId}/card`, { defaultCard: true });
};
