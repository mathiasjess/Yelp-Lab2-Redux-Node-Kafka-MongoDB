export const REGISTER_RESTAURANTOWNERPROFILE = 'REGISTER_RESTAURANTOWNERPROFILE';
export const SET_RESTAURANTUSER = 'SET_RESTAURANTUSER';
export const UPDATE_RESTAURANTOWNERPROFILE = 'UPDATE_RESTAURANTOWNERPROFILE';
export const ADD_EVENTS = 'ADD_EVENTS';
export const ADD_DISH = 'ADD_DISH';
export const ADD_REVIEWS = 'ADD_REVIEWS'
export const LOGOUT_RESTAURANTOWNERPROFILE = 'LOGOUT_RESTAURANTOWNERPROFILE';

export function registerRestaurant(data){
    return {
        type: REGISTER_RESTAURANTOWNERPROFILE,
        payload : data
    }
}
export function restaurantLogin(data){
    return {
        type: SET_RESTAURANTUSER,
        payload : data
    }
}

export function restaurantProfileUpdate(data){
    return {
        type: UPDATE_RESTAURANTOWNERPROFILE,
        payload : data
    }
}

export function restaurantEventAdd(data){
    return {
        type: ADD_EVENTS,
        payload : data
    }
}

export function restaurantDishAdd(data){
    return {
        type: ADD_DISH,
        payload : data
    }
}

export function restaurantReviewAdd(data){
    return {
        type: ADD_REVIEWS,
        payload : data
    }
}

export function restaurantProfileLogout(data){
    return {
        type: LOGOUT_RESTAURANTOWNERPROFILE,
        payload : data
    }
}