// Повідомлення помилки запиту
const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error. Try again later",
};
// Обробка помилки запиту
const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
// Експорт
export default HttpError;
