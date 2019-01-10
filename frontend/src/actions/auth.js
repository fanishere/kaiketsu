const axios = require('axios');


export const login = (username, password) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
        
      return axios({
        url: `${process.env.REACT_APP_API_URL}/api/login/`,
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            headers: headers
        }).then(res => {
        
        if (res.status === 200) {
            dispatch({type: 'LOGIN_SUCCESSFUL', user: res.data});
            return res.data;
        }

        }).catch(error => {
            dispatch({type: 'AUTHENTICATION_ERROR', data: error});
            throw error
        });

    }
}

export const register = (username, first_name, email, password) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
        
      return axios({
        url: `${process.env.REACT_APP_API_URL}/api/register/`,
            method: 'POST',
            data: {
                username: username,
                first_name: first_name,
                email: email,
                password: password,

            },
            headers: headers
        }).then(res => {
        if (res.status === 200) {
            dispatch({type: 'REGISTRATION_SUCCESSFUL', user: res.data});
            return res.data;

        }

        }).catch(error => {
            dispatch({type: 'AUTHENTICATION_ERROR', data: error});
            throw error
        });

    }
}
