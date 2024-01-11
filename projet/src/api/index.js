import axios from "axios";
const apiKey = 'L9n2*1nCzr@P';

const axiosInstance = axios.create({
    baseURL: 'https://morpion-api.edu.netlor.fr',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${apiKey}`
    }
});
export default axiosInstance;
