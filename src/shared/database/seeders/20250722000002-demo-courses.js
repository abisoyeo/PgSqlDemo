"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("courses", [
      {
        title: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming",
        userId: 1, // owned by john@example.com (user)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "React for Beginners",
        description: "Introduction to React.js framework",
        userId: 1, // same owner
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Node.js Backend Development",
        description: "Build backend APIs with Node.js and Express",
        userId: 2, // owned by jane@example.com (instructor)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("courses", {
      title: [
        "JavaScript Fundamentals",
        "React for Beginners",
        "Node.js Backend Development",
      ],
    });
  },
};
