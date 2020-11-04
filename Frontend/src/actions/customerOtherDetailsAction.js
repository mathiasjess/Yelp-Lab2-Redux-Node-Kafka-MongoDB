export const FETCH_CUSTOMERORDERHISTORY = 'FETCH_CUSTOMERORDERHISTORY';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_OTHERUSERPROFILE = 'FETCH_OTHERUSERPROFILE'

export const customerOrderHistory = (data) =>{
    return {
        type: FETCH_CUSTOMERORDERHISTORY,
        payload : data
    }
}

export const customerReviews = (data) =>{
    return {
        type: FETCH_REVIEWS,
        payload : data
    }
}

export const restaurantEvents = (data) =>{
    return {
        type: FETCH_EVENTS,
        payload : data
    }
}

export const yelpusers = (data) =>{
    return {
        type: FETCH_USERS,
        payload : data
    }
}

export const otheruserprofile = (data) =>{
    return {
        type: FETCH_OTHERUSERPROFILE,
        payload : data
    }
}