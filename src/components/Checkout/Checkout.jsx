import React from 'react'
import AppHeaderCheckOut from '../AppHeaderCheckOut';
import Billing from '../Billing/Billing';
import Footer from '../Footer';
// import PersonalDetail from '../PersonalDetail.jsx/PersonalDetail';

function Checkout() {
    return(
        <>
            <AppHeaderCheckOut/>
            {/* <PersonalDetail/> */}
            <Billing/>
            <Footer/>
        </>
    )
};

export default Checkout;