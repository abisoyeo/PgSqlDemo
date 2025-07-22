const { User, Course } = require("../shared/database");

class CourseService {
  async createCourse(courseData, userId) {
    return await Course.create({
      ...courseData,
      userId,
    });
  }

  async getAllCourses() {
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

    // If you want a flattened structure
    // const flattened = course.map((course) => {
    //   return {
    //     id: course.id,
    //     title: course.title,
    //     instructorName: course.instructor?.name,
    //     // ...other fields
    //   };
    // });

    return course;
  }

  async updateCourse(id, courseData, userId) {
    const course = await Course.findByPk(id);

    if (!course) {
      throw new Error("Course not found");
    }

    if (course.userId !== userId) {
      throw new Error("Unauthorized to update this course");
    }

    return await course.update(courseData);
  }

  async deleteCourse(id, userId) {
    const course = await Course.findByPk(id);

    if (!course) {
      throw new Error("Course not found");
    }

    if (course.userId !== userId) {
      throw new Error("Unauthorized to delete this course");
    }

    await course.destroy();
    return { message: "Course deleted successfully" };
  }
}

module.exports = new CourseService();
