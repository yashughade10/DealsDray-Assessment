import { Router } from "express";
import { getAllUsers, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

// user register route
router.route("/register").post(registerUser);

// Login api route
router.route("/login").post(loginUser);

// Secure Logout api route
router.route("/logout").post(logoutUser)

// get all users
router.route("/users").get(getAllUsers)


export default router;