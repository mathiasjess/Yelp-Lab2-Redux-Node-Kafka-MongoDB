export const SET_YELPCUSTOMER = 'SET_YELPCUSTOMER';
export const UPDATE_YELPCUSTOMERPROFILE = 'UPDATE_YELPCUSTOMERPROFILE';
export const FETCH_CUSTOMERORDERHISTORY = 'FETCH_CUSTOMERORDERHISTORY';
export const LOGOUT_YELPCUSTOMERPROFILE = 'LOGOUT_YELPCUSTOMERPROFILE'
export const USER_FOLLOWERS = 'USER_FOLLOWERS';
export const customerLogin = (data) =>{
    return {
        type: 'SET_YELPCUSTOMER',
        payload : data
    }
}

export const customerProfileUpdate = (data) =>{
    return {
        type: 'UPDATE_YELPCUSTOMERPROFILE',
        payload : data
    }
}
export const customerProfileLogout = () =>{
    return {
        type: 'LOGOUT_YELPCUSTOMERPROFILE'
    }
}
export const userfollowers = () =>{
    return {
        type: 'USER_FOLLOWERS'
    }
}
