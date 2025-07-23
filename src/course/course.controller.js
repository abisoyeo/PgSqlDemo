const courseService = require("./course.service");
const EventTypes = require("../events/eventTypes");
const Analytics = require("../events/analytics.service");
class CourseController {
  async createCourse(req, res, next) {
    try {
      const result = await courseService.createCourse(
        req.body,
        req.user.userId
      );

      await Analytics.track(
        EventTypes.COURSE_CREATED,
        {
          method: "email",
          email: req.user.email,
        },
        result.userId
      );

      res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: result.course,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCourses(req, res, next) {
    try {
      const courses = await courseService.getAllCourses();
      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req, res, next) {
    try {
      const course = await courseService.getCourseById(req.params.id);
      res.json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCourse(req, res, next) {
    try {
      const course = await courseService.updateCourse(
        req.params.id,
        req.body,
        req.user.userId,
        req.user.role
      );
      res.json({
        success: true,
        message: "Course updated successfully",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCourse(req, res, next) {
    try {
      const result = await courseService.deleteCourse(
        req.params.id,
        req.user.userId,
        req.user.role
      );
      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseController();
