import { SET_USER_LOGIN_STATUS , SET_ADMIN_LOGIN_STATUS } from  './types';
import axios from 'axios';
import { Environment_variable } from '../../utils/constants';
import { stringify } from 'query-string';

// Set Admin Login Status
export const setAdminLoginStatus = () => async ( dispatch ) => {
    dispatch({
        type: SET_ADMIN_LOGIN_STATUS,
        payload: true
    });
}

// Set User Login Status
export const setUserLoginStatus = () => async ( dispatch ) => {
    dispatch({
        type: SET_USER_LOGIN_STATUS,
        payload: true
    });
}

// getAdminLoginStatus
export const getAdminLoginStatus = () => async ( dispatch ) => {
    try {
        let post_body = stringify({})
        let res = await axios.post(
            `${Environment_variable.BackEnd_URL}/api/admin/admin_login_status`,
            post_body,
            Environment_variable.AxiosConfigWithCredential,
          )
        // console.log(res.data.admin_login_status)

        if(res.data.admin_login_status){
            dispatch({
                type: SET_ADMIN_LOGIN_STATUS,
                payload: res.data.admin_login_status
            });
        }
    } catch (err) {
        // console.log(err)
        dispatch({
            type: SET_ADMIN_LOGIN_STATUS,
            payload: false
        });
    }
}

// getUserLoginStatus
export const getUserLoginStatus = () => async ( dispatch ) => {
    try {
        let post_body = stringify({})
        let res = await axios.post(
            `${Environment_variable.BackEnd_URL}/api/user/user_login_status`,
            post_body,
            Environment_variable.AxiosConfigWithCredential,
          )
        // console.log(res.data.user_login_status)

        if(res.data.user_login_status){
            dispatch({
                type: SET_USER_LOGIN_STATUS,
                payload: res.data.user_login_status
            });
        }
    } catch (err) {
        // console.log(err)
        dispatch({
            type: SET_USER_LOGIN_STATUS,
            payload: false
        });
    }
}