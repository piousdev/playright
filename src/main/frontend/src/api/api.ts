import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:1000/api/users',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default API;