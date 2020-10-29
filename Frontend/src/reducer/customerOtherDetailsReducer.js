import { FETCH_CUSTOMERORDERHISTORY, FETCH_REVIEWS, FETCH_EVENTS, FETCH_USERS } from '../actions/customerOtherDetailsAction'

export const orderInitialState = {
    ordersummary: [],
    events: [],
    reviews: [],
    yelpusers :[]
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
        case FETCH_EVENTS:
            let events = action.payload
            return {
                ...state,
                events: events
            }
        case FETCH_USERS:
            let allusers = action.payload
            return {
                ...state,
                yelpusers: allusers
            }
        default: return state
    }
})

export default customerOtherDetailsReducer;