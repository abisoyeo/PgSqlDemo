const authService = require("./auth.service");
const EventTypes = require("../events/eventTypes");
const Analytics = require("../events/analytics.service");
class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      await Analytics.track(
        EventTypes.USER_SIGNED_UP,
        {
          method: "email",
          email: result.email,
        },
        result.userId
      );

      res.status(201).json({
        success: true,
        message: result.msg,
      });
    } catch (err) {
      next(err);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const token = req.params.token;
      const result = await authService.verifyEmail(token);

      await Analytics.track(
        EventTypes.USER_VERIFIED_EMAIL,
        {
          method: "email",
          email: result.email,
        },
        result.userId
      );

      res.json({
        success: true,
        message: result.msg,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      await Analytics.track(
        EventTypes.USER_LOGGED_IN,
        {
          method: "email",
          email: result.user.email,
        },
        result.user.id
      );
      res.json({ success: true, message: "Login successful", data: result });
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const result = await authService.forgotPassword(req.body);
      await Analytics.track(
        EventTypes.PASSWORD_RESET_REQUESTED,
        {
          method: "email",
          email: result.email,
        },
        result.userId
      );

      res.json({
        success: true,
        message: result.msg,
      });
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const token = req.params.token;
      const { newPassword } = req.body;
      const result = await authService.resetPassword(token, newPassword);
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
