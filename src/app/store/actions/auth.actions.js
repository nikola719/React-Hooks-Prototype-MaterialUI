import { authActionTypes, messageActionTypes } from '../../configs';
import { AuthService, PostService } from '../../services';

const login = (username, password) => (dispatch) => {
    dispatch({type: authActionTypes.LOGIN_REQUEST});
    return AuthService.login(username, password)
    .then(response => {
        dispatch({
            type: authActionTypes.LOGIN_SUCCESS, 
            payload: username
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : response.message
        });
    })
    .catch(error => {
        dispatch({
            type: authActionTypes.LOGIN_FAILURE, 
            payload: error.message
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : error.message
        });
    })
}

const register = (username, password) => (dispatch) => {
    dispatch({type: authActionTypes.REGISTER_REQUEST});
    return AuthService.register(username, password)
    .then(response => {
        dispatch({
            type: authActionTypes.REGISTER_SUCCESS, 
            payload: username
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : response.message
        });
    })
    .catch(error => {
        dispatch({
            type: authActionTypes.REGISTER_FAILURE, 
            payload: error.message
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : error.message
        });
    })
}

const isLoggedIn = () => (dispatch) => {
    dispatch({type: authActionTypes.LOGIN_REQUEST});
    return AuthService.isLoggedIn()
    .then(response => {
        dispatch({
            type: authActionTypes.LOGIN_SUCCESS,
            payload: response.user.username
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : response.message
        });
    })
    .catch(error => {
        dispatch(authActions.logout());
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : error.message
        });
    })
    
}

const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({type: authActionTypes.LOGOUT});
}

export const authActions = {
    register,
    login,
    logout,
    isLoggedIn
}