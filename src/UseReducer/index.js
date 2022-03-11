

export const ControlStateR = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'PERSONALDATA':
            return {
                ...state,
                personalDetail: payload
            }
        case 'ADDRESSDATA':
            return {
                ...state,
                address: payload
            }
            case 'PAYMENTDATA':
                return {
                    ...state,
                    creditCard: payload
                }

        default:
            return state
    }
}

