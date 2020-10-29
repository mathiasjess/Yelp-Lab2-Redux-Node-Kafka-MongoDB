import { SET_YELPCUSTOMER, UPDATE_YELPCUSTOMERPROFILE, LOGOUT_YELPCUSTOMERPROFILE, USER_FOLLOWERS } from '../actions/customerAction'

export const customerInitialState = {
    _id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    DOB: '',
    location: '',
    city: '',
    state: '',
    country: '',
    nickName: '',
    phoneNumber: '',
    yelpingSince: '',
    thingsILove: '',
    findmeIn: '',
    websiteDetails: '',
    profileImage: '',
    favourites: '',
    headline: '',
    zipcode: '',
    followers:[]
}

const customerReducer = ((state = customerInitialState, action) => {
    switch (action.type) {
        case 'SET_YELPCUSTOMER':
            return Object.assign(state, action.payload)
        case 'UPDATE_YELPCUSTOMERPROFILE':
            return Object.assign(state, action.payload)
        case 'LOGOUT_YELPCUSTOMERPROFILE':
            return Object.assign(state, customerInitialState)
        case USER_FOLLOWERS:
            let userfollowed = action.payload
            return {
                ...state,
                followers: [...state.followers, userfollowed]
            }
        default: return state
    }
})

export default customerReducer;