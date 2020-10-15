import {SET_YELPCUSTOMER,UPDATE_YELPCUSTOMERPROFILE} from '../actions/customerAction'

export const customerInitialState = {
    id: '',
    username: '',
    email: '',
    password: '', 
    firstName: '',
    lastName: '',
    DOB: '',
    location : '',
    city: '',
    state: '',
    country: '',
    nickName: '',
    phoneNumber : '',
    yelpingSince : '',
    thingsILove : '',
    findmeIn : '',
    websiteDetails : '',
    profileImage : '',
    favourites : '',
    headline : '',
    zipcode: ''
}

const customerReducer = ((state = customerInitialState, action)=>{
    switch(action.type){
        case 'SET_YELPCUSTOMER':
            return Object.assign(state, action.payload)
        case 'UPDATE_YELPCUSTOMERPROFILE':
            return Object.assign(state,action.payload)
        default: return state
    }
})

export default customerReducer;