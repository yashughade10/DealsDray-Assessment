import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import employeeService from '../api/employeeServices';
import Navbar from './Navbar';

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: [], // Updated state to handle array of courses
        img: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await employeeService.getEmployeeById(id);
                const fetchedEmployee = response.data;
                setEmployee(fetchedEmployee);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Handle checkbox inputs
            let updatedCourse = [...employee.course];

            if (checked) {
                updatedCourse.push(value);
            } else {
                updatedCourse = updatedCourse.filter(course => course !== value);
            }

            setEmployee({
                ...employee,
                course: updatedCourse
            });
        } else {
            // Handle text, email, dropdown, and radio inputs
            setEmployee({
                ...employee,
                [name]: value
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setEmployee({
            ...employee,
            img: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await employeeService.updateEmployee(id, employee);
            navigate('/employees');
        } catch (error) {
            setError('Error updating employee details');
            console.error(error);
        }
    };

    const handleBack = () => {
        navigate('/employees');
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 mt-20">
                <h2 className="text-2xl font-bold mb-4 ">Update Employee</h2>
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto shadow-lg p-6 mb-20">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNo">Mobile No</label>
                        <input
                            type="text"
                            name="mobileNo"
                            value={employee.mobileNo}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">Designation</label>
                        <select
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <div className="flex">
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={employee.gender === 'M'}
                                    onChange={handleChange}
                                    className="mr-1"
                                    required
                                />
                                M
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={employee.gender === 'F'}
                                    onChange={handleChange}
                                    className="mr-1"
                                    required
                                />
                                F
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Course</label>
                        <div>
                            <label className="mr-4">
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="MCA"
                                    checked={employee.course.includes('MCA')}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                MCA
                            </label>
                            <label className="mr-4">
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="BCA"
                                    checked={employee.course.includes('BCA')}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                BCA
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="course"
                                    value="BSC"
                                    checked={employee.course.includes('BSC')}
                                    onChange={handleChange}
                                    className="mr-1"
                                />
                                BSC
                            </label>
                        </div>
                        {/* Display courses as comma-separated string */}
                        <div className="mt-2">
                            Selected Courses: {employee.course.join(', ')}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">Image</label>
                        <input
                            type="file"
                            name="img"
                            accept="image/jpeg, image/png"
                            onChange={handleFileChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Update
                        </button>
                        <button type="button" onClick={handleBack} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateEmployee;
