import { SET_ADMIN_LOGIN_STATUS , SET_USER_LOGIN_STATUS } from  '../actions/types';

const initialState = {
    admin_login_status: false,
    user_login_status: false
}

export default( state = initialState, action ) => {
    switch( action.type ){

        case SET_ADMIN_LOGIN_STATUS:
            return {
                ...state,
                admin_login_status: action.payload
            }

        case SET_USER_LOGIN_STATUS:
            return {
                ...state,
                user_login_status: action.payload
            }

        default:
            return state

    }
}