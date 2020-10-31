import { SET_CHATS, GET_CHATS} from '../actions/ChatActions'

export const chatInitialState = {
    chathistory:[]
}

const chatReducer = ((state = chatInitialState, action) => {
    switch (action.type) {
        case SET_CHATS:
            let newchat = action.payload
            return {
                ...state,
                chathistory: [...state.chathistory, newchat]
            }
        case GET_CHATS:
            let chathist = action.payload
            return {
                ...state,
                chathistory:chathist
            }
        default: return state
    }
})

export default chatReducer