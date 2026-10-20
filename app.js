const router = require("./router/studentRouter")

const express = require('express');
const app = express();

app.use(express.json())

app.use("/api/student", router);

module.exports = app;

