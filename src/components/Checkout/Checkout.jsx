import React from 'react'
import { useParams } from 'react-router-dom';
import AppHeaderCheckOut from '../AppHeaderCheckOut';
import Billing from '../Billing/Billing';
import Footer from '../Footer';
import OrderConfirm from '../OrderConfirm/OrderConfirm';
import Payment from '../Payment';
import PersonalDetail from '../PersonalDetail.jsx/PersonalDetail';
// import DateAdapter from '@mui/lab/AdapterDateFns';

const Checkout = () => {
    // useParams
    const { id } = useParams();
    console.log(id);

    return (
        <>
            <AppHeaderCheckOut />
            {id === 'personalDetail' && <PersonalDetail />}
            {id === 'billingDetail' && <Billing />}
            {id === 'paymentDetail' && <Payment />}
            {id === 'orderConfirm' && <OrderConfirm />}

            <Footer />
        </>
    )
};

export default Checkout;