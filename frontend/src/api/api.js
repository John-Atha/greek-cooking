import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const buildAuthHeader = (token) => {
    const headers = {
        "Authorization": "Bearer " + token,
    }
    return headers;
}


export const isLogged = (token) => {
    const requestUrl = '/logged';
    const headers = buildAuthHeader(token);
    console.log(requestUrl);
    return axios.get(requestUrl, { headers });
}

export const login = (username, password) => {
    const requestUrl = '/login';
    const bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    return axios.post(requestUrl, bodyFormData, {
        headers: { 
            "Content-Type": "multipart/form-data",
        }
    });
}

export const register = (username, password, confirmation, email) => {
    const requestUrl = '/users';
    const bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    bodyFormData.append('confirmation', confirmation);
    bodyFormData.append('email', email);
    return axios.post(requestUrl, bodyFormData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export const getAllBriefRecipes = () => {
    const requestUrl = '/recipes';
    const params = {
        briefly: 'true',
    };
    return axios.get(requestUrl, { params });
}