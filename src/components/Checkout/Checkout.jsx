import React from 'react'
import AppHeaderCheckOut from '../AppHeaderCheckOut';
// import Billing from '../Billing/Billing';
import Footer from '../Footer';
import Payment from '../Payment';
// import PersonalDetail from '../PersonalDetail.jsx/PersonalDetail';

const Checkout = () => {
    return(
        <>
            <AppHeaderCheckOut/>
            {/* <PersonalDetail/> */}
            {/* <Billing/> */}
            <Payment/>
            <Footer/>
        </>
    )
};

export default Checkout;