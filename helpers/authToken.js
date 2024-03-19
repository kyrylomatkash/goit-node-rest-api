// Імпорт моделі і бібілотек
import HttpError from "./HttpError";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import "dotenv/config";
// Ключ токену
const { JWTSECRETKEY } = process.env;
// Перевірка токену
export const authToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(
      HttpError(401, "Not authorized. You dont have access to this resource")
    );
  }

  try {
    const { id } = jwt.verify(token, JWTSECRETKEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(
        HttpError(401, "Not authorized. You dont have access to this resource")
      );
    }
    req.user = user;
    next();
  } catch (error) {
    next(
      HttpError(401, "Not authorized. You dont have access to this resource")
    );
  }
};
