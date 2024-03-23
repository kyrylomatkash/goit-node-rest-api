// Імпорт моделі і бібліотек
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import gravatar from "gravatar";
// Ключ токену
const { JWTSECRETKEY } = process.env;
// Створення користувача
async function userSignUp(data) {
  const { email, password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);

  if (!user) {
    const createUser = await User.create({
      ...data,
      password: hashPassword,
      avatarURL: avatarURL,
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
// Експорт
export { userSignIn, userSignUp, userLogOut, userSubscription, userAvatar };
