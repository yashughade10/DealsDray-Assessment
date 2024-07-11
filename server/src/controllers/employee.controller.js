import { Employee } from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create employee
const createEmployee = asyncHandler(async (req, res) => {
    upload.single('img')(req, res, async (err) => {
        if (err) {
            return res.status(400).json(new ApiError(400, err.message));
        }

        const { name, email, mobileNo, designation, gender, course } = req.body;
        const imgLocalPath = req.file ? req.file.path : null; // Get image file path

        // Validate/check whether user entered all data or not
        const requiredFields = [name, email, mobileNo, designation, gender];
        if (requiredFields.some(field => !field || field.trim() === '')) {
            throw new ApiError(400, 'All fields are required');
        }

        // Validate course field (should be an array and should not be empty)
        let courses = [];
        if (typeof course === 'string') {
            courses = course.split(',').map(item => item.trim());
        } else if (Array.isArray(course)) {
            courses = course.map(item => item.trim());
        }

        if (courses.length === 0) {
            throw new ApiError(400, 'Course field must be a non-empty array.');
        }

        // Check whether user already exists or not
        const isEmployeeExist = await Employee.findOne({ email });
        if (isEmployeeExist) {
            throw new ApiError(409, 'Email entered is already existed');
        }

        // Upload image on cloudinary
        let imgUrl = '';
        if (imgLocalPath) {
            const uploadResult = await uploadOnCloudinary(imgLocalPath);
            if (uploadResult && uploadResult.url) {
                imgUrl = uploadResult.url;
            } else {
                throw new ApiError(400, 'Failed to upload image');
            }
        } else {
            throw new ApiError(400, 'Image file is required');
        }

        // Create employee
        const employee = await Employee.create({
            name,
            email,
            mobileNo,
            designation,
            gender,
            course: courses, // Assign parsed courses array
            img: imgUrl
        });

        return res.status(201).json(new ApiResponse(201, employee, 'Employee created successfully'));
    });
});


// Get employees
const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find();
    return res.status(200).json(new ApiResponse(200, employees, 'Employees fetched successfully'));
});

// Get employee by ID
const getEmployeeById = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        throw new ApiError(404, 'Employee not found');
    }
    return res.status(200).json(new ApiResponse(200, employee, 'Employee fetched successfully'));
});

// Update employee
const updateEmployee = asyncHandler(async (req, res) => {
    const { name, email, mobileNo, designation, gender, course } = req.body;
    let img = req.file?.path;

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        throw new ApiError(404, 'Employee not found');
    }

    // Update fields only if they are provided in the request body
    if (name) employee.name = name;
    if (email) employee.email = email;
    if (mobileNo) employee.mobileNo = mobileNo;
    if (designation) employee.designation = designation;
    if (gender) employee.gender = gender;
    if (course) employee.course = course;
    if (img) employee.img = img;

    // Save the updated employee record
    const updatedEmployee = await employee.save();

    return res.status(200).json(new ApiResponse(200, updatedEmployee, 'Employee updated successfully'));
});


// Delete employee
const deleteEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
        throw new ApiError(404, 'Employee not found');
    }

    return res.status(200).json(new ApiResponse(200, {}, 'Employee deleted successfully'));
});


export {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};
