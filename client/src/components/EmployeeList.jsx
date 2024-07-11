import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../api/employeeServices';
import Navbar from './Navbar';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await employeeService.getAllEmployees();
                if (Array.isArray(response.data)) {
                    const employeesWithFormattedDate = response.data.map(employee => ({
                        ...employee,
                        createdAt: new Date(employee.createdAt).toLocaleDateString(),
                        shortId: employee._id.slice(-4),
                        fullId: employee._id,
                        course: employee.course.join(', ') // Convert array to comma-separated string
                    }));
                    setEmployees(employeesWithFormattedDate);
                } else {
                    console.error('getAllEmployees did not return an array:', response);
                }
            } catch (error) {
                console.error('Error fetching employees', error);
            }
        };

        fetchEmployees();
    }, []);

    const getAllKeys = () => {
        return ['Unique Id', 'Image', 'Name', 'Email', 'Mobile No', 'Designation', 'Gender', 'Course', 'Create date', 'Action'];
    };

    const handleDeleteEmployee = async (fullId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this employee?');
        if (isConfirmed) {
            try {
                await employeeService.deleteEmployee(fullId);
                console.log(`Deleted employee with ID: ${fullId}`);
                const response = await employeeService.getAllEmployees();
                if (Array.isArray(response.data)) {
                    const employeesWithFormattedDate = response.data.map(employee => ({
                        ...employee,
                        createdAt: new Date(employee.createdAt).toLocaleDateString(),
                        shortId: employee._id.slice(-4),
                        fullId: employee._id,
                        course: employee.course.join(', ') // Convert array to comma-separated string
                    }));
                    setEmployees(employeesWithFormattedDate);
                }
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const handleEditEmployee = (fullId) => {
        navigate(`/update-details/${fullId}`);
    };

    const handleCreateEmployee = () => {
        navigate('/create-employee');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEmployees = employees.filter(employee => {
        const term = searchTerm.toLowerCase();
        return (
            employee.name.toLowerCase().includes(term) ||
            employee.email.toLowerCase().includes(term) ||
            employee.mobileNo.includes(term)
        );
    });

    return (
        <>
            <Navbar />
            <div className="overflow-x-auto mt-20 px-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Employee List</h1>
                    <div className="flex space-x-4 items-center">
                        <button
                            onClick={handleCreateEmployee}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Create Employee
                        </button>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <div className="text-gray-700 font-bold">
                            Total Employees: {filteredEmployees.length}
                        </div>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            {getAllKeys().map((key, index) => (
                                <th key={index} className="py-2 px-4 border border-gray-300">{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="py-2 px-4 border border-gray-300">{employee.shortId}</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    <img src={employee.img} alt={employee.name} className="h-20 w-20 object-cover rounded-sm" />
                                </td>
                                <td className="py-2 px-4 border border-gray-300">{employee.name}</td>
                                <td className="py-2 px-4 border border-gray-300">{employee.email}</td>
                                <td className="py-2 px-4 border border-gray-300">{employee.mobileNo}</td>
                                <td className="py-2 px-4 border border-gray-300">{employee.designation}</td>
                                <td className="py-2 px-4 border border-gray-300">{employee.gender}</td>
                                <td className="py-2 px-4 border border-gray-300">{employee.course}</td>
                                <td className="py-2 px-4 border border-gray-300">{employee.createdAt}</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    <button
                                        onClick={() => handleEditEmployee(employee.fullId)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteEmployee(employee.fullId)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EmployeeList;
