const cl = console.log;

const student = [
    {
        "id": "1",
        "name": "Rahul Sharma",
        "age": 21,
        "email": "rahul@gmail.com",
        "course": "Full Stack Development",
        "city": "Pune",
        "isActive": true
    },
    {
        "id": "2",
        "name": "Priya Patil",
        "age": 22,
        "email": "priya@gmail.com",
        "course": "Frontend Development",
        "city": "Mumbai",
        "isActive": true
    },
    {
        "id": "3",
        "name": "Amit Deshmukh",
        "age": 23,
        "email": "amit@gmail.com",
        "course": "Backend Development",
        "city": "Nagpur",
        "isActive": false
    },
    {
        "id": "4",
        "name": "Sneha Kulkarni",
        "age": 20,
        "email": "sneha@gmail.com",
        "course": "React.js",
        "city": "Pune",
        "isActive": true
    },
    {
        "id": "5",
        "name": "Rohan Jadhav",
        "age": 24,
        "email": "rohan@gmail.com",
        "course": "Node.js",
        "city": "Nashik",
        "isActive": true
    },
    {
        "id": "6",
        "name": "Neha Joshi",
        "age": 21,
        "email": "neha@gmail.com",
        "course": "Angular",
        "city": "Mumbai",
        "isActive": false
    },
    {
        "id": "7",
        "name": "Karan More",
        "age": 22,
        "email": "karan@gmail.com",
        "course": "JavaScript",
        "city": "Kolhapur",
        "isActive": true
    },
    {
        "id": "8",
        "name": "Pooja Shinde",
        "age": 23,
        "email": "pooja@gmail.com",
        "course": "MERN Stack",
        "city": "Pune",
        "isActive": true
    },
    {
        "id": "9",
        "name": "Vikas Pawar",
        "age": 20,
        "email": "vikas@gmail.com",
        "course": "Python",
        "city": "Solapur",
        "isActive": false
    },
    {
        "id": "10",
        "name": "Anjali Gupta",
        "age": 22,
        "email": "anjali@gmail.com",
        "course": "Java Development",
        "city": "Hyderabad",
        "isActive": true
    }
]

const PORT = 3000;

const express = require('express');
const app = express();
app.use(express.json());


//GET ALL
app.get('/api/student', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: student,
            message: `Student fetched Successfully`,
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching All the student`,
            error: err.message
        })
    }
})


//GET single
app.get('/api/student/:id', (req, res) => {
    try {
        let student_id = req.params.id;
        let body = student.find(std => std.id === student_id);
        if (!body) {
            return res.status(404).json({
                success: false,
                message: `student not found`,
            })
        }
        res.status(200).json({
            success: true,
            data: body,
            message: `student fetched successfully`
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `something went wrong while fetching student`,
            error: err.message
        })
    }
})

//CREATE
app.post('/api/student', (req, res) => {
    try {
        const body = req.body;
        if (!body.name || !body.age) {
            return res.status(400).json({
                success: false,
                message: `Name and age are required`
            })
        }
        let std_obj = {
            name: body.name,
            age: body.age,
            email: body.email,
            course: body.course,
            city: body.city,
            isActive: body.isActive ? true : false,
            id: Date.now().toString()
        }
        student.unshift(std_obj);
        res.status(201).json({
            success: true,
            data: std_obj,
            message: `Student with id ${std_obj.id} created successfully`
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while creating student`,
            error: err.message
        })
    }
})


//UPDATE
app.patch('/api/student/:id', (req, res) => {
    try {
        let update_id = req.params.id;
        let getIndex = student.findIndex(std => std.id === update_id);
        if (getIndex == -1) {
            return res.status(404).json({
                success: false,
                message: `The student with id ${update_id} is not found`
            })
        }

        let updated_std = {
            ...student[getIndex],
            ...req.body,
            id: update_id
        }
        student[getIndex] = updated_std;
        res.status(200).json({
            success: true,
            data: updated_std,
            message: `Student with id ${update_id} updated successfully`
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Somethig went wrong while updating student`,
            error: err.message
        })
    }
})

//DELETE
app.delete('/api/student/:id', (req, res) => {
    try {
        let delete_id = req.params.id;
        let getIndex = student.findIndex(std => std.id === delete_id);
        if (getIndex == -1) {
            return res.status(404).json({
                success: false,
                msg: `The student with id ${delete_id} is not found`
            })
        }
        let delete_std = student.splice(getIndex, 1);
        res.status(200).json({
            success: true,
            msg: `Student with ${delete_id} deleted successfully`,
            data: delete_std[0]
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while removing student with student id ${std_id}`,
            error: err.message
        })
    }
})
app.listen(PORT, () => {
    cl(`Server is running successfully with the port ${PORT}`)
})