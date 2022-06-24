import {
    LOGIN_USER, 
    LOGOUT_USER, 
    AUTH_USER, 
    REGISTER_USER,
    MODIFY_USER
} from "../_actions/types"

export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case LOGOUT_USER:
            return {state: {}}
        case AUTH_USER:
            return {...state, userData: action.payload }
        case REGISTER_USER:
            return {...state, register: action.payload}
        case MODIFY_USER:
            return {...state}
        default: return state;
    }
}