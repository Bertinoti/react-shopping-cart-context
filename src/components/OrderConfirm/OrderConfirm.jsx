 /* eslint-disable */
import React, { useContext } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import './style.scss'


import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { cleanCart, getCartTotal, saveOrders } from '../Functions';
import { AppContext } from '../../UseContext';
// import { CART_ITEMS_LOCAL_STORAGE_KEY } from '../Constants';


const OrderConfirm = () => {
    const { ReloadCart, checkForm } =useContext(AppContext);
    const OrderDetail = (JSON.parse(localStorage.getItem('OrderDetail')) || []);
    const Product = JSON.parse(localStorage.getItem('react-sc-state-cart-items'));
    const PersonalDetail = JSON.parse(localStorage.getItem('checkoutData'));

    console.log('product >>>>>>>>>', JSON.parse(localStorage.getItem('react-sc-state-cart-items')))
    // console.log('PD >>>>>>>>>>>>>>', PersonalDetail)

    return (
        <>
            <div className='Order'>
                <h1 className='Center'> Your Order Was Been Accepted </h1>
                {Product.length > 0 ?
                    Product.map((item) => (
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    key={item.id}
                                    component="img"
                                    height="340"
                                    image={item.img} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <h5> Price: {item.price}€ </h5>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )) :
                    <div className="col mb-4">
                        <h4>Your cart is empty</h4>
                    </div>}
            </div><div className='Order'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <h5> Order Detail </h5>
                                <h6> Name: {PersonalDetail.personalDetail.fullName}</h6>
                                <h6> Email: {PersonalDetail.personalDetail.email}</h6>
                                <h6> Address: {PersonalDetail.address.address} </h6>
                                <h6> City : {PersonalDetail.address.city}</h6>
                                <h6> Region: {PersonalDetail.address.region}</h6>
                                <h6> Country: {PersonalDetail.address.country}</h6>
                                <h6> Postal Code: {PersonalDetail.address.postCode}</h6>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <h5> Price: {getCartTotal(Product)}€ </h5>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            <div className='Center'>
                <Button
                    onClick={() => {
                        checkForm('ORDER_CONFIRM', true)
                        cleanCart('react-sc-state-cart-items');
                        saveOrders(Product, PersonalDetail, OrderDetail);
                    }}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/"
                >
                    Back to Home
                </Button>
            </div>
        </>
    )
}

export default OrderConfirm;