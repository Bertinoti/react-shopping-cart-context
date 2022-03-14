/* eslint-disable */
import React, { useContext, useEffect } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom';

import { AppContext } from '../../UseContext';
import AppHeaderCheckOut from '../AppHeaderCheckOut';
import Billing from '../Billing/Billing';
import Footer from '../Footer';
import OrderConfirm from '../OrderConfirm/OrderConfirm';
import Payment from '../Payment';
import PersonalDetail from '../PersonalDetail.jsx/PersonalDetail';

const Checkout = () => {
    const location = useHistory()
    const { id } = useParams();
    const { formState } = useContext(AppContext)

    function callComponent () {
        if(id === 'billingDetail' && formState.personalDetailForm === true){
            return <Billing />
        }else if (id === 'paymentDetail' && formState.billingDetailForm === true){
            return <Payment />
        }else if (id === 'orderConfirm' && formState.paymentDetailForm === true){
            return <OrderConfirm />
        }else{
            <Redirect to='./personalDetail'/>
        }
    }

    

    return (
        <>
            <AppHeaderCheckOut />
            {id === 'personalDetail' && <PersonalDetail />}
            { callComponent() }
            {/* {id === 'billingDetail' &&   <Billing /> }
            {id === 'paymentDetail' && <Payment /> }
            {id === 'orderConfirm' && <OrderConfirm /> } */}

            {/* {id === 'personalDetail' && <PersonalDetail />}
            {(id === 'billingDetail' && formState.personalDetailForm === true) ? <Billing /> : <Redirect to='personalDetail' />}
            {(id === 'paymentDetail' && formState.billingDetailForm === true) ? <Payment /> : <Redirect to='personalDetail' />}
            {(id === 'orderConfirm' && formState.paymentDetailForm === true) ? <OrderConfirm /> : <Redirect to='personalDetail' />} */}


            <Footer />
        </>
    )
};

export default Checkout