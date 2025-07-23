"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 12);

    await queryInterface.bulkInsert("users", [
      {
        email: "john@example.com",
        password: hashedPassword,
        role: "user", // default user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "jane@example.com",
        password: hashedPassword,
        role: "instructor", // elevated role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin", // admin role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", {
      email: ["john@example.com", "jane@example.com", "admin@example.com"],
    });
  },
};
