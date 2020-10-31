export const SET_CHATS = 'SET_CHATS'
export const GET_CHATS = 'GET_CHATS'

export function setChats(data){
    return{
        type: SET_CHATS,
         payload : data }
}
export function getChats(data){
    return{
        type: GET_CHATS,
         payload : data }
}