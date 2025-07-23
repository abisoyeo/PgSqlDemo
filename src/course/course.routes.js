const express = require("express");
const courseController = require("./course.controller");
const { authMiddleware, authorizeRole } = require("../auth/auth.middleware");

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);

// Only instructors and admins can create/update/delete
router.post(
  "/",
  authMiddleware,
  authorizeRole("instructor", "admin"),
  courseController.createCourse
);
router.put(
  "/:id",
  authMiddleware,
  authorizeRole("instructor", "admin"),
  courseController.updateCourse
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("instructor", "admin"),
  courseController.deleteCourse
);

module.exports = router;
