import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});
// Verify the connection configuration and export the ready promise.
export const transporterReady = transporter.verify();

export async function sendEmail({ to, subject, html, text="" }) {
  try {
    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to,
      subject,
      html,
      text,
    };
    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", details.messageId);
    return "Email sent successfully to " + to;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
}