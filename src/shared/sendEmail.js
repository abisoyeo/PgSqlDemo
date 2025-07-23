const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, verificationLink) => {
  const html = `
    <h2>Email Verification</h2>
    <p>Click the button below to verify your email:</p>
    <a href="${verificationLink}" style="padding:10px 20px;background:#28a745;color:#fff;border-radius:5px;text-decoration:none;">Verify Email</a>
  `;

  await transporter.sendMail({
    from: `"Pgsql Demo App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify Your Email",
    html,
  });
};

const sendResetPasswordEmail = async (to, resetLink) => {
  const html = `
    <h2>Reset Your Password</h2>
    <p>Click below to reset your password:</p>
    <a href="${resetLink}" style="padding:10px 20px;background:#007bff;color:#fff;border-radius:5px;text-decoration:none;">Reset Password</a>
  `;

  await transporter.sendMail({
    from: `"Pgsql Demo App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset Your Password",
    html,
  });
};

const sendWelcomeEmail = async (to) => {
  const html = `
    <h2>Welcome to the App!</h2>
    <p>Thanks for registering. Your account has been verified.</p>
  `;

  await transporter.sendMail({
    from: `"Pgsql Demo App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome!",
    html,
  });
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendWelcomeEmail,
};
