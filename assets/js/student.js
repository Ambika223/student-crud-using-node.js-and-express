const cl = console.log;



const PORT = 3000;
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/student', studentRoutes);

module.exports = app;



