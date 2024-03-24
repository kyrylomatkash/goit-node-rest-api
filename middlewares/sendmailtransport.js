// Імпорт бібліотек
import "dotenv/config";
import nodemailer from "nodemailer";
const { MAILTRAP_USER, MAILTRAP_PASSWORD } = process.env;

// Налаштування відправки електроних листів для підтвердження
export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
});
const message = {
  from: '"Me" <noreply.contact.express.verify@gmail.com>',
  to: "bar@example.com, baz@example.com",
  subject: "Hello ✔",
  text: "Hello world?",
  html: "<b>Hello world?</b>",
};
transport.sendMail(message).then(console.log).catch(console.error);
