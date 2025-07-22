const User = require("../auth/auth.model");
const Course = require("../course/course.model");

// Define associations
User.hasMany(Course, {
  foreignKey: "userId",
  as: "courses",
});

Course.belongsTo(User, {
  foreignKey: "userId",
  as: "instructor",
});

module.exports = { User, Course };
