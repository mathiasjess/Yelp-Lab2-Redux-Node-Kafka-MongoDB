export const REGISTER_RESTAURANTOWNERPROFILE = 'REGISTER_RESTAURANTOWNERPROFILE';
export const SET_RESTAURANTUSER = 'SET_RESTAURANTUSER';
export const UPDATE_RESTAURANTOWNERPROFILE = 'UPDATE_RESTAURANTOWNERPROFILE';
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

export function restaurantProfileLogout(data){
    return {
        type: LOGOUT_RESTAURANTOWNERPROFILE,
        payload : data
    }
}