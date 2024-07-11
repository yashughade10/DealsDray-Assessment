import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/user';

const authService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    },

    login: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    },

    logout: async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/logout`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || error.message);
        }
    }
};

export default authService;
