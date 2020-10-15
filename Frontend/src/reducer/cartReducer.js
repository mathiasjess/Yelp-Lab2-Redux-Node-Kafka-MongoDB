import {ADD_TO_CART,ADD_ITEM, REMOVE_ITEM, DELETE_CART} from '../actions/cartActions'

export const cartInitialState = {
   addedItems : [],
   total : 0
}


const cartReducer = (state = cartInitialState, action)=>{

    if(action.type === ADD_TO_CART){
        let addedItem = action.payload
        let existed_item = state.addedItems.find(item=>item.itemID === action.payload.itemID)
        if(existed_item){
            addedItem.quantity = addedItem.quantity + 1
        let newaddedItems = state.addedItems.map((item)=>{
                if(item.itemID === addedItem.itemID){
                    item.quantity = item.quantity+1
                }
                return item
            })
            console.log("newAdded",newaddedItems)
            return{
                ...state,
                total : state.total + addedItem.price,
                addedItems : newaddedItems
            }
        }
        else{
            addedItem.quantity = 1
            let newTotal = state.total + addedItem.price
            return{
                ...state,
                addedItems: [...state.addedItems,addedItem],
                total: newTotal
            }
        }
    }
    if(action.type === ADD_ITEM){
        let addedItem = state.addedItems.find(item=> item.itemID === action.payload) 
        let newaddedItems = state.addedItems.map((item)=>{
            if(item.itemID === addedItem.itemID){
                item.quantity = item.quantity+1
            }
            return item
        })
        console.log("newAdded",newaddedItems)
        return{
            ...state,
            total : state.total + addedItem.price,
            addedItems : newaddedItems
        }
    }
    if(action.type === REMOVE_ITEM){
        let addedItem = state.addedItems.find(item=> item.itemID === action.payload) 
        let newaddedItems = state.addedItems.map((item)=>{
            if(item.itemID === addedItem.itemID){
                item.quantity = item.quantity-1
            }
            return item
        })
        console.log("newremoved",newaddedItems)
        return{
            ...state,
            total : state.total - addedItem.price,
            addedItems : newaddedItems
        }
    }
    if(action.type === DELETE_CART){
        return{
            ...state,
            total:0,
            addedItems : []
        }
    }
    
    else{
        return state
    }
}

export default cartReducer;