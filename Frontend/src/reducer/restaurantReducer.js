import { REGISTER_RESTAURANTOWNERPROFILE, SET_RESTAURANTUSER, UPDATE_RESTAURANTOWNERPROFILE } from '../actions/restaurantAction';


export const restaurantInitialState = {
    restaurantId: '',
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
    latitude : '',
    longitude : ''
}

const restaurantReducer = ((state = restaurantInitialState, action) => {
    switch (action.type) {
        case 'REGISTER_RESTAURANTOWNERPROFILE':
            return Object.assign(state, action.payload)
        case 'SET_RESTAURANTUSER':
            return Object.assign(state, action.payload)
        case 'UPDATE_RESTAURANTOWNERPROFILE':
            return Object.assign(state, action.payload)
        case 'LOGOUT_RESTAURANTOWNERPROFILE':
            return Object.assign(state, action.payload)
        default: return state
    }
})

export default restaurantReducer;