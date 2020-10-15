import restaurantReducer from './restaurantReducer'
import customerReducer from './customerReducer'
import cartReducer from './cartReducer'
import {combineReducers} from 'redux'

const allYelpReducers = combineReducers({
    restaurantReducer : restaurantReducer,
    customerReducer : customerReducer,
    cartReducer : cartReducer
})

export default allYelpReducers;