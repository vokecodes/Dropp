import { Field, Formik, Form, ErrorMessage } from "formik";
import Item from "./Item";

const List = ({
  name,
  items,
  handleEditItem,
  handleDeleteItem,
  open,
  setOpen,
  localItems,
  localItem,
  itemSchema,
  handleAddItemToList,
  setLocalItem,
  showAddAItem,
  setShowAddAItem,
  isSaveLoading,
  handleUpdateList,
  isShareLoading,
  handleShareList,
}) => {
  return (
    <div className="bg-white rounded-2xl my-3 cursor-pointer">
      <div className="px-6 py-4 flex items-center" onClick={setOpen}>
        <div className="flex-1">
          <p className="text-base font_bold">{name}</p>
          <div className="flex">
            <p className="text-sm font-medium font_normal text_item_light_gray">
              {items?.length > 0 &&
                items.slice(0, 2).map((item, i) => (
                  <span key={i}>
                    {item.name}
                    {items.slice(0, 2).length !== i + 1 && ", "}
                  </span>
                ))}
            </p>
            <button className="bg_shopping h-6 w-16 rounded-full text-xs text_light_orange font_medium">
              +{items?.length - items.slice(0, 2).length} items
            </button>
          </div>
        </div>
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="#918d77"
            strokeWidth={2}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#918d77"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>
      {open && (
        <div className="bg_subList p-6">
          {localItems?.map((item, i) => (
            <Item
              key={i}
              name={item?.name}
              handleEdit={() => handleEditItem(item)}
              handleDelete={() => handleDeleteItem(item)}
            />
          ))}

          {showAddAItem && (
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
                  setShowAddAItem(false);
                }}
              >
                {(props) => (
                  <Form onSubmit={props.handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Item name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="block w-full shadow-sm bg-transparent outline-none item_input"
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className="text-red-500"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Quantity
                      </label>
                      <Field
                        type="number"
                        name="quantity"
                        className="block w-full shadow-sm bg-transparent outline-none item_input"
                      />
                      <ErrorMessage
                        name="quantity"
                        component="span"
                        className="text-red-500"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="measurement"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Measurement
                      </label>
                      <Field
                        type="text"
                        name="measurement"
                        className="block w-full shadow-sm bg-transparent outline-none item_input"
                      />
                      <ErrorMessage
                        name="measurement"
                        component="span"
                        className="text-red-500"
                      />
                      <span className="block text-sm helper_text">
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
          )}
          <div className="mt-5 text-center">
            <button
              type="submit"
              className="h-8 w-full lg:w-96 rounded-full text-xs font_normal font-bold bg_yellow"
              onClick={() => setShowAddAItem(true)}
            >
              Add a new item
            </button>
          </div>
          <div className="lg:flex mt-5">
            <button
              className="w-full lg:w-36 h-14 flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-lg text-center text_save_list font_medium bg_save_list mr-10"
              disabled={isSaveLoading}
              onClick={handleUpdateList}
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
                "Update list"
              )}
            </button>
            <button
              className="mt-3 lg:mt-0 w-full h-14 lg:w-96 flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-sm lg:text-lg text-center text-white font_bold bg_primary"
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
    </div>
  );
};

export default List;
