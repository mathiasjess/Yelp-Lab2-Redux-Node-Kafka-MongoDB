export const SET_CART = 'SET_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const ADD_ITEM= 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const DELETE_CART ='DELETE_CART'


export function setCart(data){
    return{
        type: SET_CART,
         payload : data }
}
export function addToCart(data){
    return{
        type: ADD_TO_CART,
         payload : data }
}
export function addItem(id){
    return{
        type : ADD_ITEM,
        payload: id}
}
export function removeItem(id){
    return{
        type : REMOVE_ITEM,
        payload: id}
}
export function removecart(){
    return{
        type : DELETE_CART}
}