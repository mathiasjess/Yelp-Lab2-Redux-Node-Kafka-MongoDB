import restaurantReducer from './restaurantReducer'
import customerReducer from './customerReducer'
import cartReducer from './cartReducer'
import customerOtherDetailsReducer from './customerOtherDetailsReducer'
import {combineReducers} from 'redux'

const allYelpReducers = combineReducers({
    restaurantReducer : restaurantReducer,
    customerReducer : customerReducer,
    cartReducer : cartReducer,
    customerOtherDetailsReducer: customerOtherDetailsReducer

})

export default allYelpReducers;