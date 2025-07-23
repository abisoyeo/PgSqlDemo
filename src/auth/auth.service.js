const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../shared/database");
const generateToken = require("../shared/generateToken");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendWelcomeEmail,
} = require("../shared/sendEmail");

class AuthService {
  async register({ email, password, role = "user" }) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      isVerified: false,
    });

    const verifyToken = generateToken({ email }, "1d");
    const verifyLink = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;
    await sendVerificationEmail(email, verifyLink);

    return {
      msg: "Registration successful. Please check your email to verify your account.",
      email: user.email,
      userId: user.id,
    };
  }

  async verifyEmail(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user) throw new Error("User not found");

      user.isVerified = true;
      await user.save();

      await sendWelcomeEmail(user.email);

      return {
        msg: "Email verified successfully.",
        email: user.email,
        userId: user.id,
      };
    } catch (error) {
      throw new Error("Invalid or expired verification token");
    }
  }

  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.isVerified)
      throw new Error("Invalid credentials or email not verified");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      token,
    };
  }

  async forgotPassword({ email }) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const resetToken = generateToken({ email }, "15m");
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendResetPasswordEmail(email, resetLink);
    return {
      msg: "Password reset link sent to your email.",
      email: user.email,
      userId: user.id,
    };
  }

  async resetPassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user) throw new Error("User not found");

      user.password = await bcrypt.hash(newPassword, 12);
      await user.save();

      return { msg: "Password has been reset successfully." };
    } catch {
      throw new Error("Invalid or expired token");
    }
  }
}

module.exports = new AuthService();
