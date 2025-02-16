import { Autocomplete, TextField } from '@mui/material'
import Input from "./CustomInput";
import React, { useEffect, useState } from 'react'
import nigeria_state_and_lgas from "../file/nigeria_state_and_lgas.json"
import { DELIVERY_TIME } from '../utils/Globals';
import Button from './Button';
import { SERVER } from '../config/axios';
import { MENU_DELIVERY_URL } from '../_redux/urls';
import { deliveryValues } from '../utils/FormInitialValue';
import { useFormik } from 'formik';
import { DeliveryInputsSchema } from '../utils/ValidationSchema';

const MenuDelivery = ({ 
    deliveryItems,
    getMenuDelivery
 }) => {
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);
    const [deliveryArea, setDeliveryArea] = useState<string[]>([]);
    const [deliveryTime, setDeliveryTime] = useState<string[]>([]);
    const [isLoadingDelivery, setIsLoadingDelivery] = useState(false);

    useEffect(() => {
        const statesJson = nigeria_state_and_lgas.map(item => ({
            'value': item.alias,
            'label': item.state
        }));

        setStates(statesJson);
        setValues({});
        if(deliveryItems){
            setValues(deliveryItems);
            setLgas(nigeria_state_and_lgas.filter(item => item.alias === deliveryItems.delivery_city)[0].lgas)
            setDeliveryTime(deliveryItems.delivery_time)
            setDeliveryArea(deliveryItems.delivery_areas)
        }
    }, []);


    const {
        handleChange,
        handleSubmit,
        values,
        setValues,
        setFieldValue,
        resetForm,
        errors,
        touched,
        dirty,
    } = useFormik({
        initialValues: deliveryItems ? deliveryItems : deliveryValues,
        validationSchema: DeliveryInputsSchema,
        onSubmit: () => {
            if (deliveryItems) {
                handleUpdateDelivery(values);
            } else {
                handleSaveDelivery(values);
            }
        },
    });


    const removeDelivery = (delivery) => {
        setIsLoadingDelivery(true);
        SERVER.delete(`${MENU_DELIVERY_URL}/${delivery._id}`, {...deliveryItems})
          .then(({ data }) => {
            getMenuDelivery();
          })
          .catch((err) => {
            console.log("handleSaveDeliveryE", err);
          })
          .finally(() => setIsLoadingDelivery(false));
    };


    const handleSaveDelivery = (delivery) => {
        setIsLoadingDelivery(true);
        SERVER.post(`${MENU_DELIVERY_URL}`, {...delivery})
          .then(({ data }) => {
            getMenuDelivery();
          })
          .catch((err) => {
            console.log("handleSaveDeliveryE", err);
          })
          .finally(() => {
            resetForm();

            setLgas([])
            setDeliveryArea([]);
            setFieldValue("delivery_areas", []);

            setDeliveryTime([]);
            setFieldValue("delivery_time", []);

            setIsLoadingDelivery(false);
          });
    };
    
    const handleUpdateDelivery = (delivery) => {
        setIsLoadingDelivery(true);
        SERVER.patch(`${MENU_DELIVERY_URL}/${delivery._id}`, {...delivery})
          .then(({ data }) => {
            getMenuDelivery();
          })
          .catch((err) => {
            console.log("handleSaveDeliveryE", err);
          })
          .finally(() => {
            resetForm();
            setIsLoadingDelivery(false)
          });
    };


    return (
        <div className="w-full flex flex-col items-stretch justify-start gap-y-5 p-2 rounded-xl border">
            <Input
                type="dropdown"
                placeholder="Delivery City"
                name="delivery_city"
                onChange={({ target }) => {
                    setLgas(nigeria_state_and_lgas.filter(item => item.alias === target.value)[0].lgas);
                    handleChange({ target });
                }}
                value={values.delivery_city}
                options={states}
                error={errors.delivery_city && touched.delivery_city && errors.delivery_city}
                container="!my-0"
                extraClasses='!pl-4'
                newName="a city"
            />

            <Autocomplete
                multiple
                id="size-small-outlined-multi-area"
                size="small"
                options={lgas}
                value={deliveryArea}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                    setDeliveryArea(newValue);
                    setFieldValue(
                        "delivery_areas", 
                        newValue
                    );
                }}
                renderInput={(params) => (
                <TextField {...params} label="Delivery areas" placeholder="Delivery areas" name='delivery_areas' />
                )}
            />
            {typeof errors.delivery_areas === 'string' && touched.delivery_areas && (
                <p className="text-sm text-center text-red-600 my-2">
                    {errors?.delivery_areas}
                </p>
            )}
            
            <Autocomplete
                multiple
                id="size-small-outlined-multi-time"
                size="small"
                options={DELIVERY_TIME}
                value={deliveryTime}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                    setDeliveryTime(newValue);
                    setFieldValue(
                        "delivery_time", 
                        newValue
                    );
                }}
                renderInput={(params) => (
                <TextField {...params} label="Delivery time" placeholder="Delivery time" name='delivery_time' />
                )}
            />
            {typeof errors.delivery_time === 'string' && touched.delivery_time && (
                <p className="text-sm text-center text-red-600 my-2">
                    {errors.delivery_time}
                </p>
            )}

            <Input
                type="number"
                placeholder={`Delivery fee`}
                name="delivery_fee"
                onChange={handleChange}
                value={values.delivery_fee}
                error={errors.delivery_fee && touched.delivery_fee && errors.delivery_fee}
                container='!my-0'
            />

            {deliveryItems ? (
                <Button
                    title={dirty ? "Update" : "Remove"}
                    loading={isLoadingDelivery}
                    extraClasses="py-4 bg_sec_gray_color !text-black"
                    onClick={() => {
                        if(dirty){
                            handleSubmit();
                        }else{
                            removeDelivery(values);
                        }
                    }}
                />
            ) : (
                <Button
                    title="Save"
                    loading={isLoadingDelivery}
                    onClick={handleSubmit}
                />
            )}
        </div>
    )
}

export default MenuDelivery