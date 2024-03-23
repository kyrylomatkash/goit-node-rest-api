// Імпорт функцій
import HttpError from "../middlewares/HttpError.js";
import {
  userSignIn,
  userSignUp,
  userLogOut,
  userSubscription,
  userAvatar,
} from "../services/authServices.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Jimp from "jimp";
// Шлях до файлів
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const avatars_dir = path.join(__dirname, "../", "public", "avatars");
// Реєєстрація користувача
export const register = async (req, res, next) => {
  try {
    const result = await userSignUp(req.body);
    if (result) {
      const { email, subscription } = result;
      const NewUser = { user: { email, subscription } };
      res.status(201).json(NewUser);
    } else {
      throw HttpError(404);
    }
  } catch (error) {
    if (error.status !== 409) {
      next(error);
    } else {
      next(HttpError(409, "Email already in use"));
    }
  }
};
// Логін користувача
export const login = async (req, res, next) => {
  try {
    const existingUser = await userSignIn(req.body);

    if (existingUser) {
      res.json(existingUser);
    } else {
      throw HttpError(404);
    }
  } catch (error) {
    if (error.status !== 401) {
      next(error);
    } else {
      next(HttpError(401, "Email or password is incorrect"));
    }
  }
};
// Логаут користувача
export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await userLogOut(_id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
// Оновлення субскрипції
export const updateSubscriptionStatus = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const subscriptionStatus = await userSubscription(_id, req.body);
    res.status(200).json(subscriptionStatus);
  } catch (error) {
    next(error);
  }
};
// Отримання даних поточного користувача
export const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};
// Оновлення аватару
export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const uploadedImage = path.join(avatars_dir, filename);
    const image = await Jimp.read(tmpUpload);
    const avatarURL = path.join("avatars", filename);
    await image.resize(250, 250).writeAsync(uploadedImage);
    await userAvatar(_id, avatarURL);
    res.status(200).json({ avatarURL });
  } catch (error) {
    console.log(
      "Something went wrong during this action. Check file extension or size and try again."
    );
    next(error);
  }
};
