const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/db.config.js");
const defineUser = require("../../auth/auth.model");
const defineCourse = require("../../course/course.model");
const defineEvent = require("../../events/eventlog.model.js");
const applyAssociations = require("./associations");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Init models
const User = defineUser(sequelize, DataTypes);
const Course = defineCourse(sequelize, DataTypes);
const EventLog = defineEvent(sequelize, DataTypes);

// Store models in db object
const db = {
  sequelize,
  Sequelize,
  User,
  Course,
  EventLog,
};

// Apply associations
applyAssociations(db);

// Sync DB (optional for development)
sequelize
  .sync({ force: false })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync error:", err));

module.exports = {
  sequelize,
  Sequelize,
  User,
  Course,
  EventLog,
};
