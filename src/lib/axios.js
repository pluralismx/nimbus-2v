import Axios from 'axios';

const axios = Axios.create({

    // baseURL: "http://localhost/api-nimbus/public/"
    baseURL: "https://api.nimbus.pluralis.com.mx/"

});

export default(axios);