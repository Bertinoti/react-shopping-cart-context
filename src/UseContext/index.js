/* eslint-disable */
import React, { useEffect, useReducer } from "react";
import { createContext, useState } from 'react';
import { ControlStateR, } from "../UseReducer";
export const AppContext = createContext();
import { USER_DETAIL } from "../components/Contants";

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
        },

    }

    const [stateR, dispatchR] = useReducer(ControlStateR, initialstate)

    useEffect(() => {
        if(stateR.personalDetail.fullName !== '' ){
            localStorage.setItem( USER_DETAIL , JSON.stringify(stateR))
        }
    }, [stateR])



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


    return (
        <AppContext.Provider value={{
            stateR,
            PersonalData,
            AddressData,
            PaymentData
        }}>
            {children}
        </AppContext.Provider>
    );
}


