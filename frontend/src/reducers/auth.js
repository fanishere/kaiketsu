const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true,
    user: null,
    errors: {},
};

function auth(state=initialState, action) {
    console.log(action);
    switch(action.type) {
        case 'USER_LOADING':
            return {...state, isLoading: true};
        case 'REGISTRATION_SUCCESSFUL':
            localStorage.setItem("token", action.user.token);
            return {...state, ...action.user, isAuthenticated:true, isLoading: false, errors:null};
        case 'LOGIN_SUCCESSFUL':
            localStorage.setItem("token", action.user.token);
            return {...state, ...action.user, isAuthenticated:true, isLoading: false, errors:null};

        default:
            return state;
    }
}

export default auth;