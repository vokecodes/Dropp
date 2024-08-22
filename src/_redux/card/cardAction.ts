import {
  getCards,
  addCard,
  deleteCard,
  defaultCard,
  addCardCompany,
  getCardsCompany,
  deleteCardCompany,
  defaultCardCompany,
} from "./cardCrud";
import { startCall, catchError, getAddDeleteCard } from "./cardSLice";

export const getUserCards = () => (dispatch: any) => {
  dispatch(startCall());
  return getCards()
    .then(({ data }) => {
      dispatch(getAddDeleteCard(data?.card));
    })
    .catch((err) => {
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const addUserCard = (data: any) => (dispatch: any) => {
  dispatch(startCall());
  return addCard(data)
    .then(({ data }) => {
      dispatch(getAddDeleteCard(data?.card));
    })
    .catch((err) => {
      alert("Failed to verify card.");
      const error = err?.response?.data;
      dispatch(catchError({ error: error?.message }));
    });
};

export const deleteUserCard =
  (
    cardId: string,
    setDeleteCard: any,
    closeDeletePaymentModal: any,
    setIDeleteLoading: any
  ) =>
  (dispatch: any) => {
    setIDeleteLoading(true);
    return deleteCard(cardId)
      .then(({ data }) => {
        dispatch(getAddDeleteCard(data?.card));
        closeDeletePaymentModal();
        setDeleteCard();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      })
      .finally(() => {
        setIDeleteLoading(false);
      });
  };

export const defaultUserCard =
  (cardId: string, setSelectedCard: any) => (dispatch: any) => {
    dispatch(startCall());
    return defaultCard(cardId)
      .then(({ data }) => {
        dispatch(getAddDeleteCard(data?.card));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      })
      .finally(() => setSelectedCard());
  };

export const addCompanyCard = (data: any) => (dispatch: any) => {
  dispatch(startCall());
  console.log("data1= ", data);
  return addCardCompany(data)
    .then(({ data }) => {
      dispatch(getAddDeleteCard(data?.card));
    })
    .catch((err) => {
      alert("Failed to verify card.");
      const error = err?.response?.data;
      dispatch(catchError({ error: error.message }));
    });
};

export const getCompanyCards = () => (dispatch: any) => {
  dispatch(startCall());
  return getCardsCompany()
    .then(({ data }) => {
      dispatch(getAddDeleteCard(data?.card));
    })
    .catch((err) => {
      const error = err?.response?.data;
      console.log("err=comp=", error.message);
      dispatch(catchError({ error: error.message }));
    });
};

export const deleteCompanyCard =
  (
    cardId: string,
    setDeleteCard: any,
    closeDeletePaymentModal: any,
    setIDeleteLoading: any
  ) =>
  (dispatch: any) => {
    setIDeleteLoading(true);
    return deleteCardCompany(cardId)
      .then(({ data }) => {
        dispatch(getAddDeleteCard(data?.card));
        closeDeletePaymentModal();
        setDeleteCard();
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error.message }));
      })
      .finally(() => {
        setIDeleteLoading(false);
      });
  };

export const defaultCompanyCard =
  (cardId: string, setSelectedCard: any) => (dispatch: any) => {
    dispatch(startCall());
    return defaultCardCompany(cardId)
      .then(({ data }) => {
        dispatch(getAddDeleteCard(data?.card));
      })
      .catch((err) => {
        const error = err?.response?.data;
        dispatch(catchError({ error: error?.message }));
      })
      .finally(() => setSelectedCard());
  };
