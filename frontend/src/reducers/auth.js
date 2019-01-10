const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    errors: {},
};

function auth(state=initialState, action) {
    switch(action.type) {
        case 'USER_LOADING':
            return {...state, isLoading: true};
        case 'REGISTRATION_SUCCESSFUL':
            localStorage.setItem("token", action.user.token);
            return {...state, ...action.user, isAuthenticated:true, errors:null};
        case 'LOGIN_SUCCESSFUL':
            localStorage.setItem("token", action.user.token);
            return {...state, ...action.user, isAuthenticated:true, errors:null};
        case 'AUTHENTICATION_ERROR':
            let errors = action.data.response.data;
            return {...state, ...action.user, isAuthenticated:false, errors:errors};

        default:
            return state;
    }
}

export default auth;