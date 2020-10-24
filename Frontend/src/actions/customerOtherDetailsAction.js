export const FETCH_CUSTOMERORDERHISTORY = 'FETCH_CUSTOMERORDERHISTORY';
export const FETCH_REVIEWS = 'FETCH_REVIEWS'

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