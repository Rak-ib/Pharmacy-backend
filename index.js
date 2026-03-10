const express = require('express');

const connectDB = require('./configs/db');
const cors = require('cors');

require('dotenv').config(); 
const app = express();
const port = 3000;  
corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});