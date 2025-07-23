const { EventLog } = require("../shared/database");

class AnalyticsService {
  async track(eventType, data = {}, userId = null) {
    try {
      await EventLog.create({
        eventType,
        data,
        userId,
      });
    } catch (err) {
      console.error("Failed to track event:", eventType, err);
    }
  }
}

module.exports = new AnalyticsService();
