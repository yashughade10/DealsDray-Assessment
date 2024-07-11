import React, { useContext } from 'react'
import Navbar from './Navbar'
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const {isLoginTrue, setIsLoginTrue} = useContext(UserContext);
    const navigate = useNavigate();

    const goToEmployeeList = () => {
        // Simulate navigation to the employee list page
        alert("Navigating to Employee List...");
        navigate('/employees');
    };

    return (
        <>
            <Navbar />
            {/* Welcome Section for Logged in Admin */}
            {isLoginTrue && (
                <section className="p-6 space-y-4 md:space-y-6 sm:p-8 h-full mt-16 ">
                    <div className="bg-gray-800 shadow rounded-lg p-6">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                            Welcome to the Admin Panel
                        </h1>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
                            Hello, Admin! You can manage your employees here.
                        </p>
                        <button 
                            onClick={goToEmployeeList} 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none  focus:ring-blue-500"
                        >
                            Go to Employee List
                        </button>
                    </div>
                </section>
            )}
        </>
    )
}

export default Home
