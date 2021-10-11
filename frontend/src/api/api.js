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

export const getAllBriefRecipes = (dummy=null) => {
    const requestUrl = '/recipes';
    const params = {
        briefly: 'true',
    };
    return axios.get(requestUrl, { params });
}

export const getAllRecipes = (start, end) => {
    const requestUrl = '/recipes';
    const params = { start, end }
    return axios.get(requestUrl, { params });
}

export const getFavRecipes = (id) => {
    const requestUrl = `/users/${id}/favourites`;
    return axios.get(requestUrl);
}

export const getUserRecipes = (id) => {
    const requestUrl = `/users/${id}/recipes`;
    return axios.get(requestUrl);
}

export const like = (token, userId, recipeId) => {
    const requestUrl = `/users/${userId}/favourites`;
    const headers = buildAuthHeader(token);
    headers["Content-Type"] = "multipart/form-data";
    const bodyFormData = new FormData();
    bodyFormData.append('recipe_id', recipeId);
    return axios.post(requestUrl, bodyFormData, { headers });
}

export const unlike = (token, userId, recipeId) => {
    const requestUrl = `/users/${userId}/favourites`;
    const headers = buildAuthHeader(token);
    const data = {
        recipe_id: recipeId,
    }
    return axios.delete(requestUrl, { headers, data });
}

export const getOneUser = (id) => {
    const requestUrl = `/users/${id}`;
    return axios.get(requestUrl);
}

export const getOneRecipe = (id) => {
    const requestUrl = `/recipes/${id}`;
    return axios.get(requestUrl);
}

export const upload = (token, title, text, image) => {
    const requestUrl = `/recipes`;
    const headers = buildAuthHeader(token);
    headers["Content-Type"] = "multipart/form-data";
    const bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('description', text);
    bodyFormData.append('image', image);
    return axios.post(requestUrl, bodyFormData, { headers });
}