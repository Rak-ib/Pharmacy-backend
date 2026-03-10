const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => { 
    try {       
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oylcme6.mongodb.net/Pharmacy?retryWrites=true&w=majority`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with an error code
    }   
};

module.exports = connectDB;

