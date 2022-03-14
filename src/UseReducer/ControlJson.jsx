
export const ControlJson = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'CART_ITEM':
            return {
                ...state,
                cartItems: payload
            }
        default:
            return state
    }
}
