/* eslint-disable */
import React, { useEffect, useReducer } from "react";
import { createContext, useState } from 'react';
import { ControlStateR, } from "../UseReducer/ControlForm";
export const AppContext = createContext();
import loadLocalStorageItems from "../utils/loadLocalStorageItems";
import { CART_ITEMS_LOCAL_STORAGE_KEY } from "../components/Constants";
import { ControlJson } from "../UseReducer/ControlJson";
import { ControlCheckout } from "../UseReducer/ControlCheckout";
export const Provider = ({ children }) => {
    const initialstate = {
        personalDetail: {
            fullName: '',
            email: '',
            phoneNumber: '',
        },
        address: {
            country: '',
            region: '',
            city: '',
            direction: '',
            postalcode: ''
        },
        paypal: {
            paypalemail: ''
        },
        creditCard: {
            cardHolder: '',
            cardNumber: '',
            expireDate: '',
            cvc: '',
            conditions: ''
        }
    }

    const initialCartState = (
        loadLocalStorageItems(CART_ITEMS_LOCAL_STORAGE_KEY, [])
    )

    const initialFormState = {
        personalDetailForm: false,
        billingDetailForm: false,
        paymentDetailForm: false,
        orderConfirmForm: false
    }

    const [formState, dispatchForm] = useReducer(ControlCheckout, initialFormState)

    const [stateR, dispatchR] = useReducer(ControlStateR, initialstate)

    const [cartItems, dispatchCart] = useReducer(ControlJson, initialCartState)

    const checkForm = (typeForm, data) =>{
        console.log(typeForm, data);
        dispatchForm({
            type: typeForm,
            payload: data
        })
    }



    const PersonalData = (data) => {
        dispatchR({
            type: 'PERSONALDATA',
            payload: data
        })
    }

    const AddressData = (data) => {
        dispatchR({
            type: 'ADDRESSDATA',
            payload: data
        })
    }

    const PaymentData = (data) => {
        dispatchR({
            type: 'PAYMENTDATA',
            payload: data
        })
    }

    const GetCartItems = (data) => {
        dispatchCart({
            type: 'CART_ITEM',
            payload: data
        })

    }



    return (
        <AppContext.Provider value={{
            stateR,
            PersonalData,
            AddressData,
            PaymentData,
            GetCartItems,
            formState,
            checkForm
        }}>
            {children}
        </AppContext.Provider>
    );
}


