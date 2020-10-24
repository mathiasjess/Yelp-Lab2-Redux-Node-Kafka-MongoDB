import { FETCH_CUSTOMERORDERHISTORY, FETCH_REVIEWS } from '../actions/customerOtherDetailsAction'

export const orderInitialState = {
    ordersummary: [],
    registeredevents: [],
    reviews: []
}

const customerOtherDetailsReducer = ((state = orderInitialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMERORDERHISTORY:
            let orders = action.payload
            return {
                ...state,
                ordersummary: orders
            }
        case FETCH_REVIEWS:
            let review = action.payload
            return {
                ...state,
                reviews: review
            }
        default: return state
    }
})

export default customerOtherDetailsReducer;