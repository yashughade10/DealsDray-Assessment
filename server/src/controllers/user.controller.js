import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"


// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { email, username, name, password } = req.body;
    console.log(email, username, name, password);

    // Validate/check whether user entered all data or not
    if ([email, username, name, password].some((field) => {
        field?.trim() === ""
    })) {
        throw new ApiError(400, "All fields are required")
    }

    // Check whether user already exists or not
    const isUserExist = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (isUserExist) {
        throw new ApiError(409, "Email or username entered is already existed")
    }

    // Create user
    const user = await User.create({
        email,
        username,
        name,
        password
    })

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            createdUser,
            "User registerd successfully"
        )
    )
})

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "Email or username is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(400, "User does not exists")
    }

    const validatePassword = await user.isPasswordCorrect(password)

    if (!validatePassword) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const loggedInUserData = await User.findById(user._id).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user: loggedInUserData
            },
            "User logged in successfully"
        ))

})

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User logged out"))
})

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    if (!users) {
        throw new ApiError(404, "No users found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users retrieved successfully"
        )
    );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers
}