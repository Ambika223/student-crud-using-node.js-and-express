const student = require('../data/studentArr');

//GET ALL
const getStudent = (req, res) => {
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
}


//GET single
const getSingleStudent = (req, res) => {
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
}

//CREATE
const createStudent = (req, res) => {
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
}


//UPDATE
const updateStudent = (req, res) => {
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
}

//DELETE
const deleteStudent = (req, res) => {
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
}

module.exports = {
    getStudent,
    getSingleStudent,
    createStudent,
    updateStudent,
    deleteStudent
}