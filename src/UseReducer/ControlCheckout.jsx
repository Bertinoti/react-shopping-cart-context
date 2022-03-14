
export const ControlCheckout = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'PERSONAL_DETAIL':
            return {
                ...state,
                personalDetailForm: payload
            }
        case 'BILLING_DETAIL':
            return {
                ...state,
                billingDetailForm: payload
            }
        case 'PAYMENT_DETAIL':
            return {
                ...state,
                paymentDetailForm: payload
            }
        case 'ORDER_CONFIRM':
            return {
                ...state,
                orderConfirmForm: payload
            }
        default:
            return state
    }
}
