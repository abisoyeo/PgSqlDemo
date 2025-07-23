"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventLog.init(
    {
      eventType: DataTypes.STRING,
      data: DataTypes.JSONB,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EventLog",
      tableName: "event_logs",
    }
  );
  return EventLog;
};
