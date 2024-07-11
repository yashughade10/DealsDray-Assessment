import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1/employee';

const employeeService = {
    getAllEmployees: async () => {
        const response = await axios.get(`${API_BASE_URL}/employees`);
        return response.data;
    },
    getEmployeeById: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
        return response.data;
    },
    createEmployee: async (employeeData) => {
        const response = await axios.post(`${API_BASE_URL}/employees`, employeeData);
        return response.data;
    },
    updateEmployee: async (id, employeeData) => {
        const response = await axios.put(`${API_BASE_URL}/employees/${id}`, employeeData);
        return response.data;
    },
    deleteEmployee: async (id) => {
        await axios.delete(`${API_BASE_URL}/employees/${id}`);
    }
};

export default employeeService;
