import axios from 'axios';

export default axios.create({
    // TODO: Switch between prod/dev
    baseURL: 'https://quarantine-api.dev.benlafferty.me'
});
