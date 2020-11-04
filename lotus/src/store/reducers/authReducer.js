const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state, 
                authError: 'login failed'
            }
        case 'LOGIN_SUCCESSFUL':
            console.log('login successful')
            return {
                ...state,
                authError: null
            }
        case 'LOGOUT_SUCCESSFUL':
            console.log('signout successful');
            return state;
        case 'SIGNUP_SUCCESSFUL':
            console.log('signup successful');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}
export default authReducer;