// Імпорт бібліотек
import { isValidObjectId } from "mongoose";
import HttpError from "./HttpError.js";
// Перевірка ID
const isValidObjId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};
// Експорт
export default isValidObjId;
