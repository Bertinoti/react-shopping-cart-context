import { ORDER_DETAIL } from "../Contants";


export const getCartTotal = (cart) => {
    return cart.reduce((accum, item) => {
        return accum + item.price * item.quantity;
    }, 0);
}

export const cleanCart = (name) => {
    localStorage.setItem(name, [])
}

export const saveOrders = (products, userDetail, orderList) => {

    console.log(orderList)

    const order = {
        productDetail: products,
        UserDetail: userDetail
    }

    cleanCart(ORDER_DETAIL)
    console.log(order)

    orderList.push(order)
    console.log(orderList)

    localStorage.setItem(ORDER_DETAIL, JSON.stringify(orderList))
}