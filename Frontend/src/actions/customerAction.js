// export const SET_YELPCUSTOMER = 'SET_YELPCUSTOMER';
// export const UPDATE_YELPCUSTOMERPROFILE = 'UPDATE_YELPCUSTOMERPROFILE';

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
