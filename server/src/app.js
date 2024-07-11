import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));


// Importing user routes here
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);

// Importing employee routes
import employeeRoutes from "./routes/employee.routes.js";
app.use("/api/v1/employee", employeeRoutes);

export { app };