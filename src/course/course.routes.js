const express = require("express");
const courseController = require("./course.controller");
const authMiddleware = require("../auth/auth.middleware");

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", authMiddleware, courseController.createCourse);
router.put("/:id", authMiddleware, courseController.updateCourse);
router.delete("/:id", authMiddleware, courseController.deleteCourse);

module.exports = router;
