const cl = console.log;

const app = require('./student');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    cl(`Server is running successfully with the port ${PORT}`);
})