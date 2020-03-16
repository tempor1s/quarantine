import axios from 'axios';

const BASE_URL =
    process.env.REACT_APP_BASE_URL || 'https://quarantine-api.dev.benlafferty.me';

export default axios.create({
    baseURL: BASE_URL
});
