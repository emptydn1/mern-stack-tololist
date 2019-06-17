import axios from 'axios';

export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `http://localhost:4000${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}