"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("courses", [
      {
        title: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "React for Beginners",
        description: "Introduction to React.js framework",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Node.js Backend Development",
        description: "Build backend APIs with Node.js and Express",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
