module.exports = (db) => {
  const { User, Course } = db;

  User.hasMany(Course, {
    foreignKey: "userId",
    as: "courses",
  });

  Course.belongsTo(User, {
    foreignKey: "userId",
    as: "instructor",
  });
};
