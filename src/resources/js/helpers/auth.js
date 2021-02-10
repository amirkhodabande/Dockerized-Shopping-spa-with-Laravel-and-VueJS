import {setAuthorization} from "./general";

export function login(credentials) {
    return new Promise((res, rej) => {

        axios.post('/api/auth/login', credentials)
            .then((response) => {
                setAuthorization(response.data.access_token);
                res(response.data);
            })
            .catch((err) => {
                rej("Wrong email or password");
            });

    })
}

export function register(credentials) {
    return new Promise((res, rej) => {

        axios.post('/api/auth/register', credentials)
            .then((response) => {
                res(response.data);
            })
            .catch((error) => {
                rej("Error");
            })

    })
}

export function getLocalUser() {
    const userStr = localStorage.getItem('user');

    if (!userStr)
        return null

    return JSON.parse(userStr);
}
