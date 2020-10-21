import { REGISTER_RESTAURANTOWNERPROFILE, SET_RESTAURANTUSER, UPDATE_RESTAURANTOWNERPROFILE, ADD_EVENTS, ADD_DISH, LOGOUT_RESTAURANTOWNERPROFILE } from '../actions/restaurantAction';


export const restaurantInitialState = {
    _id: '',
    restaurantName: '',
    email: '',
    password: '',
    description: '',
    contact: '',
    location: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    restaurantImage: '',
    timings: '',
    curbPickup: false,
    dineIn: false,
    yelpDelivery: false,
    latitude: '',
    longitude: '',
    menuItem: [],
    events: [],
    reviews: [],
    orders: []
}

const restaurantReducer = ((state = restaurantInitialState, action) => {
    switch (action.type) {
        case REGISTER_RESTAURANTOWNERPROFILE:
            return Object.assign(state, action.payload)
        case SET_RESTAURANTUSER:
            return Object.assign(state, action.payload)
        case UPDATE_RESTAURANTOWNERPROFILE:
            return Object.assign(state, action.payload)
        case LOGOUT_RESTAURANTOWNERPROFILE:
            return Object.assign(state, action.payload)
        case ADD_EVENTS:
            let addevents = action.payload
            return {
                ...state,
                events: [...state.events, addevents]
            }
        case ADD_DISH:
            let addDish = action.payload
            return {
                ...state,
                menuItem: [...state.menuItem, addDish]
            }
        default: return state
    }
})

export default restaurantReducer;