# MERN Stack Project README

## Project Overview

This project is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It includes functionalities for user authentication, CRUD operations on employee data, and integration with cloud services for image storage.

## Features

- **User Authentication:** Login and signup functionalities with form validations.
- **Employee Management:**
  - View all employees with details (name, email, mobile number, designation, etc.).
  - Create, edit, and delete employee records.
  - Upload employee photos to Cloudinary for storage efficiency.
- **Responsive Design:** Utilizes Tailwind CSS for responsive and modern UI.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cloud Storage:** Cloudinary

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js
- MongoDB
- Git (optional for cloning repository)
- IDE (e.g., Visual Studio Code)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   
2. **Install Dependencies:**
   ```bash
   npm install

### Configuration

1. **Backend Configuration:**
Create a .env file in the root directory of the backend (/server) folder.
Define environment variables such as MongoDB connection string, Cloudinary API key, etc.
Example .env file:
   ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    CLOUDINARY_CLOUD_NAME=your-cloud-name
    CLOUDINARY_API_KEY=your-api-key
    CLOUDINARY_API_SECRET=your-api-secret
   
2. **Frontend Configuration:**
Update necessary configurations in the frontend (/client) if required (usually handled by React environment variables or API URLs).
###Running the Application
1. **Start Backend Server:**
   ```bash
      cd server
      npm start

2. *Start Frontend Development Server:**
   ```bash
      cd client
      npm start

##Usage

Login: Navigate to the login page, enter credentials, and click "Login" to access the application.
Signup: New users can navigate to the signup page, fill in required details, and click "Signup" to create an account.
Employee List: Once logged in, navigate to the employee list page to view, create, edit, or delete employee records.
Logout: Click on the user dropdown in the navbar to access logout functionality.


##Additional Notes

Ensure MongoDB is running locally or adjust the connection string accordingly for a remote database.
Cloudinary API keys are essential for image upload functionality. Replace placeholders with actual keys for production deployment.
