import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

export default axios.create({
    baseURL: 'https://quarantine-api.dev.benlafferty.me'
});
