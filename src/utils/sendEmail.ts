import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox75132ea4e8c44579b624e33b6b95a702.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData: Mailgun.messages.SendData = {
    from: "alfie1104@gmail.com",
    to: "alfie1104@gmail.com",
    subject,
    html
  };

  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;

  return sendEmail(emailSubject, emailBody);
};
