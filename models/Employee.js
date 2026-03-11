const { genSalt } = require('bcryptjs');
const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin","Pharmacist","Manager","Salesman","Cashier"]
    },
    salary:{
        type: Number,
        required: true,
        min: 0
    },
    joiningDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    status:{
        type: String,
        required: true,
        enum: ["Active","Inactive"],
        default: "Active"
    },
    avatar: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png"
    },

    password: {
        type: String,
        required: true,
        select: false,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    lastLogin: {
        type: Date,
        default: null
    }

},{timestamps: true}); 

employeeSchema.index({phone: 1});
employeeSchema.index({status: 1});
employeeSchema.index({role: 1});

module.exports = mongoose.model('Employee', employeeSchema);