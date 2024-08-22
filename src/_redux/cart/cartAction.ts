import { addItems, clearItems, selectChef } from "./cartSLice";

export const addToCart = (data: any) => (dispatch: any) => {
  dispatch(addItems(data));
};

export const clearCart = () => (dispatch: any) => {
  dispatch(clearItems());
};

export const addCartChef = (data: any) => (dispatch: any) => {
  dispatch(selectChef(data));
};
