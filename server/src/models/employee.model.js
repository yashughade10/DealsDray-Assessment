import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    mobileNo: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        enum: ['HR', 'Manager', 'Sales']
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F']
    },
    course: {
        type: [String],
        required: true,
        enum: ['MCA', 'BCA', 'BSC']
    },
    img: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

export { Employee };
