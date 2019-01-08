const axios = require('axios');


export const login = (username, password) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
        
      return axios({
        url: 'http://localhost:8000/api/login/',
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

        } else if (res.status >= 400 && res.status < 500) {
            dispatch({type: 'AUTHENTICATION_ERROR', data: res.data});
            throw res.data;
        }

        });

    }
}

export const register = (username, first_name, email, password) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
        
      return axios({
        url: 'http://localhost:8000/api/register/',
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

        } else if (res.status >= 400 && res.status < 500) {
            dispatch({type: 'AUTHENTICATION_ERROR', data: res.data});
            throw res.data;
        }

        })

    }
}
