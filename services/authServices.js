// Імпорт моделі і бібліотек
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import gravatar from "gravatar";
import { transport } from "../middlewares/sendmailtransport.js";
// Ключ токену
const { JWTSECRETKEY } = process.env;
// Створення користувача
async function userSignUp(data) {
  const { email, password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();
  const message = {
    to: email,
    from: process.env.MAILTRAP_USER,
    subject: "Welcome to Contacts Book",
    html: `To confirm your registration click on the <a href="http://localhost:8080/users/verify/${verificationToken}">link</a>`,
    text: `To confirm your registration, please open the link http://localhost:8080/users/verify/${verificationToken}`,
  };
  await transport.sendMail(message);
  if (!user) {
    const createUser = await User.create({
      ...data,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    return createUser;
  } else {
    const error = new Error("Email already in use");
    error.status = 409;
    throw error;
  }
}
// Вхід користувача
async function userSignIn(data) {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email or password is incorrect", { status: 401 });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new Error("Email or password is incorrect", { status: 401 });
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWTSECRETKEY, { expiresIn: "1d" });
  const result = {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
  await User.findByIdAndUpdate(user.id, { token });
  return result;
}
// Вихід користувача
async function userLogOut(_id) {
  await User.findByIdAndUpdate(_id, { token: null });
}
// Субскрипція користувача
async function userSubscription(_id, data) {
  const { subscription } = data;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  ).select("Enter subscription");
  return result;
}
// Аватар користувача
async function userAvatar(id, avatarURL) {
  await User.findByIdAndUpdate(id, { avatarURL });
}

async function verificationEmail(verificationToken) {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
}

async function resendVerificationEmail(email) {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify || user.verificationToken === "") {
    throw HttpError(400, "Verification has already been passed");
  }
  const message = {
    to: email,
    from: process.env.MAILTRAP_USER,
    subject: "Welcome to Contacts Book",
    html: `To confirm your registration click on the <a href="http://localhost:8080/users/verify/${verificationToken}">link</a>`,
    text: `To confirm your registration, please open the link http://localhost:8080/users/verify/${verificationToken}`,
  };
  await transport.sendMail(message);
}
// Експорт
export {
  userSignIn,
  userSignUp,
  userLogOut,
  userSubscription,
  userAvatar,
  verificationEmail,
  resendVerificationEmail,
};
