// Імпорт бібліотек і функцій
import express from "express";
import {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} from "../schemas/userSchemas.js";
import { authToken } from "../helpers/authToken.js";
import {
  register,
  login,
  logout,
  updateSubscriptionStatus,
  getCurrentUser,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";

const authRoute = express.Router();
// Роутинг для API
authRoute.post("/register", validateBody(registerSchema), register);

authRoute.post("/login", validateBody(loginSchema), login);

authRoute.post("/logout", authToken, logout);

authRoute.patch(
  "/",
  authToken,
  validateBody(subscriptionSchema),
  updateSubscriptionStatus
);
authRoute.get("/current", authToken, getCurrentUser);
// Експорт
export default authRoute;
