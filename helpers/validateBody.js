// Імпорт функції
import HttpError from "./HttpError.js";
// Валідація вмісту body запиту
const validateBody = (schema) => {
  const validateReq = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    } else {
      next();
    }
  };

  return validateReq;
};
// Експорт
export default validateBody;
