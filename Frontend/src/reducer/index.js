import restaurantReducer from './restaurantReducer'
import customerReducer from './customerReducer'
import cartReducer from './cartReducer'
import customerOtherDetailsReducer from './customerOtherDetailsReducer'
import chatReducer from './ChatReducer'
import {combineReducers} from 'redux'

const allYelpReducers = combineReducers({
    restaurantReducer : restaurantReducer,
    customerReducer : customerReducer,
    cartReducer : cartReducer,
    customerOtherDetailsReducer: customerOtherDetailsReducer,
    chatReducer : chatReducer

})

export default allYelpReducers;