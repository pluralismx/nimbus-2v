import Axios from 'axios';

const axios = Axios.create({

    baseURL: "http://localhost/api-nimbus-2/"

});

export default(axios);