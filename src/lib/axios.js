import Axios from 'axios';

const axios = Axios.create({

    // baseURL: "http://192.168.1.224:8000/"
    baseURL: "https://api.nimbus.pluralis.com.mx/"

});

export default(axios);