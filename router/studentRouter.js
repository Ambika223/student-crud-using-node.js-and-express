const express = require('express');

const router = express.Router();
const studentController = require("../controller/studentController");

router.get("/", studentController.getStudent);
router.get("/:id", studentController.getSingleStudent);
router.post("/", studentController.createStudent);
router.patch("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;