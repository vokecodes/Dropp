import React, { useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Item from "./Item";
import axios from "axios";
import List from "./List";
import { Images } from "../config/images";

const ShoppingList = ({ setShowShoppingList }) => {
  const [selectedList, setSelectedList] = useState("my");
  const [userLists, setUserLists] = useState(null);
  const [listName, setListName] = useState("");
  const [listNameError, setListNameError] = useState();
  const [items, setItems] = useState([]);
  const [localItem, setLocalItem] = useState(null);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [showAddAItem, setShowAddAItem] = useState(false);
  const [listId, setListId] = useState("");

  const itemSchema = Yup.object().shape({
    name: Yup.string().min(3).required("Name is required."),
    quantity: Yup.number().min(1).required("Quantity is required."),
    measurement: Yup.string().min(1).required("Measurement is required."),
  });

  const handleSelectList = (list) => setSelectedList(list);

  const handleAddItemToList = (values) => {
    const local = [...items];
    local.push(values);
    setItems(local);
  };

  const handleDeleteItem = (item) => {
    const local = [...items];
    let index = local.indexOf(item);
    local.splice(index, 1);
    setItems(local);
    if (local.length <= 0 && selectedList === "my") {
      handleDeleteList();
    }
  };

  const handleEditItem = (item) => {
    handleDeleteItem(item);
    setLocalItem(item);
    setShowAddAItem(true);
  };

  const getUserLists = () => {
    const result = sessionStorage.getItem("auth");
    const { token, data } = JSON.parse(result);

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/user/shopper/${data?.user?._id}/lists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        setUserLists(data.lists);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (!userLists) getUserLists();
  }, [userLists]);

  const handleSaveList = () => {
    if (!listName) {
      setListNameError("List name can not be empty.");
    }
    if (items?.length <= 0) return;

    setIsSaveLoading(true);
    const result = sessionStorage.getItem("auth");
    const { token, data } = JSON.parse(result);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shoppingList/shopper/${data?.user?._id}`,
        { name: listName, items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        alert("List saved.");
        handleSelectList("my");
        getUserLists();
      })
      .catch((error) => {})
      .finally(() => {
        setListName();
        setItems([]);
        setIsSaveLoading(false);
      });
  };

  const handleShareList = () => {
    if (!listName) {
      setListNameError("List name can not be empty.");
      return;
    }
    if (items?.length <= 0) return;

    setIsShareLoading(true);

    const result = sessionStorage.getItem("auth");
    const { token, data } = JSON.parse(result);

    let text = "";
    for (let i = 0; i < items.length; i++) {
      if (i === items.length - 1) {
        text +=
          items[i].name +
          " " +
          items[i].quantity +
          " " +
          items[i].measurement +
          "";
      } else {
        text +=
          items[i].name +
          " " +
          items[i].quantity +
          " " +
          items[i].measurement +
          ", ";
      }
    }

    const body = {
      shopperFirstName: data.user.firstName,
      shopperLastName: data.user.lastName,
      shopperAddress: data.user.address,
      shopperList: listName + " " + text,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/dropper/order`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        const whatsAppLink = `https://wa.me/+2349061494881?text=Yo ! I’d love to schedule a Dropp for  ${listName} shopping list. Items are ${text}. Thanks!`;
        window.open(whatsAppLink);
      })
      .catch((error) => {})
      .finally(() => {
        handleSelectList("my");
        getUserLists();
        setOpenList("");
        setListId("");
        setListName("");
        setItems([]);
        setIsShareLoading(false);
      });
  };

  const handleUpdateList = () => {
    if (items?.length <= 0) return;

    setIsSaveLoading(true);
    const result = sessionStorage.getItem("auth");
    const { token, data } = JSON.parse(result);

    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/shoppingList/${listId}/shopper/${data?.user?._id}`,
        { name: listName, items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        alert("List updated.");
        getUserLists();
      })
      .catch((error) => {})
      .finally(() => {
        setOpenList("");
        setListId("");
        setListName("");
        setItems([]);
        setIsSaveLoading(false);
      });
  };

  const handleDeleteList = () => {
    const result = sessionStorage.getItem("auth");
    const { token, data } = JSON.parse(result);

    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/shoppingList/${listId}/shopper/${data?.user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        alert("List deleted.");
        getUserLists();
      })
      .catch((error) => {})
      .finally(() => {
        setOpenList("");
        setListId("");
        setListName("");
        setItems([]);
      });
  };

  return (
    <div>
      <div
        className="flex flex-row items-center mb-3 cursor-pointer"
        onClick={() => setShowShoppingList(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000"
          class="w-12 h-12"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <h5 className="ml-2 text-lg font_medium text-black">Back</h5>
      </div>
      <div className="mb-3">
        <div>
          <h2 className="text-xl lg:text-2xl text-black font_bold absolute p-4 lg:p-12">
            Create, save or share <br />
            your shopping list.
          </h2>
          <img src={Images.shoppingBanner} alt="shoppingBanner" />
        </div>
      </div>
      <div className="bg_shopping p-4 lg:p-8 rounded-3xl shadow-sm mb-10 lg:mb-0">
        <div className="lg:flex items-center">
          <div className="flex-1">
            <h2 className="text-xl font_bold">My Shopping list</h2>
          </div>
          <div className="flex bg_list p-2 rounded-full mt-2 lg:mt-0">
            <button
              className={`h-8 w-1/2 lg:w-32 rounded-full text-xs font_normal font-bold ${
                selectedList === "create" && "bg_yellow"
              }`}
              onClick={() => handleSelectList("create")}
            >
              Create a new list
            </button>
            <button
              className={`h-8 w-1/2 lg:w-32 rounded-full text-xs font_normal font-bold ${
                selectedList === "my" && "bg_yellow"
              } `}
              onClick={() => handleSelectList("my")}
            >
              My list
            </button>
          </div>
        </div>

        <div className="my-8">
          {selectedList === "create" && (
            <div className="bg-white p-3 lg:p-6 rounded-2xl">
              {/* <h1 className="text-xl text-center gray_title font_medium">
              List name
            </h1> */}
              <div className="mb-3">
                <input
                  type="text"
                  name="listName"
                  placeholder="List name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="block w-full shadow-sm bg-transparent outline-none item_input text-center text-lg font_bold"
                />
                {listNameError && (
                  <span className="text-sm text-red-500">{listNameError}</span>
                )}
              </div>
              <div className="my-10">
                {items?.map((item, i) => (
                  <Item
                    key={i}
                    name={item?.name}
                    handleEdit={() => handleEditItem(item)}
                    handleDelete={() => handleDeleteItem(item)}
                  />
                ))}

                <div className="my-5 item_br rounded-3xl px-4 py-6">
                  <Formik
                    initialValues={{
                      name: localItem?.name || "",
                      quantity: localItem?.quantity || "",
                      measurement: localItem?.measurement || "",
                    }}
                    validationSchema={itemSchema}
                    enableReinitialize
                    onSubmit={(values, formikBag) => {
                      handleAddItemToList(values, formikBag);
                      setLocalItem(null);
                      formikBag.resetForm();
                    }}
                  >
                    {(props) => (
                      <Form onSubmit={props.handleSubmit}>
                        <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                          >
                            Item name
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className="block w-full shadow-sm bg-transparent outline-none item_input font_regular"
                          />
                          <ErrorMessage
                            name="name"
                            component="span"
                            className="text-red-500 font_regular"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                          >
                            Quantity
                          </label>
                          <Field
                            type="number"
                            name="quantity"
                            className="block w-full shadow-sm bg-transparent outline-none item_input font_regular"
                          />
                          <ErrorMessage
                            name="quantity"
                            component="span"
                            className="text-red-500 font_regular"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="measurement"
                            className="block text-sm font-medium text-gray-700 mb-1 font_regular"
                          >
                            Measurement
                          </label>
                          <Field
                            type="text"
                            name="measurement"
                            className="block w-full shadow-sm bg-transparent outline-none item_input font_regular"
                          />
                          <ErrorMessage
                            name="measurement"
                            component="span"
                            className="text-red-500 font_regular"
                          />
                          <span className="text-sm helper_text font_regular">
                            E.g Pieces, kg, packs, bags.
                          </span>
                        </div>
                        <div className="mt-5 text-center">
                          <button
                            type="submit"
                            className="h-8 w-full lg:w-72 rounded-full text-xs font_normal font-bold bg_yellow"
                          >
                            Add
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>

              <div className="lg:flex">
                <button
                  className="w-full lg:w-32 h-14 flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-lg text-center text_save_list font_medium bg_save_list mr-10"
                  disabled={isSaveLoading}
                  onClick={handleSaveList}
                >
                  {isSaveLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#fff"
                        strokeWidth="4"
                      ></circle>
                      <path
                        fill="#888888"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Save list"
                  )}
                </button>
                <button
                  className="mt-3 lg:mt-0 w-full h-14 lg:w-96 flex justify-center items-center py-3 border border-transparent rounded-xl shadow-sm text-sm lg:text-lg text-center text-white font_bold bg_primary"
                  disabled={isShareLoading}
                  onClick={handleShareList}
                >
                  {isShareLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#fff"
                        strokeWidth="4"
                      ></circle>
                      <path
                        fill="#888888"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Share with a Dropper On Whatsapp"
                  )}
                </button>
              </div>
            </div>
          )}

          {selectedList === "my" && (
            <>
              {userLists?.length > 0 &&
                userLists?.map((list, i) => (
                  <List
                    key={i}
                    name={list?.name}
                    items={list?.items}
                    open={openList === list?._id}
                    setOpen={() => {
                      if (openList === list?._id) {
                        setOpenList("");
                        setItems([]);
                        setListName("");
                        setListId("");
                      } else {
                        setOpenList(list?._id);
                        setListName(list?.name);
                        setItems(list?.items);
                        setListId(list?._id);
                      }
                    }}
                    itemSchema={itemSchema}
                    handleAddItemToList={handleAddItemToList}
                    handleEditItem={handleEditItem}
                    handleDeleteItem={handleDeleteItem}
                    localItem={localItem}
                    localItems={items}
                    setLocalItem={setLocalItem}
                    showAddAItem={showAddAItem}
                    setShowAddAItem={setShowAddAItem}
                    isSaveLoading={isSaveLoading}
                    handleUpdateList={handleUpdateList}
                    isShareLoading={isShareLoading}
                    handleShareList={handleShareList}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
