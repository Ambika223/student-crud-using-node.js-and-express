const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", getSingleStudent);
router.post("/", createStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;