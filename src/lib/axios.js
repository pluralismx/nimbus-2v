import Axios from 'axios';

const axios = Axios.create({

    baseURL: "http://localhost/api-nimbus/public/"

});

export default(axios);