const { User, Course } = require("../shared/database");

class CourseService {
  async createCourse(courseData, userId) {
    const course = await Course.create({
      ...courseData,
      userId: userId,
    });

    return {
      course,
      userId,
    };
  }

  async getAllCourses() {
    // If you want a flattened structure
    // const flattened = course.map((course) => {
    //   return {
    //     id: course.id,
    //     title: course.title,
    //     instructorName: course.instructor?.name,
    //     // ...other fields
    //   };
    // });

    return await Course.findAll({
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async getCourseById(id) {
    const course = await Course.findByPk(id, {
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "email"],
        },
      ],
    });

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  }

  async updateCourse(id, courseData, userId, userRole) {
    const course = await Course.findByPk(id);

    if (!course) {
      throw new Error("Course not found");
    }

    const isOwner = course.userId === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      throw new Error("Unauthorized to update this course");
    }

    return await course.update(courseData);
  }

  async deleteCourse(id, userId, userRole) {
    const course = await Course.findByPk(id);

    if (!course) {
      throw new Error("Course not found");
    }

    const isOwner = course.userId === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      throw new Error("Unauthorized to delete this course");
    }

    await course.destroy();
    return { message: "Course deleted successfully" };
  }
}

module.exports = new CourseService();
